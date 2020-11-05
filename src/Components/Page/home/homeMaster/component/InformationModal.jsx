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
} from "antd";
import DrawerCart from "../../Cart/DrawerCart";
import { listCarts } from "../../../../../Actions/cartActions.js";
import { useDispatch } from "react-redux";

function InformationModal(props) {
  const [form] = Form.useForm();
  const [dataAddOnCart, setDataAddOnCart] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const dispatch = useDispatch();

  let { openModal, handleOk, handleCancel, dataView } = props;
  // console.log("dataView :>> ", dataView);
  const onFinish = (value) => {
    let body = {
      ...dataView,
      buy: value,
    };
    // console.log(body)
    setDataAddOnCart(body);
    setDrawer(true);
    console.log("dispatch");
    dispatch(listCarts(body));
  };
  const onClickByNow = () => {
    // dispatch(listCarts("sss", 1));
  };
  return (
    <Modal
      title="Information Product"
      visible={openModal}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      width={800}
    >
      <DrawerCart
        drawer={drawer}
        setDrawer={setDrawer}
        dataAddOnCart={dataAddOnCart}
      />
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
                  // min: 1,
                  // max: 999,
                  message: "Amount >= 1 !!!",
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
                      htmlType="submit"
                      disabled={
                        !form.isFieldsTouched(true) ||
                        form
                          .getFieldsError()
                          .filter(({ errors }) => errors.length).length
                      }
                    >
                      ADD TO CARD
                    </Button>
                  </Col>

                  <Col xl={24} md={24} lg={12} xl={12}>
                    <Button
                      onClick={onClickByNow}
                      type="ghost"
                      style={{
                        backgroundColor: "#B22222",
                        width: "100%",
                        height: "50px",
                        fontWeight: "bold",
                      }}
                      htmlType="submit"
                      disabled={
                        !form.isFieldsTouched(true) ||
                        form
                          .getFieldsError()
                          .filter(({ errors }) => errors.length).length
                      }
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
