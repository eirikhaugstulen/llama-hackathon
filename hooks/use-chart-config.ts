import { generateChartConfig } from "@/app/api/chat/actions"
import { ChartConfig } from "@/components/ui/chart"
import { useEffect, useMemo, useState } from "react"

type Props = {
    dataItems: string[],
    periods: string[],
    orgUnits: string[],
}

export const useChartConfig = ({ dataItems, periods, orgUnits }: Props) => {
    const [chartConfig, setChartConfig] = useState<ChartConfig | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (dataItems.length === 0 || periods.length === 0 || orgUnits.length === 0) {
            return
        }

        const fetchChartConfig = async () => {
            setIsLoading(true)
            const { chartConfig } = await generateChartConfig({
                dataItems,
                periods,
                orgUnits,
            })
            setChartConfig(chartConfig)
            setIsLoading(false)
        }

        fetchChartConfig()
    }, [dataItems, periods, orgUnits])

    return { chartConfig, isLoading }
}