import { Col, Row } from "antd";

import {
  CompanyContactsTable,
  CompanyDealsTable,
  CompanyInfoForm,
  CompanyNotes,
  CompanyQuotesTable,
  CompanyTitleForm,
} from "./components";

export const CompanyEditPage = () => {
  return (
    <div className="page-container">
      <CompanyTitleForm />
      <Row
        gutter={[32, 32]}
        style={{
          marginTop: 32,
        }}
      >
        <Col span={16}>
          
          <CompanyDealsTable
            style={{
              marginTop: 32,
            }}
          />
         
          <CompanyNotes
            style={{
              marginTop: 32,
            }}
          />
        </Col>
        
      </Row>
    </div>
  );
};
