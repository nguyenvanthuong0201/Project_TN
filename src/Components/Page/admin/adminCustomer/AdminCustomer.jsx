import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Drawer,
  Input,
  notification,
  PageHeader,
  Popconfirm,
  Row,
} from "antd";
import { Table } from "antd";
import {
  DeleteOutlined,
  EyeOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import CptCustomer_information from "./component/CptCustomer_information";
import CptCustomer_drawerAdd from "./component/CptCustomer_drawerAdd";
import firebase from "../../../../utils/firebase";
import { format } from "../../../../data/dataAdminProduct";
import { motion } from "framer-motion";
import {
  pageAnimate,
  pageStyle,
  pageTransitionX,
} from "../../../../data/transition";

const moment = require("moment");

function AdminCustomer(props) {
  const [drawer, setDrawer] = useState(false);
  const [dataFireBase, setDataFireBase] = useState([]);
  const [filterTable, setFilterTable] = useState(null);
  const [dataView, setDataView] = useState("");

  const handleView = (record) => {
    setDataView(record);
  };
  useEffect(() => {
    handleClickGetAll();
  }, []);
  const columns = [
    {
      title: "Action",
      dataIndex: "action",
      width: "10%",
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
            title="Are you sure delete this product?"
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
      title: "STT",
      dataIndex: "index",
      width: "5%",
      render: (text, record, index) => index + 1,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      width: "10%",
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
      width: "20%",
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "20%",
    },
    {
      title: "Create date",
      dataIndex: "createDate",
      width: "10%",
      render: (createDate) => <>{moment(createDate).format(format.dateTime)}</>,
    },
    {
      title: "Bill",
      width: "5%",
      dataIndex: "bill",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.bill - b.bill,
    },
  ];
  const handleDelete = (id) => {
    firebase
      .firestore()
      .collection("/customer")
      .doc(id)
      .delete()
      .then(() => {
        notification.success({
          message: "Delete success !!!!!",
          placement: "bottomLeft",
          style: { backgroundColor: "greenyellow" },
        });
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const handleClickGetAll = () => {
    let tutorialsRef = firebase.firestore().collection("/customer");
    tutorialsRef.onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        const {
          firstName,
          lastName,
          password,
          phone,
          email,
          address,
          picture,
          createDay,
          position,
          photoURL,
        } = doc.data();
        data.push({
          key: doc.id,
          firstName,
          lastName,
          password,
          phone,
          email,
          address,
          picture,
          createDay,
          position,
          photoURL,
        });
        console.log("dataCustomer", data);
      });
      setDataFireBase(data);
    });
  };
  const handleSearchTable = (value) => {
    const filterTable = dataFireBase.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilterTable(filterTable);
  };

  return (
    <motion.div
      initial="initial"
      exit="out"
      animate="in"
      variants={pageTransitionX}
      transition={pageAnimate}
    >
      {/* <PageHeader title="Customer" ghost={false} /> */}
      <Card style={{ borderRadius: "10px" }} size="small">
        <Row>
          <Col xs={24} md={16} lg={15}>
            <Row>
              <Col xs={24} md={24} lg={10}>
                <Input.Search
                  style={{ backgroundColor: "#FDA30E" }}
                  placeholder="Search by..."
                  enterButton
                  onSearch={handleSearchTable}
                  allowClear={true}
                />
              </Col>
              <Col xs={24} md={24} lg={3} offset={11}>
                <Button
                  style={{ backgroundColor: "#FDA30E" }}
                  block
                  icon={<PlusSquareOutlined />}
                  onClick={() => setDrawer(true)}
                  type="primary"
                >
                  Add
                </Button>
              </Col>
            </Row>
            {/* Start Drawer*/}
            <CptCustomer_drawerAdd drawer={drawer} setDrawer={setDrawer} />
            {/* End Drawer*/}
            <Row>
              <Col xs={24} md={24} lg={24}>
                <Table
                  columns={columns}
                  dataSource={filterTable == null ? dataFireBase : filterTable}
                  pagination={{ pageSize: 10 }}
                  size="small"
                  scroll={{ x: 1500, y: 350 }}
                  rowKey="createDate"
                  style={{ marginTop: "10px" }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={8} lg={8} offset={1}>
            <CptCustomer_information dataView={dataView} />
          </Col>
        </Row>
      </Card>
    </motion.div>
  );
}

export default AdminCustomer;
