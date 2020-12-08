import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Input,
  notification,
  Popconfirm,
  Row,
  Tag,
} from "antd";
import { Table } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { pageAnimate, pageTransitionX } from "../../../../data/transition";
import firebase from "../../../../utils/firebase";
import { format } from "../../../../data/dataAdminProduct";
import ModalPayment from "./component/ModalPayment";
const moment = require("moment");
function AdminPayment(props) {
  const [filterTable, setFilterTable] = useState(null);
  const [dataFireBase, setDataFireBase] = useState([]);
  const [dataView, setDataView] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const ShowCodeNumber = (number) => {
    const string = number.toString();
    const month = string.substr(3, 7);
    const day = string.substr(10, 3);
    return (
      <>
        <span style={{ color: "green" }}>{month}</span>
        <span style={{ color: "red" }}>{day}</span>
      </>
    );
  };
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
            disabled={record.status === "Cancel" ? true : false}
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
      title: "STT",
      dataIndex: "index",
      width: "5%",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Payment ID",
      dataIndex: "createDate",
      width: "10%",
      render: (createDate) => ShowCodeNumber(createDate),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
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
      title: "Price",
      dataIndex: "paymentSubTotal",
      width: "10%",
      sorter: (a, b) => a.paymentSubTotal - b.paymentSubTotal,
      render: (paymentSubTotal) => (
        <>
          <b style={{ color: "red" }}>
            {parseInt(paymentSubTotal).toLocaleString()} ₫{" "}
          </b>
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "10%",
      filters: [
        {
          text: "Orders",
          value: "Orders",
        },
        {
          text: "Confirmed",
          value: "Confirmed",
        },
        {
          text: "Shipping",
          value: "Shipping",
        },
        {
          text: "Success",
          value: "Success",
        },
        {
          text: "Cancel",
          value: "Cancel",
        },
      ],
      render: (status) => (
        <>
          <Tag
            color={
              (status === "Orders" && "red") ||
              (status === "Confirmed" && "yellow") ||
              (status === "Shipping" && "blue") ||
              (status === "Cancel" && "gray") ||
              (status === "Success" && "green")
            }
          >
            {status}
          </Tag>
        </>
      ),
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Create Date",
      width: "10%",
      dataIndex: "createDate",
      sorter: (a, b) => a.createDate - b.createDate,
      defaultSortOrder: "descend",
      render: (createDate) => <>{moment(createDate).format(format.dateTime)}</>,
    },
  ];
  useEffect(() => {
    handleClickGetAll();
  }, []);

  const handleClickGetAll = () => {
    let tutorialsRef = firebase.firestore().collection("/payment");
    tutorialsRef.onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        const {
          createDate,
          address,
          checkboxOther,
          email,
          firstName,
          lastName,
          note,
          payment,
          paymentSubTotal,
          phone,
          status,
          typePayment,
          addressOther,
          emailOther,
          firstNameOther,
          lastNameOther,
          phoneOther,
          photoURL,
        } = doc.data();
        data.unshift({
          key: doc.id,
          createDate,
          address,
          checkboxOther,
          email,
          firstName,
          lastName,
          note,
          payment,
          paymentSubTotal,
          phone,
          status,
          typePayment,
          addressOther,
          emailOther,
          firstNameOther,
          lastNameOther,
          phoneOther,
          photoURL,
        });
      });
      setDataFireBase(data);
    });
  };

  for (let i = 0; i < dataFireBase; i++) {
    dataFireBase.push({
      index: i + 1,
    });
  }
  //firebase Delete
  const handleDelete = (id) => {
    firebase
      .firestore()
      .collection("/payment")
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

  const handleView = (record) => {
    setOpenModal(true);
    setDataView(record);
  };
  // / Search toàng cục
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
      <ModalPayment
        openModal={openModal}
        dataView={dataView}
        setOpenModal={setOpenModal}
      />
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
              dataSource={filterTable == null ? dataFireBase : filterTable}
              pagination={{ pageSize: 10 }}
              size="small"
              rowKey="createDate"
            />
          </Col>
        </Row>
      </Card>
    </motion.div>
  );
}

export default AdminPayment;
