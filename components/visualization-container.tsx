"use client"
import { DHIS2Chart } from "@/components/dhis2-chart"
import { FollowUpChat } from "@/components/follow-up-chat"
import { useState } from "react"

export interface VisualizationData {
    dataItems: string[]
    periods: string[]
    orgUnits: string[]
}

export function VisualizationContainer() {
    const [visualizationData, setVisualizationData] = useState<VisualizationData | null>(null)

    return (
        <div className="w-full grid grid-cols-10 gap-4">
            <div className="col-span-10 lg:col-span-4 2xl:col-span-6">
                <DHIS2Chart
                    dataItems={visualizationData?.dataItems || []}
                    periods={visualizationData?.periods || []}
                    orgUnits={visualizationData?.orgUnits || []}
                />
            </div>

            <div className="col-span-10 lg:col-span-6 2xl:col-span-4">
                <FollowUpChat
                    setVisualizationData={setVisualizationData}
                />
            </div>
        </div>
    )
} 