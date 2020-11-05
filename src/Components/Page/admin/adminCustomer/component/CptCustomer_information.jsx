import React from "react";
import PropTypes from "prop-types";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Image,
  Table,
  Descriptions,
} from "antd";
import "../information.css";
import { Tabs } from "antd";

const { TabPane } = Tabs;
///

/// columns
// https://stackoverflow.com/questions/54651566/different-row-data-in-nested-table-row
const expandedRowRender = (row) => {
  console.log("row", row);
  const columns = [
    { title: "ProductID", dataIndex: "productID" },
    { title: "Title", dataIndex: "title" },
    { title: "Amount", dataIndex: "amount" },
    { title: "Sale", dataIndex: "sale" },
  ];
  // Data cua dropdown table History
  const data = [
    {
      productID: 1,
      title: "thời trang ",
      amount: 5,
      sale: 200020,
    },
    {
      productID: 1,
      title: "thời trang ",
      amount: 5,
      sale: 200020,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      size="small"
      rowKey="productID"
    />
  );
};

const CptCustomer_information = (props) => {
  const { dataView } = props;
  console.log("dataView :>> ", dataView);
  const columns = [
    { title: "BillId", dataIndex: "billId" },
    { title: "Date", dataIndex: "date" },
    { title: "Total", dataIndex: "total" },
  ];

  const data = [
    {
      billId: "BI100",
      date: "2014-12-24 23:12:00",
      total: 12645621181,
    },
    {
      billId: "BI101",
      date: "2014-12-24 23:12:00",
      total: 12645621181,
    },
    {
      billId: "BI102",
      date: "2014-12-24 23:12:00",
      total: 12645621181,
    },
  ];

  return (
    <div className="card-container">
      <Tabs type="card" size="small">
        <TabPane tab="Information" key="1">
          <Image className="Information__img" src={dataView.picture} />

          <Descriptions
            bordered
            column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
          >
            <Descriptions.Item label="Name">
              {dataView.firstName} {dataView.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {dataView.email}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {dataView.address}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {dataView.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Bill">5</Descriptions.Item>
          </Descriptions>
        </TabPane>
        <TabPane tab="History" key="2">
          <Table
            className="components-table-demo-nested"
            columns={columns}
            expandable={{ expandedRowRender }}
            dataSource={data}
            size="small"
            rowKey="billId"
          />
        </TabPane>
      </Tabs>
    </div>
  );
};
export default CptCustomer_information;
