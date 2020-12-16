import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Col, Descriptions, Image, Row, Table } from "antd";
import Modal from "antd/lib/modal/Modal";

const ModalHistoryCustomer = (props) => {
  const { openModal, dataHistory, setOpenModal } = props;
  const handleCancel = () => {
    setOpenModal(false);
  };
  const handleOk = () => {
    setOpenModal(false);
  };
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

  return (
    <Modal
      title="INFORMATION HiSTORY"
      visible={openModal}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
    >
      <Row>
        <Col
          xs={24}
          sm={24}
          md={24}
          xl={24}
          style={{ justifyContent: "center" }}
        >
          <Descriptions
            title="Information Customer"
            bordered
            column={{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="Full Name">
              {dataHistory.firstName}
              {dataHistory.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {dataHistory.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {dataHistory.email}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {dataHistory.address}
            </Descriptions.Item>
            <Descriptions.Item label="Money Ship">
              <b style={{ color: "red" }}>35,000 ₫ </b>
            </Descriptions.Item>
            <Descriptions.Item label="TypePayment">
              {dataHistory.typePayment ? "Payment on delivery" : "Mo mo "}
            </Descriptions.Item>
            <Descriptions.Item label="Note">
              {dataHistory.note === "" ? "No note" : dataHistory.note}
            </Descriptions.Item>
            <Descriptions.Item label="Money">
              <b style={{ color: "red" }}>
                {" "}
                {parseInt(dataHistory.paymentSubTotal).toLocaleString()} ₫
              </b>
            </Descriptions.Item>
          </Descriptions>
          {dataHistory.checkboxOther === true ? (
            <Descriptions
              title="Information Other"
              bordered
              column={{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="FullName Other">
                {dataHistory.firstNameOther}
                {dataHistory.lastNameOther}
              </Descriptions.Item>
              <Descriptions.Item label="Phone Other">
                {dataHistory.phoneOther}
              </Descriptions.Item>
              <Descriptions.Item label="Email Other">
                {dataHistory.emailOther}
              </Descriptions.Item>
              <Descriptions.Item label="Address Other">
                {dataHistory.addressOther}
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
            dataSource={dataHistory.payment}
            pagination={{ pageSize: 5 }}
            size="small"
            rowKey="index"
            scroll={{ y: 200 }}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalHistoryCustomer;
