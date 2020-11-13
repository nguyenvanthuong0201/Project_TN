import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Modal from "antd/lib/modal/Modal";
import {
  Form,
  Button,
  Checkbox,
  Col,
  Input,
  InputNumber,
  Row,
  Radio,
  notification,
} from "antd";
import DrawerCart from "../../Cart/DrawerCart";
import { listCarts } from "../../../../../Actions/cartActions.js";
import { useDispatch } from "react-redux";
import { Link, NavLink, Redirect } from "react-router-dom";
import Login from "../../Login";

function InformationModal(props) {
  const [form] = Form.useForm();
  const [dataAddOnCart, setDataAddOnCart] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [toPay, setToPay] = useState(false);
  const dispatch = useDispatch();

  let { openModal, handleOk, handleCancel, dataView } = props;
  const onFinish = (value) => {
    let body = {
      ...dataView,
      buy: value,
    };
    setDataAddOnCart(body);
    if (toPay === false) {
      dispatch(listCarts(body));
      setDrawer(true);
      notification.success({
        message: "Add product success !!!!!",
        placement: "bottomLeft",
        style: { backgroundColor: "greenyellow" },
      });
    } else {
      dispatch(listCarts(body));
      setToPay(false);
      window.location.href = "http://localhost:3000/login";
    }
  };
  const onBuyNow = () => {
    setToPay(true);
  };

  console.log(toPay, "toPay");
  return (
    <Modal
      title="Information Product"
      visible={openModal}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      width={800}
    >
      {/* VIEW GIỎ HÀNG */}
      <DrawerCart
        drawer={drawer}
        setDrawer={setDrawer}
        dataAddOnCart={dataAddOnCart}
      />
      {/* ------ */}
      {/* MODAL LOGIN */}
      {/* ----- */}
      <Row gutter={[32, 0]}>
        <Col xs={24} md={24} lg={8} xl={8}>
          <img
            style={{ width: "100%" }}
            src={dataView.picture}
            alt="Img-product"
          />
        </Col>
        <Col xs={24} md={24} lg={16} xl={16}>
          <h2>{dataView.title}</h2>
          {console.log("dataView.sale", typeof dataView.sale)}
          <h3>{Number(dataView.sale).toLocaleString()} ₫</h3>
          <Form
            name="basic"
            onFinish={onFinish}
            layout="horizontal" // Form chỉnh các lable va input
          >
            <Form.Item
              label="Amount "
              name="amount"
              initialValue={1}
              rules={[
                {
                  required: true,
                  type: "number",
                  message: "amount >= 1 !!!",
                },
              ]}
            >
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item
              label="Size"
              name="size"
              rules={[{ required: true, message: "Please input your size!!!" }]}
            >
              <Radio.Group options={dataView.size} />
            </Form.Item>
            <Form.Item shouldUpdate={true}>
              <Fragment>
                <Row gutter={[32, 0]}>
                  <Col xl={24} md={24} lg={12} xl={12}>
                    <Button
                      type="ghost"
                      style={{
                        backgroundColor: "#008000",
                        width: "100%",
                        height: "50px",
                        fontWeight: "bold",
                      }}
                      disabled={
                        !form.isFieldsTouched(true) ||
                        form
                          .getFieldsError()
                          .filter(({ errors }) => errors.length).length
                      }
                      htmlType="submit"
                    >
                      ADD TO CARD
                    </Button>
                  </Col>
                  <Col xl={24} md={24} lg={12} xl={12}>
                    <Button
                      type="ghost"
                      onClick={onBuyNow}
                      style={{
                        backgroundColor: "#B22222",
                        width: "100%",
                        height: "50px",
                        fontWeight: "bold",
                      }}
                      htmlType="submit"
                    >
                      BUY NOW
                    </Button>
                  </Col>
                </Row>
                {/* Form button reset */}
              </Fragment>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
}

export default InformationModal;
