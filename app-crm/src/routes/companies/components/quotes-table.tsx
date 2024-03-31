import { FC, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import { FilterDropdown, ShowButton, useTable } from "@refinedev/antd";
import { useNavigation } from "@refinedev/core";
import { GetFieldsFromList } from "@refinedev/nestjs-query";

import {
  ContainerOutlined,
  ExportOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Card, Input, Select, Space, Table } from "antd";

import { Participants, QuoteStatusTag, Text } from "@/components";
import { QuoteStatus } from "@/graphql/schema.types";
import { CompanyQuotesTableQuery } from "@/graphql/types";
import { useUsersSelect } from "@/hooks/useUsersSelect";
import { currencyNumber } from "@/utilities";

import { COMPANY_QUOTES_TABLE_QUERY } from "./queries";

type Props = {
  style?: React.CSSProperties;
};

type Quote = GetFieldsFromList<CompanyQuotesTableQuery>;

export const CompanyQuotesTable: FC<Props> = ({ style }) => {
  const { listUrl } = useNavigation();
  const params = useParams();

  const { tableProps, filters, setFilters } = useTable<Quote>({
    resource: "quotes",
    syncWithLocation: false,
    sorters: {
      initial: [
        {
          field: "updatedAt",
          order: "desc",
        },
      ],
    },
    filters: {
      initial: [
        {
          field: "title",
          value: "",
          operator: "contains",
        },
        {
          field: "status",
          value: undefined,
          operator: "in",
        },
      ],
      permanent: [
        {
          field: "company.id",
          operator: "eq",
          value: params.id,
        },
      ],
    },
    meta: {
      gqlQuery: COMPANY_QUOTES_TABLE_QUERY,
    },
  });

  const { selectProps: selectPropsUsers } = useUsersSelect();

  const showResetFilters = useMemo(() => {
    return filters?.filter((filter) => {
      if ("field" in filter && filter.field === "company.id") {
        return false;
      }

      if (!filter.value) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const hasData = (tableProps?.dataSource?.length || 0) > 0;

  return (
    <div></div>
  );
};

const statusOptions: { label: string; value: QuoteStatus }[] = [
  {
    label: "Draft",
    value: "DRAFT",
  },
  {
    label: "Sent",
    value: "SENT",
  },
  {
    label: "Accepted",
    value: "ACCEPTED",
  },
];
