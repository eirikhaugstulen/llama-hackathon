"use clieuseEffect, nt"

import { queryOptions, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type Props = {
  summary: string;
  dataItems: string[];
  periods: string[];
  orgUnits: string[];
};

export const chartConfigOptions = ({ summary, dataItems, periods, orgUnits }: Props) =>
    queryOptions({
        queryKey: ["chartConfig", summary, dataItems, periods, orgUnits],
        queryFn: () => fetch("/api/query-object", {
            method: "POST",
            body: JSON.stringify({ summary, dataItems, periods, orgUnits }),
        }).then(res => res.json()),
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: dataItems.length > 0 && periods.length > 0 && orgUnits.length > 0,
    });

export const useChartConfig = ({ summary, dataItems, periods, orgUnits }: Props) => {
    const { data, isLoading, error } = useQuery(
        chartConfigOptions({ summary, dataItems, periods, orgUnits })
    );

    useEffect(() => {
        console.log('data', data)
    }, [data])

    return {
        chartConfig: data?.chartConfig,
        analyticsData: data?.analyticsData,
        isLoading,
        error,
    };
};
