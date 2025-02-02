"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "./ui/button"
import { ChartContent } from "./chart-content"
import { useMemo, memo } from "react"

interface DHIS2ChartProps {
  summary: string
  dataItems: string[]
  periods: string[]
  orgUnits: string[]
}

const PageModes = {
    DEFAULT: "DEFAULT",
    PARTIAL: "PARTIAL",
    COMPLETE: "COMPLETE",
} as const

export const DHIS2Chart = memo(function DHIS2Chart({ summary, dataItems, periods, orgUnits }: DHIS2ChartProps) {
    const pageMode = useMemo(() => {
        if (dataItems.length === 0 || periods.length === 0 || orgUnits.length === 0 || summary === '') {
            return PageModes.DEFAULT;
        }

        return PageModes.COMPLETE;
    }, [dataItems, periods, orgUnits, summary]);

    return (
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle>Malaria Indicators</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                    <Button size="sm" variant="outline">Data: {dataItems.length} selected</Button>
                    <Button size="sm" variant="outline">Area: {orgUnits.length} selected</Button>
                    <Button size="sm" variant="outline">Period: {periods.length} selected</Button>
                </div>

                {pageMode === PageModes.DEFAULT && (
                    <div className="flex flex-col items-center justify-center h-[200px]">
                        <p className="text-muted-foreground">Please start by selecting dimensions</p>
                    </div>
                )}

                {pageMode === PageModes.COMPLETE && (
                    <ChartContent
                        summary={summary}
                        dataItems={dataItems}
                        periods={periods}
                        orgUnits={orgUnits}
                    />
                )}
            </CardContent>
        </Card>
    )
})

