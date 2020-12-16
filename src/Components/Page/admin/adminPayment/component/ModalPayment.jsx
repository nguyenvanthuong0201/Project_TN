import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Image,
  InputNumber,
  notification,
  Row,
  Table,
} from "antd";
import firebase from "../../../../../utils/firebase";
import Modal from "antd/lib/modal/Modal";
import { format } from "../../../../../data/dataAdminProduct";
import { Steps } from "antd";
const moment = require("moment");
const { Step } = Steps;
function ModalPayment(props) {
  const [step, setStep] = useState();
  const SumItem = (amount, record) => {
    if (record.option === "Promotion") {
      return (amount * record.sale).toLocaleString();
    } else {
      return (amount * record.buy).toLocaleString();
    }
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      align: "center",
      width: "5%",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Picture",
      dataIndex: "picture",
      align: "center",
      width: "6%",
      render: (picture) => (
        <>
          <Image style={{ cursor: "pointer" }} src={picture} />
        </>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      align: "center",
      width: "20%",
    },
    {
      title: "Sale",
      dataIndex: "sale",
      align: "center",
      width: "10%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.sale - b.sale,
      render: (sale, record) => (
        <b style={{ color: "red" }}>
          {(record.option === "Promotion"
            ? record.sale
            : record.buy
          ).toLocaleString()}
          ₫
        </b>
      ),
    },
    {
      title: "Amount",
      dataIndex: "buyCart",
      align: "center",
      width: "20%",
      render: (buyCart) => (
        <>
          <p>{buyCart.amount}</p>
        </>
      ),
    },
    {
      title: "Size",
      dataIndex: "buyCart",
      align: "center",
      width: "10%",
      render: (buyCart) => <>{buyCart.size}</>,
    },
    {
      title: "Total",
      dataIndex: "sale",
      align: "center",
      width: "20%",
      render: (sale, record) => (
        <>
          <b style={{ color: "red" }}>
            {SumItem(record.buyCart.amount, record)} ₫
          </b>
        </>
      ),
    },
  ];
  let { openModal, dataView, setOpenModal } = props;
  const onChangeStep = (current) => {
    setStep(current);
  };
  const handleOk = () => {
    if (step !== undefined) {
      let stepText = "";
      if (step === 1) {
        stepText = "Orders";
      } else if (step === 2) {
        stepText = "Confirmed";
      } else if (step === 3) {
        stepText = "Shipping";
      } else if (step === 4) {
        stepText = "Success";
      }
      const updateRef = firebase
        .firestore()
        .collection("payment")
        .doc(dataView.key);
      updateRef
        .update({
          status: stepText,
        })
        .then((docRef) => {
          setOpenModal(false);
          setStep();
          notification.success({
            message: "Update success !!!!!",
            placement: "bottomLeft",
            style: { backgroundColor: "greenyellow" },
          });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } else {
      setOpenModal(false);
    }
  };
  const handleCancel = () => {
    setOpenModal(false);
    setStep();
  };
  const onPaymentStep = () => {
    setStep(4);
  };

  return (
    <Modal
      title="INFORMATION PAYMENT CART"
      visible={openModal}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
    >
      <Row>
        <Col xs={24} sm={24} md={24} xl={24}>
          <Steps
            ///Step Antd chuyển từ text thành number để current
            current={
              (step ? step : dataView.status === "Orders" && 1) ||
              (step ? step : dataView.status === "Confirmed" && 2) ||
              (step ? step : dataView.status === "Shipping" && 3) ||
              (step ? step : dataView.status === "Success" && 4)
            }
            onChange={onChangeStep}
          >
            <Step
              title="Orders"
              description="Orders placed."
              disabled={dataView.status === "Success" ? true : false}
            />
            <Step
              title="Confirmed"
              description="Payment information confirmed."
              disabled={dataView.status === "Success" ? true : false}
            />
            <Step
              title="Shipping"
              description="Delivered to shipping."
              disabled={dataView.status === "Success" ? true : false}
            />
            <Step
              title="Success"
              description="Orders have been delivered."
              disabled={dataView.status === "Success" ? true : false}
            />
          </Steps>
          <div style={{ textAlign: "center" }}>
            <Button
              type="primary"
              shape="round"
              disabled={dataView.status === "Success" ? true : false}
              onClick={onPaymentStep}
            >
              PAYMENT SUCCESS
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col
          xs={24}
          sm={24}
          md={24}
          xl={24}
          style={{ justifyContent: "center" }}
        >
          <Descriptions
            title="Information customer"
            bordered
            column={{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="Full Name">
              {dataView.firstName}
              {dataView.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {dataView.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {dataView.email}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {dataView.address}
            </Descriptions.Item>
            <Descriptions.Item label="Money Ship">
              <b style={{ color: "red" }}>35,000 ₫</b>
            </Descriptions.Item>
            <Descriptions.Item label="TypePayment">
              {dataView.typePayment ? "Payment on delivery" : "Mo mo "}
            </Descriptions.Item>
            <Descriptions.Item label="Note">
              {dataView.note === "" ? "No note" : dataView.note}
            </Descriptions.Item>
            <Descriptions.Item label="Money">
              <b style={{ color: "red" }}>
                {" "}
                {parseInt(dataView.paymentSubTotal).toLocaleString()} ₫
              </b>
            </Descriptions.Item>
          </Descriptions>
          {dataView.checkboxOther === true ? (
            <Descriptions
              title="Information Other"
              bordered
              column={{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="FullName Other">
                {dataView.firstNameOther}
                {dataView.lastNameOther}
              </Descriptions.Item>
              <Descriptions.Item label="Phone Other">
                {dataView.phoneOther}
              </Descriptions.Item>
              <Descriptions.Item label="Email Other">
                {dataView.emailOther}
              </Descriptions.Item>
              <Descriptions.Item label="Address Other">
                {dataView.addressOther}
              </Descriptions.Item>
            </Descriptions>
          ) : (
            ""
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={24} xl={24}>
          <Table
            columns={columns}
            dataSource={dataView.payment}
            pagination={{ pageSize: 5 }}
            size="small"
            rowKey="index"
            scroll={{ y: 200 }}
          />
        </Col>
      </Row>
    </Modal>
  );
}

export default ModalPayment;
