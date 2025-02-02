import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
} from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ChartContentProps {
    dataItems: string[]
    periods: string[]
    orgUnits: string[]
}

const chartConfig = {
    admissions: {
        label: "Malaria admissions",
        color: "hsl(var(--chart-1))",
    },
    deaths: {
        label: "Malaria deaths",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export async function ChartContent({ dataItems, periods, orgUnits }: ChartContentProps) {

    return (
        <ChartContainer config={chartConfig}>
            <LineChart data={{}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="admissions" stroke="var(--color-admissions)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="deaths" stroke="var(--color-deaths)" strokeWidth={2} dot={false} />
            </LineChart>
        </ChartContainer>
    );
} 