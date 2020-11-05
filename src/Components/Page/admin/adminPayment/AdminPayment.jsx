import React, { useState } from "react";
import { Button, Card, Col, Input, Popconfirm, Row } from "antd";
import { Table } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";

function AdminPayment(props) {
  const [filterTable, setFilterTable] = useState(null);

  const columns = [
    {
      title: "Action",
      dataIndex: "action",
      width: "7%",
      fixed: "left",
      render: (text, record) => (
        <>
          <Button
            style={{ marginRight: "3px" }}
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          />
          <Popconfirm
            placement="bottom"
            title="Are you sure delete this payment?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },

    {
      title: "First Name",
      dataIndex: "firstName",
      width: "10%",
      defaultSortOrder: "descend",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.firstName.length - b.firstName.length,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      width: "10%",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: "10%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "25%",
    },
    {
      title: "Cart",
      dataIndex: "cart",
      width: "20%",
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "10%",
      sorter: (a, b) => a.price - b.price,
    },
  ];

  const data = [
    {
      paymentId: "ABC8",
      customerId: "DEF1 ",
      firstName: "Thương",
      lastName: "Nguyễn",
      phone: 388846810,
      email: "nguyenvanthuong0201@gmail.com ",
      cart: "quần shot x 1 ,áo thun x 2",
      price: 30000000,
    },
    {
      paymentId: "ABC9",
      customerId: "DEF2 ",
      firstName: "Thương",
      lastName: "Nguyễn",
      phone: 388846810,
      email: "nguyenvanthuong0201@gmail.com ",
      cart: "quần shot x 1 ,áo thun x 2",
      price: 30000000,
    },
    {
      paymentId: "ABC10",
      customerId: "DEF3 ",
      firstName: "Thương",
      lastName: "Nguyễn",
      phone: 388846810,
      email: "nguyenvanthuong0201@gmail.com ",
      cart: "quần shot x 1 ,áo thun x 2",
      price: 30000000,
    },
    {
      paymentId: "ABC11",
      customerId: "DEF4 ",
      firstName: "Thương",
      lastName: "Nguyễn",
      phone: 42424242,
      email: "nguyenvanthuong0201@gmail.com ",
      cart: "quần shot x 1 ,áo thun x 2",
      price: 242424,
    },
    {
      paymentId: "ABC12",
      customerId: "DEF5 ",
      firstName: "Trung",
      lastName: "Nguyễn",
      phone: 42424242,
      email: "nguyenvanthuong0201@gmail.com ",
      cart: "quần shot x 1 ,áo thun x 2",
      price: 242424,
    },
    {
      paymentId: "ABC13",
      customerId: "DEF6 ",
      firstName: "Sự",
      lastName: "Nguyễn",
      phone: 388846810,
      email: "nguyenvanthuong0201@gmail.com ",
      cart: "quần shot x 1 ,áo thun x 2",
      price: 55544,
    },
    {
      paymentId: "ABC14",
      customerId: "DEF7 ",
      firstName: "Thương",
      lastName: "Nguyễn",
      phone: 388846810,
      email: "nguyenvanthuong0201@gmail.com ",
      cart: "quần shot x 1 ,áo thun x 2",
      price: 30000000,
    },
    {
      paymentId: "ABC15",
      customerId: "DEF8 ",
      firstName: "Thương",
      lastName: "Nguyễn",
      phone: 388846810,
      email: "nguyenvanthuong0201@gmail.com ",
      cart: "quần shot x 1 ,áo thun x 2",
      price: 30000000,
    },
    {
      paymentId: "ABC16",
      customerId: "DEF9 ",
      firstName: "Thương",
      lastName: "Nguyễn",
      phone: 388846810,
      email: "nguyenvanthuong0201@gmail.com ",
      cart: "quần shot x 1 ,áo thun x 2",
      price: 30000000,
    },
  ];
  const handleDelete = (id) => {
    // firebase
    //   .firestore()
    //   .collection("/customer")
    //   .doc(id)
    //   .delete()
    //   .then(() => {
    //     console.log("Document successfully deleted!");
    //     notification.success({
    //       message: "Delete success !!!!!",
    //       placement: "bottomLeft",
    //       style: { backgroundColor: "greenyellow" },
    //     });
    //   })
    //   .catch((error) => {
    //     console.error("Error removing document: ", error);
    //   });
    console.log("id :>> ", id);
  };
  const handleView = (record) => {
    console.log("record :>> ", record);
  };
  // / Search toàng cục
  const handleSearchTable = (value) => {
    const filterTable = data.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilterTable(filterTable);
  };

  return (
    <div>
      <Card style={{ borderRadius: "10px" }} size="small">
        <Row>
          <Col xs={24} md={24} lg={10}>
            <Input.Search
              placeholder="Search by..."
              enterButton
              onSearch={handleSearchTable}
              allowClear={true}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={24} md={24} lg={24}>
            <Table
              columns={columns}
              dataSource={filterTable == null ? data : filterTable}
              pagination={{ pageSize: 6 }}
              size="small"
              rowKey="paymentId"
              scroll={{ x: 1200, y: 300 }}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default AdminPayment;
