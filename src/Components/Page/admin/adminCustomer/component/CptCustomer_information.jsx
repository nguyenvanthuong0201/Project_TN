import React, { useEffect } from "react";
import PropTypes from "prop-types";
import firebase from "../../.../../../../../utils/firebase";
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
import { useState } from "react";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { format } from "../../../../../data/dataAdminProduct";
import ModalHistoryCustomer from "../component/ModalHistoryCustomer";

const { TabPane } = Tabs;
const moment = require("moment");

///

/// columns
// https://stackoverflow.com/questions/54651566/different-row-data-in-nested-table-row

const CptCustomer_information = (props) => {
  const { dataView } = props;
  const [dataFireBase, setDataFireBase] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [dataHistory, setDataHistory] = useState({});
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
  console.log("dataView :>> ", dataView);
  const showBill = (data) => {
    let number = 0;
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        number += 1;
      }
    }
    return number;
  };
  const handleView = (value) => {
    setOpenModal(true);
    setDataHistory(value);
  };
  const columns = [
    {
      title: "Action",
      dataIndex: "action",
      width: "8%",
      fixed: "left",
      render: (text, record) => (
        <Button
          style={{ marginRight: "3px" }}
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => handleView(record)}
        />
      ),
    },
    {
      title: "Stt",
      dataIndex: "index",
      width: "8%",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Payment ID",
      dataIndex: "createDate",
      width: "20%",
      render: (createDate) => ShowCodeNumber(createDate),
    },
    {
      title: "Money",
      dataIndex: "paymentSubTotal",
      width: "30%",
      render: (paymentSubTotal) => (
        <>
          <b style={{ color: "red" }}>
            {parseInt(paymentSubTotal).toLocaleString()} ₫
          </b>
        </>
      ),
    },
    {
      title: "Date",
      dataIndex: "createDate",
      width: "30%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.createDate - b.createDate,
      render: (createDate) => <>{moment(createDate).format(format.date)}</>,
    },
  ];
  const ArrayDataFirebase = (value) => {
    if (value.email === dataView.email && value.status === "Success") {
      return value;
    }
  };
  const dataViewCustomer = dataFireBase.filter(ArrayDataFirebase);
  return (
    <div className="card-container">
      <ModalHistoryCustomer
        openModal={openModal}
        dataHistory={dataHistory}
        setOpenModal={setOpenModal}
      />
      <Tabs type="card" size="small">
        <TabPane tab="Info" key="1">
          <Image
            className="Information__img"
            src={dataView.photoURL ? dataView.photoURL : dataView.picture}
          />

          <Descriptions
            bordered
            column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
          >
            <Descriptions.Item label="Name">
              {dataView.firstName}
              {""}
              {dataView.lastName}
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
            <Descriptions.Item label="Bill">
              {showBill(dataViewCustomer)}
            </Descriptions.Item>
          </Descriptions>
        </TabPane>
        <TabPane tab="History" key="2">
          <Table
            className="components-table-demo-nested"
            columns={columns}
            dataSource={dataViewCustomer}
            size="small"
            pagination={{ pageSize: 10 }}
            rowKey="createDate"
          />
        </TabPane>
      </Tabs>
    </div>
  );
};
export default CptCustomer_information;
