import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";

import {
  FilterDropdown,
  SaveButton,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { HttpError, useCreateMany, useOne } from "@refinedev/core";
import { GetFields, GetFieldsFromList } from "@refinedev/nestjs-query";

import {
  DeleteOutlined,
  ExportOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
} from "antd";

import { ContactStatusTag, CustomAvatar, Text } from "@/components";
import { ContactCreateInput } from "@/graphql/schema.types";
import {
  CompanyContactsGetCompanyQuery,
  CompanyContactsTableQuery,
} from "@/graphql/types";

import {
  COMPANY_CONTACTS_GET_COMPANY_QUERY,
  COMPANY_CONTACTS_TABLE_QUERY,
} from "./queries";

type Contact = GetFieldsFromList<CompanyContactsTableQuery>;

export const CompanyContactsTable: FC = () => {
  const params = useParams();

  const { tableProps, filters, setFilters } = useTable<Contact>({
    resource: "contacts",
    syncWithLocation: false,
    sorters: {
      initial: [
        {
          field: "createdAt",
          order: "desc",
        },
      ],
    },
    filters: {
      initial: [
        {
          field: "jobTitle",
          value: "",
          operator: "contains",
        },
        {
          field: "name",
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
      gqlQuery: COMPANY_CONTACTS_TABLE_QUERY,
    },
  });

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
    <div></div>
  );
};

type ContactFormValues = {
  contacts: ContactCreateInput[];
};

const ContactForm = () => {
  const { id = "" } = useParams();

  const { data } = useOne<GetFields<CompanyContactsGetCompanyQuery>>({
    id,
    resource: "companies",
    meta: {
      gqlQuery: COMPANY_CONTACTS_GET_COMPANY_QUERY,
    },
  });

  const [form] = Form.useForm<ContactFormValues>();
  const contacts = Form.useWatch("contacts", form);

  const { mutateAsync } = useCreateMany<
    Contact,
    HttpError,
    ContactCreateInput
  >();

  const handleOnFinish = async (args: ContactFormValues) => {
    form.validateFields();

    const contacts = args.contacts.map((contact) => ({
      ...contact,
      companyId: id,
      salesOwnerId: data?.data.salesOwner?.id || "",
    }));

    await mutateAsync({
      resource: "contacts",
      values: contacts,
      successNotification: false,
    });

    form.resetFields();
  };

  const { hasContacts } = useMemo(() => {
    const hasContacts = contacts?.length > 0;

    return {
      hasContacts,
    };
  }, [contacts]);

  return (
    <Form form={form} onFinish={handleOnFinish}>
      <Form.List name="contacts">
        {(fields, { add, remove }) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start ",
                flexDirection: "column",
                gap: "16px",
                padding: "4px 16px",
              }}
            >
              {fields.map(({ key, name, ...restField }) => {
                return (
                  <Row
                    key={key}
                    gutter={12}
                    align="top"
                    style={{
                      width: "100%",
                    }}
                  >
                    <Col span={11}>
                      <Form.Item
                        {...restField}
                        style={{
                          marginBottom: 0,
                        }}
                        rules={[
                          {
                            required: true,
                            message: "Please enter contact name",
                          },
                        ]}
                        name={[name, "name"]}
                      >
                        <Input
                          addonBefore={<UserOutlined />}
                          placeholder="Contact name"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={11}>
                      <Form.Item
                        required
                        style={{
                          marginBottom: 0,
                        }}
                        rules={[
                          {
                            required: true,
                            message: "Please enter contact e-mail",
                          },
                        ]}
                        name={[name, "email"]}
                      >
                        <Input
                          addonBefore={<MailOutlined />}
                          placeholder="Contact email"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Button
                        icon={<DeleteOutlined />}
                        onClick={() => remove(name)}
                      />
                    </Col>
                  </Row>
                );
              })}
              <Button
                type="link"
                icon={<PlusCircleOutlined />}
                onClick={() => add()}
                style={{
                  marginBottom: hasContacts ? 16 : 0,
                }}
              >
                Add new contact
              </Button>
            </div>
          );
        }}
      </Form.List>
      {hasContacts && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
            padding: "16px",
            borderTop: "1px solid #D9D9D9",
          }}
        >
          <Button
            size="large"
            type="default"
            onClick={() => {
              form.resetFields();
            }}
          >
            Cancel
          </Button>
          <SaveButton
            size="large"
            icon={undefined}
            onClick={() => form.submit()}
          />
        </div>
      )}
    </Form>
  );
};

const statusOptions: {
  label: string;
  value: Contact["status"];
}[] = [
  {
    label: "New",
    value: "NEW",
  },
  {
    label: "Qualified",
    value: "QUALIFIED",
  },
  {
    label: "Unqualified",
    value: "UNQUALIFIED",
  },
  {
    label: "Won",
    value: "WON",
  },
  {
    label: "Negotiation",
    value: "NEGOTIATION",
  },
  {
    label: "Lost",
    value: "LOST",
  },
  {
    label: "Interested",
    value: "INTERESTED",
  },
  {
    label: "Contacted",
    value: "CONTACTED",
  },
  {
    label: "Churned",
    value: "CHURNED",
  },
];
