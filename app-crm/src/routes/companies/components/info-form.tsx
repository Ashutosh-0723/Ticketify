import { useState } from "react";

import { useShow } from "@refinedev/core";
import { GetFields } from "@refinedev/nestjs-query";

import {
  ApiOutlined,
  BankOutlined,
  ColumnWidthOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Card, Input, InputNumber, Select, Space } from "antd";

import { SingleElementForm, Text } from "@/components";
import { BusinessType, CompanySize, Industry } from "@/graphql/schema.types";
import { CompanyInfoQuery } from "@/graphql/types";
import { currencyNumber } from "@/utilities";

import { COMPANY_INFO_QUERY } from "./queries";

type Company = GetFields<CompanyInfoQuery>;

export const CompanyInfoForm = () => {
  const [activeForm, setActiveForm] = useState<
    | "totalRevenue"
    | "industry"
    | "companySize"
    | "businessType"
    | "country"
    | "website"
  >();

  const { queryResult } = useShow<Company>({
    meta: {
      gqlQuery: COMPANY_INFO_QUERY,
    },
  });

  const data = queryResult?.data?.data;
  const {
    totalRevenue,
    industry,
    companySize,
    businessType,
    country,
    website,
  } = data || {};

  const getActiveForm = (args: { formName: keyof Company }) => {
    const { formName } = args;

    if (activeForm === formName) {
      return "form";
    }

    if (!data?.[formName]) {
      return "empty";
    }

    return "view";
  };

  const loading = queryResult?.isLoading;

  return (
    <div></div>
  );
};

const companySizeOptions: {
  label: string;
  value: CompanySize;
}[] = [
  {
    label: "Enterprise",
    value: "ENTERPRISE",
  },
  {
    label: "Large",
    value: "LARGE",
  },
  {
    label: "Medium",
    value: "MEDIUM",
  },
  {
    label: "Small",
    value: "SMALL",
  },
];

const industryOptions: {
  label: string;
  value: Industry;
}[] = [
  { label: "Aerospace", value: "AEROSPACE" },
  { label: "Agriculture", value: "AGRICULTURE" },
  { label: "Automotive", value: "AUTOMOTIVE" },
  { label: "Chemicals", value: "CHEMICALS" },
  { label: "Construction", value: "CONSTRUCTION" },
  { label: "Defense", value: "DEFENSE" },
  { label: "Education", value: "EDUCATION" },
  { label: "Energy", value: "ENERGY" },
  { label: "Financial Services", value: "FINANCIAL_SERVICES" },
  { label: "Food and Beverage", value: "FOOD_AND_BEVERAGE" },
  { label: "Government", value: "GOVERNMENT" },
  { label: "Healthcare", value: "HEALTHCARE" },
  { label: "Hospitality", value: "HOSPITALITY" },
  { label: "Industrial Manufacturing", value: "INDUSTRIAL_MANUFACTURING" },
  { label: "Insurance", value: "INSURANCE" },
  { label: "Life Sciences", value: "LIFE_SCIENCES" },
  { label: "Logistics", value: "LOGISTICS" },
  { label: "Media", value: "MEDIA" },
  { label: "Mining", value: "MINING" },
  { label: "Nonprofit", value: "NONPROFIT" },
  { label: "Other", value: "OTHER" },
  { label: "Pharmaceuticals", value: "PHARMACEUTICALS" },
  { label: "Professional Services", value: "PROFESSIONAL_SERVICES" },
  { label: "Real Estate", value: "REAL_ESTATE" },
  { label: "Retail", value: "RETAIL" },
  { label: "Technology", value: "TECHNOLOGY" },
  { label: "Telecommunications", value: "TELECOMMUNICATIONS" },
  { label: "Transportation", value: "TRANSPORTATION" },
  { label: "Utilities", value: "UTILITIES" },
];

const businessTypeOptions: {
  label: string;
  value: BusinessType;
}[] = [
  {
    label: "B2B",
    value: "B2B",
  },
  {
    label: "B2C",
    value: "B2C",
  },
  {
    label: "B2G",
    value: "B2G",
  },
];
