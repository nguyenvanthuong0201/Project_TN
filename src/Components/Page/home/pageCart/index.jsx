import {
  CloseCircleOutlined,
  DeleteFilled,
  DeleteOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Image,
  PageHeader,
  Popconfirm,
  Row,
  Table,
} from "antd";
import Column from "antd/lib/table/Column";
import React from "react";

function PageCart(props) {
  const handleDelete = (a) => {
    console.log(a);
  };
  const columns = [
    {
      title: "",
      dataIndex: "action",
      width: "5%",
      align: "center",
      render: (text, record) => (
        <>
          <Popconfirm
            placement="bottom"
            title="Are you sure delete this product?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" icon={<CloseCircleOutlined />} />
          </Popconfirm>
        </>
      ),
    },
    {
      title: "STT",
      dataIndex: "index",
      align: "center",
      width: "5%",
    },
    {
      title: "Picture",
      dataIndex: "picture",
      align: "center",
      width: "15%",
      render: (picture) => (
        <>
          <Image style={{ cursor: "pointer" }} src={picture} />
        </>
      ),
    },
    {
      title: "Sale",
      dataIndex: "sale",
      align: "center",
      width: "20%",
      render: (sale) => (
        <>
          <b style={{ color: "red" }}>{parseInt(sale).toLocaleString()} ₫</b>
        </>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      align: "center",
      width: "20%",
      render: (sale) => (
        <>
          <Button
            style={{ float: "left" }}
            shape="round"
            type="primary"
            icon={<MinusCircleOutlined />}
          />
          <span>{sale}</span>
          <Button
            style={{ float: "right" }}
            shape="round"
            type="primary"
            icon={<PlusCircleOutlined />}
          />
        </>
      ),
    },
    {
      title: "Size",
      dataIndex: "size",
      align: "center",
      width: "10%",
    },
    {
      title: "Total",
      dataIndex: "cost",
      align: "center",
      width: "20%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.cost - b.cost,
      render: (cost) => (
        <>
          <b style={{ color: "red" }}>{parseInt(cost).toLocaleString()} ₫</b>
        </>
      ),
    },
  ];
  const data = [
    {
      index: "1",
      picture:
        "data:image/jpeg;base64,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",
      sale: 3000000,
      amount: 12,
      size: "M",
      cost: 300000,
    },
    {
      index: "2",
      picture:
        "https://www.incimages.com/uploaded_files/image/1920x1080/getty_474606212_2000133320009280160_240366.jpg",
      sale: 3000000,
      amount: 1000,
      size: "M",
      cost: 300000,
    },
  ];

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="View Cart"
        ghost={false}
        onBack={() => window.history.back()}
      />
      <Row>
        <Col xs={24} md={24} lg={16} xl={16}>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
            size="small"
            rowKey="key"
          />
        </Col>
        <Col xs={24} md={24} lg={8} xl={8}>
          <Card title="Total Card">
            <Descriptions
              bordered
              column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
            >
              <Descriptions.Item label="Total Money">a</Descriptions.Item>
              <Descriptions.Item label="Amount">aa</Descriptions.Item>
            </Descriptions>
            <Row gutter={[32, 0]}>
              <Col xs={24} md={24} lg={12} xl={12}>
                <Button style={{ width: "100%", height: "50px" }} type="dashed">
                  CONTINUE BUYING
                </Button>
              </Col>
              <Col xs={24} md={24} lg={12} xl={12}>
                <Button
                  style={{ width: "100%", height: "50px" }}
                  type="primary"
                >
                  CONTINUE PAYMENT
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default PageCart;
