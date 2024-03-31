import { FC } from "react";

import { DeleteButton, EditButton, FilterDropdown } from "@refinedev/antd";
import { CrudFilters, CrudSorting, getDefaultFilter } from "@refinedev/core";
import { GetFieldsFromList } from "@refinedev/nestjs-query";

import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Select, Space, Table, TableProps } from "antd";

import { CustomAvatar, PaginationTotal, Text } from "@/components";
import { Company } from "@/graphql/schema.types";
import { CompaniesTableQuery } from "@/graphql/types";
import { useContactsSelect } from "@/hooks/useContactsSelect";
import { useUsersSelect } from "@/hooks/useUsersSelect";
import { currencyNumber } from "@/utilities";

import { AvatarGroup } from "./avatar-group";

type Props = {
  tableProps: TableProps<GetFieldsFromList<CompaniesTableQuery>>;
  filters: CrudFilters;
  sorters: CrudSorting;
};

export const CompaniesTableView: FC<Props> = ({ tableProps, filters }) => {
  const { selectProps: selectPropsUsers } = useUsersSelect();

  const { selectProps: selectPropsContacts } = useContactsSelect();

  return (
    <Table
      {...tableProps}
      pagination={{
        ...tableProps.pagination,
        pageSizeOptions: ["12", "24", "48", "96"],
        showTotal: (total) => (
          <PaginationTotal total={total} entityName="Projects" />
        ),
      }}
      rowKey="id"
    >
      <Table.Column<Company>
        dataIndex="name"
        title="Project title"
        defaultFilteredValue={getDefaultFilter("id", filters)}
        filterIcon={<SearchOutlined />}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Input placeholder="Search Project" />
          </FilterDropdown>
        )}
        render={(_, record) => {
          return (
            <Space>
              
              <Text
                style={{
                  whiteSpace: "nowrap",
                }}
              >
              <a href='/scrumboard/kanban'>{record.name}</a>
              </Text>
            </Space>
          );
        }}
      />
      <Table.Column<Company>
        dataIndex={["salesOwner", "id"]}
        title="Project Admin"
        defaultFilteredValue={getDefaultFilter("salesOwner.id", filters)}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Select
              placeholder="Search Project Admin"
              style={{ width: 220 }}
              {...selectPropsUsers}
            />
          </FilterDropdown>
        )}
        render={(_, record) => {
          const salesOwner = record.salesOwner;
          return (
            <Space>
              <CustomAvatar name={salesOwner.name} src={salesOwner.avatarUrl} />
              <Text
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                {salesOwner.name}
              </Text>
            </Space>
          );
        }}
      />
     
      <Table.Column<Company>
        dataIndex={["contacts", "id"]}
        title="Team Members"
        defaultFilteredValue={getDefaultFilter("contacts.id", filters, "in")}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Select
              mode="multiple"
              placeholder="Search Team Members"
              style={{ width: 220 }}
              {...selectPropsContacts}
            />
          </FilterDropdown>
        )}
        render={(_, record: Company) => {
          const value = record.contacts;
          const avatars = value?.nodes?.map((contact) => {
            return {
              name: contact.name,
              src: contact.avatarUrl as string | undefined,
            };
          });

          return <AvatarGroup avatars={avatars} size={"small"} />;
        }}
      />
      <Table.Column<Company>
        fixed="right"
        dataIndex="id"
        title="Actions"
        render={(value) => (
          <Space>
            <EditButton
              icon={<EyeOutlined />}
              hideText
              size="small"
              recordItemId={value}
            />

            <DeleteButton hideText size="small" recordItemId={value} />
          </Space>
        )}
      />
    </Table>
  );
};
