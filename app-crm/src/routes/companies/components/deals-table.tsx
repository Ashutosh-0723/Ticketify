import { FC, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import { EditButton, FilterDropdown, useTable } from "@refinedev/antd";
import { useNavigation, useOne } from "@refinedev/core";
import { GetFields, GetFieldsFromList } from "@refinedev/nestjs-query";

import {
  AuditOutlined,
  ExportOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Card, Input, Select, Skeleton, Space, Table, Tag } from "antd";

import { Participants, Text } from "@/components";
import {
  CompanyDealsTableQuery,
  CompanyTotalDealsAmountQuery,
} from "@/graphql/types";
import { useTaskStagesSelect } from "@/hooks/useTaskStagesSelect";
import { useDealStagesSelect } from "@/hooks/useDealStagesSelect";
import { useUsersSelect } from "@/hooks/useUsersSelect";
import { currencyNumber } from "@/utilities";

import {
  COMPANY_DEALS_TABLE_QUERY,
  COMPANY_TOTAL_DEALS_AMOUNT_QUERY,
} from "./queries";

type Props = {
  style?: React.CSSProperties;
};

type Deal = GetFieldsFromList<CompanyDealsTableQuery>;

export const CompanyDealsTable: FC<Props> = ({ style }) => {
  const { listUrl } = useNavigation();
  const params = useParams();

  const { tableProps, filters, setFilters } = useTable<Deal>({
    resource: "deals",
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
          field: "stage.id",
          value: "",
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
      gqlQuery: COMPANY_DEALS_TABLE_QUERY,
    },
  });

  const { data: companyData, isLoading: isLoadingCompany } = useOne<
    GetFields<CompanyTotalDealsAmountQuery>
  >({
    resource: "companies",
    id: params.id,
    meta: {
      gqlQuery: COMPANY_TOTAL_DEALS_AMOUNT_QUERY,
    },
  });

  const { selectProps: usersSelectProps } = useUsersSelect();
  const { selectProps: taskStagesSelectProps} = useTaskStagesSelect();
  const { selectProps: dealStagesSelectProps } = useDealStagesSelect();

  const hasData = tableProps.loading
    ? true
    : (tableProps?.dataSource?.length || 0) > 0;

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

  return (
    <Card
      style={style}
      headStyle={{
        borderBottom: "1px solid #D9D9D9",
        marginBottom: "1px",
      }}
      bodyStyle={{ padding: 0 }}
      title={
        <Space size="middle">
         
          <Text>Issues</Text>

          {showResetFilters?.length > 0 && (
            <Button size="small" onClick={() => setFilters([], "replace")}>
              Reset filters
            </Button>
          )}
        </Space>
      }
      extra={
        <>
          <Text className="tertiary">Total Issues: </Text>
          {isLoadingCompany ? (
            <Skeleton.Input active size="small" />
          ) : (
            <Text strong>
              {currencyNumber(
                companyData?.data.dealsAggregate?.[0]?.sum?.value || 0,
              )}
            </Text>
          )}
        </>
      }
    >
      {!hasData && (
        <Space
          direction="vertical"
          size={16}
          style={{
            padding: 16,
          }}
        >
          <Text>No Issues yet</Text>
          <Link to="/scrumboard/kanban">
            <PlusCircleOutlined
              style={{
                marginRight: 4,
              }}
            />{" "}
            Add issues through kanban board
          </Link>
        </Space>
      )}

      {hasData && (
        <Table
          {...tableProps}
          rowKey="id"
          pagination={{
            ...tableProps.pagination,
            showSizeChanger: false,
          }}
        >
          <Table.Column
            title="Issue Title"
            dataIndex="title"
            filterIcon={<SearchOutlined />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Search Title" />
              </FilterDropdown>
            )}
          />
         
          <Table.Column<Deal>
            title="Stage"
            dataIndex={["stage", "id"]}
            render={(_, record) => {
              if (!record.stage) return null;

              return <Tag>{record.stage.title}</Tag>;
            }}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Select
                  {...taskStagesSelectProps}
                  style={{ width: "200px" }}
                  mode="multiple"
                  placeholder="Select Stage"
                />
              </FilterDropdown>
            )}
          />
         
        </Table>
      )}
    </Card>
  );
};
