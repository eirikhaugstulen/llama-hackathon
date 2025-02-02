

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { formatAnalyticsDataPrompt } from "@/prompts/system/format-analytics-data";
import { Config, configSchema, Result } from "@/lib/types";

const credentials = Buffer.from("admin:district").toString("base64");

const getAnalyticsData = async (dataItems: string[], orgUnits: string[], periodIds: string[]) => {
    const url = `http://localhost:8080/api/analytics?dimension=dx:${dataItems.join(";")}&dimension=pe:${periodIds.join(";")}&dimension=ou:${orgUnits.join(";")}&includeMetadata=true&includeData=true`

    const response = await fetch(url,
        {
            headers: {
                Authorization: `Basic ${credentials}`,
            },
        },
    );

    const data = await response.json();

    return data;
};

const formatAnalyticsData = async (chartConfig: Config, analyticsData: any) => {
    try {
        const formattedAnalyticsData = await generateObject({
            model: openai("gpt-4o"),
            prompt: formatAnalyticsDataPrompt(chartConfig, analyticsData),
            schema: z.object({
                results: z.array(z.record(z.string(), z.number())).describe('An array of objects with string keys and number values').optional()
            }).describe('An object with a results property that is an array of objects with string keys and number values')
        })

        console.log(JSON.stringify(formattedAnalyticsData))

        return formattedAnalyticsData;
    } catch (error) {
        console.error(JSON.stringify(error));
        return null;
    }
}

export async function POST(req: NextRequest) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { summary, dataItems, periods, orgUnits } = await req.json();


    const analyticsData = await getAnalyticsData(dataItems, orgUnits, periods);

    const { object: chartConfig } = await generateObject({
        model: openai("gpt-4o"),
        schema: configSchema,
        prompt: `
Given the following data from a SQL query result, generate the chart config that best visualises the data and answers the users query.
For multiple groups use multi-lines.

RAW DATA: """
${JSON.stringify(analyticsData)}
"""

USER INTENT: """
${summary}
"""
            `
    })

    // const formattedAnalyticsData = await formatAnalyticsData(chartConfig, analyticsData);

    // if (!formattedAnalyticsData) {
    //     return NextResponse.json({ error: "Failed to format analytics data" }, { status: 500 });
    // }

    return NextResponse.json({ chartConfig, analyticsData });
}