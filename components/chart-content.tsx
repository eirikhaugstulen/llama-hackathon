"use client"

import { useChartConfig } from "@/hooks/use-chart-config"
import { DynamicChart } from "@/components/dynamic-charts"

interface ChartContentProps {
    summary: string
    dataItems: string[]
    periods: string[]
    orgUnits: string[]
}

export function ChartContent({ summary, dataItems, periods, orgUnits }: ChartContentProps) {
    const { chartConfig, analyticsData, isLoading, error } = useChartConfig({
        summary,
        dataItems,
        periods,
        orgUnits,
    })

    if (isLoading) {
        return (
            <div className="flex items-center justify-center space-x-2 h-[400px]">
                <div className="size-3 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="size-3 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="size-3 bg-gray-500 rounded-full animate-bounce"></div>
            </div>
        )
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (!chartConfig) {
        return <div>No chart config</div>
    }

    return (
        <DynamicChart
            chartConfig={chartConfig}
            chartData={[
                {
                    "Period": "January 2024",
                    "category": "Malaria confirmed cases reported",
                    "Value": 13
                },
                {
                    "Period": "January 2024",
                    "category": "Malaria deaths",
                    "Value": 9
                },
                {
                    "Period": "January 2024",
                    "category": "Malaria admissions",
                    "Value": 0
                },
                {
                    "Period": "February 2024",
                    "category": "Malaria confirmed cases reported",
                    "Value": 20
                },
                {
                    "Period": "February 2024",
                    "category": "Malaria deaths",
                    "Value": 4
                },
                {
                    "Period": "February 2024",
                    "category": "Malaria admissions",
                    "Value": 0
                },
                {
                    "Period": "March 2024",
                    "category": "Malaria confirmed cases reported",
                    "Value": 0
                },
                {
                    "Period": "March 2024",
                    "category": "Malaria deaths",
                    "Value": 0
                },
                {
                    "Period": "March 2024",
                    "category": "Malaria admissions",
                    "Value": 57
                },
                {
                    "Period": "April 2024",
                    "category": "Malaria confirmed cases reported",
                    "Value": 0
                },
                {
                    "Period": "April 2024",
                    "category": "Malaria deaths",
                    "Value": 0
                },
                {
                    "Period": "April 2024",
                    "category": "Malaria admissions",
                    "Value": 64
                },
                {
                    "Period": "May 2024",
                    "category": "Malaria confirmed cases reported",
                    "Value": 0
                },
                {
                    "Period": "May 2024",
                    "category": "Malaria deaths",
                    "Value": 5
                },
                {
                    "Period": "May 2024",
                    "category": "Malaria admissions",
                    "Value": 0
                },
                {
                    "Period": "June 2024",
                    "category": "Malaria confirmed cases reported",
                    "Value": 0
                },
                {
                    "Period": "June 2024",
                    "category": "Malaria deaths",
                    "Value": 0
                },
                {
                    "Period": "June 2024",
                    "category": "Malaria admissions",
                    "Value": 54
                },
                {
                    "Period": "July 2024",
                    "category": "Malaria confirmed cases reported",
                    "Value": 1
                },
                {
                    "Period": "July 2024",
                    "category": "Malaria deaths",
                    "Value": 0
                },
                {
                    "Period": "July 2024",
                    "category": "Malaria admissions",
                    "Value": 0
                },
                {
                    "Period": "August 2024",
                    "category": "Malaria confirmed cases reported",
                    "Value": 0
                },
                {
                    "Period": "August 2024",
                    "category": "Malaria deaths",
                    "Value": 9
                },
                {
                    "Period": "August 2024",
                    "category": "Malaria admissions",
                    "Value": 0
                },
                {
                    "Period": "September 2024",
                    "category": "Malaria confirmed cases reported",
                    "Value": 0
                },
                {
                    "Period": "September 2024",
                    "category": "Malaria deaths",
                    "Value": 0
                },
                {
                    "Period": "September 2024",
                    "category": "Malaria admissions",
                    "Value": 59
                },
                {
                    "Period": "October 2024",
                    "category": "Malaria confirmed cases reported",
                    "Value": 13
                },
                {
                    "Period": "October 2024",
                    "category": "Malaria deaths",
                    "Value": 0
                },
                {
                    "Period": "October 2024",
                    "category": "Malaria admissions",
                    "Value": 0
                },
                {
                    "Period": "November 2024",
                    "category": "Malaria confirmed cases reported",
                    "Value": 0
                },
                {
                    "Period": "November 2024",
                    "category": "Malaria deaths",
                    "Value": 18
                },
                {
                    "Period": "November 2024",
                    "category": "Malaria admissions",
                    "Value": 0
                },
                {
                    "Period": "December 2024",
                    "category": "Malaria confirmed cases reported",
                    "Value": 0
                },
                {
                    "Period": "December 2024",
                    "category": "Malaria deaths",
                    "Value": 0
                },
                {
                    "Period": "December 2024",
                    "category": "Malaria admissions",
                    "Value": 15
                }
            ]}
        />
    );
} 