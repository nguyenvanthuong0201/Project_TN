import React from "react";
import { Button, Card, Col, Descriptions, Popconfirm, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import { format } from "../../../../../data/dataAdminProduct";
const moment = require("moment");
function AdminProduct_ViewModal(props) {
  let { openModal, dataView, handleOk, handleCancel } = props;
  console.log(openModal, dataView);
  return (
    <Modal
      title={dataView.title}
      visible={openModal}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      width={500}
    >
      <Row gutter={[32, 0]}>
        <Col xs={24} sm={24} md={10} xl={10}>
          <Card
            hoverable
            cover={<img alt="example" src={dataView.picture} />}
          />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={14}
          xl={14}
          style={{ justifyContent: "center" }}
        >
          <Descriptions layout="horizontal">
            <Descriptions.Item label="Type" span={3}>
              <b>{dataView.type} </b>
            </Descriptions.Item>
            <Descriptions.Item label="Size" span={3}>
              <b> {dataView.size} </b>
            </Descriptions.Item>
            <Descriptions.Item label="Amount" span={3}>
              <b>{dataView.amount}</b>
            </Descriptions.Item>
            <Descriptions.Item label="Cost" span={3}>
              <b>{parseInt(dataView.cost).toLocaleString()} ₫</b>
            </Descriptions.Item>
            <Descriptions.Item label="Sale" span={3}>
              <b>{parseInt(dataView.sale).toLocaleString()} ₫</b>
            </Descriptions.Item>
            <Descriptions.Item label="Create" span={3}>
              <b>{moment(dataView.createDay).format(format.dateTime)}</b>
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Modal>
  );
}

export default AdminProduct_ViewModal;
