"use server";
import { createClient } from "@/utils/supabase/server";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
type Props = {
  dataItems: string[];
  periods: string[];
  orgUnits: string[];
};

const configSchema = z
    .object({
        description: z
            .string()
            .describe(
                "Describe the chart. What is it showing? What is interesting about the way the data is displayed?",
            ),
        takeaway: z.string().describe("What is the main takeaway from the chart?"),
        type: z.enum(["bar", "line", "area", "pie"]).describe("Type of chart"),
        title: z.string(),
        xKey: z.string().describe("Key for x-axis or category"),
        yKeys: z.array(z.string()).describe("Key(s) for y-axis values this is typically the quantitative column"),
        multipleLines: z.boolean().describe("For line charts only: whether the chart is comparing groups of data.").optional(),
        measurementColumn: z.string().describe("For line charts only: key for quantitative y-axis column to measure against (eg. values, counts etc.)").optional(),
        lineCategories: z.array(z.string()).describe("For line charts only: Categories used to compare different lines or data series. Each category represents a distinct line in the chart.").optional(),
        colors: z
            .record(
                z.string().describe("Any of the yKeys"),
                z.string().describe("Color value in CSS format (e.g., hex, rgb, hsl)"),
            )
            .describe("Mapping of data keys to color values for chart elements")
            .optional(),
        legend: z.boolean().describe("Whether to show legend"),
    })
    .describe("Chart configuration object");

const credentials = Buffer.from("admin:district").toString("base64");

const getOrgUnits = async (orgUnitIds: string[]) => {
    const response = await fetch(
        `http://localhost:8080/api/organisationUnits?fields=id,displayName,level`,
        {
            headers: {
                Authorization: `Basic ${credentials}`,
            },
        },
    );

    const data = await response.json();

    const filteredData = data?.organisationUnits
        ?.filter((orgUnit: { id: string, displayName: string, level: number }) => orgUnitIds.includes(orgUnit.id));

    return filteredData;
};

const getDataItems = async (dataItemIds: string[]) => {
    const response = await fetch(`http://localhost:8080/api/dataElements?filter=id:in:[${dataItemIds.join(",")}]&fields=id,displayName`,
        {
            headers: {
                Authorization: `Basic ${credentials}`,
            },
        },
    );
    const data = await response.json();

    return data.dataElements;
};

const getAnalyticsData = async (dataItems: string[], orgUnits: string[], periodIds: string[]) => {
    const url = `http://localhost:8080/api/analytics?dimension=dx:${dataItems.join(";")}&filter=pe:${periodIds.join(";")}&filter=ou:${orgUnits.join(";")}`

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

export const generateChartConfig = async ({
    dataItems: dataItemIds,
    periods: periodIds,
    orgUnits: orgUnitIds,
}: Props) => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not found");
    }

    try {
        // const orgUnits = await getOrgUnits(orgUnitIds);
        // const dataItems = await getDataItems(dataItemIds);

        const analyticsData = await getAnalyticsData(dataItemIds, orgUnitIds, periodIds);

        const { object: chartConfig } = await generateObject({
            model: openai("gpt-4o-mini"),
            schema: configSchema,
            prompt: `
Given the following data from a SQL query result, generate the chart config that best visualises the data and answers the users query.
For multiple groups use multi-lines.

RAW DATA: """
${JSON.stringify(analyticsData)}
"""
            `
        })

        return { chartConfig };
    } catch (error) {
        console.error(error);
        throw new Error("Failed to generate chart config");
    }
};
