import { Config } from "@/lib/types";

export const formatAnalyticsDataPrompt = (chartConfig: Config, analyticsData: any) => {
    const prompt = `
Act as a data transformation assistant.

type Result = Record<string, string | number>;

Your task:
• Parse and transform analyticsData.rows using analyticsData.metaData so that IDs (e.g. "202401", "QpaUDYqd5tw", etc.) become user-friendly names (e.g. "January 2024", "Malaria confirmed cases reported").
• Reshape the data into an object containing a { results: Result[] } (each element is an object with string or number properties).
• The shape must adapt to chartConfig.type and keys:
   - If chartConfig specifies multiple lines with lineCategories and a measurementColumn, pivot the data so each category is its own column (e.g. "Malaria admissions": <value>, "Malaria deaths": <value>, etc.).
   - If chartConfig is "bar" or "pie" with only yKeys, produce a simpler array of objects with each object's xKey (e.g. "Period") and each yKey as columns.
• For missing data, set 0. 
• Wrap all object keys in double quotes.

Here is the data you receive (chartConfig + analyticsData).

CHART CONFIG: """
${JSON.stringify(chartConfig)}
"""

ANALYTICS DATA: """
${JSON.stringify(analyticsData)}
"""
    `
    return prompt
}