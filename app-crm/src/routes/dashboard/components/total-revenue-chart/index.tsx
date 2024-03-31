import React, { Suspense } from "react";

import { useList } from "@refinedev/core";
import { GetFieldsFromList } from "@refinedev/nestjs-query";

import { DollarOutlined } from "@ant-design/icons";
import { GaugeConfig } from "@ant-design/plots";
import { Card, Skeleton, Space } from "antd";

import { Text } from "@/components";
import { DashboardTotalRevenueQuery } from "@/graphql/types";
import { currencyNumber } from "@/utilities";

import { DASHBOARD_TOTAL_REVENUE_QUERY } from "./queries";

const Gauge = React.lazy(() => import("@ant-design/plots/es/components/gauge"));

type DealStage = GetFieldsFromList<DashboardTotalRevenueQuery>;

export const DashboardTotalRevenueChart: React.FC = () => {
  const {
    data: expectedRevenueData,
    isError: expectedRevenueIsError,
    error: expectedRevenueError,
    isLoading: expectedRevenueIsLoading,
  } = useList<DealStage>({
    resource: "dealStages",
    filters: [
      {
        field: "title",
        operator: "nin",
        value: ["WON", "LOST"],
      },
    ],
    meta: {
      gqlQuery: DASHBOARD_TOTAL_REVENUE_QUERY,
    },
  });

  const {
    data: realizedRevenueData,
    isError: realizedRevenueIsError,
    error: realizedRevenueError,
    isLoading: realizedRevenueIsLoading,
  } = useList<DealStage>({
    resource: "dealStages",
    filters: [
      {
        field: "title",
        operator: "eq",
        value: "WON",
      },
    ],
    meta: {
      gqlQuery: DASHBOARD_TOTAL_REVENUE_QUERY,
    },
  });

  if (expectedRevenueIsError || realizedRevenueIsError) {
    console.error(
      "Error fetching dashboard data",
      expectedRevenueError,
      realizedRevenueError,
    );
    return null;
  }

  const totalRealizationRevenue = (realizedRevenueData?.data || []).map(
    (item) => item.dealsAggregate?.[0]?.sum?.value,
  )[0];

  const totalExpectedRevenue = (expectedRevenueData?.data || []).reduce(
    (prev, curr) => prev + (curr?.dealsAggregate?.[0]?.sum?.value ?? 0),
    0,
  );

  const realizationPercentageOfExpected =
    totalRealizationRevenue && totalExpectedRevenue
      ? (totalRealizationRevenue / totalExpectedRevenue) * 100
      : 0;

  const config: GaugeConfig = {
    animation:
      expectedRevenueIsLoading || realizedRevenueIsLoading ? false : true,
    supportCSSTransform: true,
    // antd expects a percentage value between 0 and 1
    percent: realizationPercentageOfExpected / 100,
    range: {
      color: "l(0) 0:#D9F7BE 1:#52C41A",
    },
    axis: {
      tickLine: {
        style: {
          stroke: "#BFBFBF",
        },
      },
      label: {
        formatter(v) {
          return Number(v) * 100;
        },
      },
      subTickLine: {
        count: 3,
      },
    },
    indicator: {
      pointer: {
        style: {
          fontSize: 4,
          stroke: "#BFBFBF",
          lineWidth: 2,
        },
      },
      pin: {
        style: {
          r: 8,
          lineWidth: 2,
          stroke: "#BFBFBF",
        },
      },
    },
    statistic: {
      content: {
        formatter: (datum) => {
          return `${(datum?.percent * 100).toFixed(2)}%`;
        },
        style: {
          color: "rgba(0,0,0,0.85)",
          fontWeight: 500,
          fontSize: "24px",
        },
      },
    },
  };

  return (
    <div></div>
  );
};
