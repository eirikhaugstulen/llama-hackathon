import { systemPrompt } from '@/prompts/system/main-prompt';
import { createClient } from '@/utils/supabase/server';
import { openai } from '@ai-sdk/openai';
import { createDataStreamResponse, embedMany, generateObject, streamText, tool } from 'ai';
import { z } from 'zod';

const getIndicators = async (dataItems: string[]) => {
    const supabase = await createClient();

    try {
        const embeddings = await embedMany({
            model: openai.embedding('text-embedding-3-small'),
            values: dataItems,
        })

        const supabasePromises = embeddings.embeddings.map(apiEmbedding => supabase
            .rpc('find_indicators', {
                query_embedding: apiEmbedding,
                match_threshold: 0.5,
                match_count: 10,
            })
        )

        const awaitedIndicators = await Promise.all(supabasePromises)

        const indicators = awaitedIndicators.flatMap(apiIndicators => apiIndicators.data)

        const { object: indicatorsObject } = await generateObject({
            model: openai('gpt-4o'),
            prompt: `Given the following indicators, please provide a filtered list of indicators that should be displayed in the visualization.
            ${indicators.length > 0 ? indicators.map(indicator => `- ${indicator?.displayname} (${indicator?.id})`).join('\n') : 'No indicators found'}`,
            schema: z.object({
                indicators: z.array(z.string()).describe('A list of indicator ids that should be displayed in the visualization'),
            }),
        });

        return indicatorsObject.indicators;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const getPeriod = async (period: string[]) => {
    return period;
}

const getOrgUnits = async (orgUnits: string[]) => {
    return orgUnits;
}

const tools = {
    updateDataItems: tool({
        description: 'Update the data items for the given visualization',
        parameters: z.object({
            restart: z.boolean().default(false).describe('If true, all data items, periods, and org units will be cleared.'),
            dataItems: z
                .string()
                .array()
                .optional()
                .describe('An array of data items in natural language. For example: "malaria cases", "measles cases", "dengue cases".'),
            periods: z
                .string()
                .array()
                .optional()
                .describe('An array of periods in natural language. For example: "last 3 months", "this year", "last 6 months".'),
            orgUnits: z
                .string()
                .array()
                .optional()
                .describe('An array of org units in natural language. For example: "Ghana", "Korle Bu Teaching Hospital", "Ashanti Region".'),
        }),
        execute: async ({ dataItems, periods, orgUnits }) => {
            const apiIndicators = dataItems ? await getIndicators(dataItems) : [];
            const apiPeriods = periods ? await getPeriod(periods) : [];
            const apiOrgUnits = orgUnits ? await getOrgUnits(orgUnits) : [];

            console.log(apiIndicators, apiPeriods, apiOrgUnits)

            return {
                modelResponse: 'Data fetched successfully and have been rendered to the user. Please continue with the next step. DO NOT CALL THE TOOL AGAIN.',
                data: {
                    indicators: apiIndicators,
                    periods: apiPeriods,
                    orgUnits: apiOrgUnits,
                }
            };
        },
    }),
}

export async function POST(req: Request) {
    const { messages } = await req.json();
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return new Response('Unauthorized', { status: 401 });
    }

    return createDataStreamResponse({
        execute: async (dataStream) => {
            try {
                const response = await streamText({
                    model: openai('gpt-4o'),
                    system: systemPrompt,
                    messages,
                    maxSteps: 3,
                    tools,
                    toolChoice: 'auto',
                })

                return response.mergeIntoDataStream(dataStream);
            } catch (error) {
                console.error(error);
            }
        },
    });
}