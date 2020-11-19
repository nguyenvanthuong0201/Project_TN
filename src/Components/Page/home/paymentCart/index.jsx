import { CloseCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Input,
  InputNumber,
  Row,
  Form,
  PageHeader,
  Collapse,
  Checkbox,
  Table,
  Popconfirm,
  Descriptions,
  Radio,
} from "antd";
import Text from "antd/lib/typography/Text";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { deleteCarts, paymentCustody } from "../../../../Actions";
import { checkBoxPayment } from "../../../../data/dataAdminProduct";
import "./paymentCart.css";

const { Panel } = Collapse;
function HomePaymentCart(props) {
  const [checkboxOther, setCheckBoxOther] = useState(false);
  const userLogin = useSelector((state) => state.reLogin);
  const reCard = useSelector((state) => state.reCard);
  const dispatch = useDispatch();
  const history = useHistory();

  //// Set Thanh toán
  const string = window.location.href;
  const substring = "message=Success";

  // useEffect(() => {
  //   if (string.includes(substring)) {
  //     // const updateStatus = "Đang xử lý";
  //     // dispatch(oderDetail(id, updateStatus));
  //     console.log("Câp nhap");
  //   } else {
  //     console.log("Không Câp nhap");
  //     // dispatch(oderDetail(id));
  //   }
  // }, []);
  /////
  const onFinishFailed = (onFinishFailed) => {
    console.log("onFinishFailed", onFinishFailed);
  };
  const onFinish = (onFinish) => {
    let value = {
      ...onFinish,
      payment: reCard,
      checkboxOther,
      paymentSubTotal: document.getElementById("paymentSubTotal").innerHTML,
      status: "Tạm giữ",
    };
    if (value.typePayment === "momo") {
      dispatch(paymentCustody(value));
    } else {
      history.push("/");
    }
  };
  const handleDelete = (card, key) => {
    const index = findProductInCart(card, key);
    dispatch(deleteCarts(index));
  };
  var findProductInCart = (card, key) => {
    var index = -1;
    if (card.length > 0) {
      for (var i = 0; i < card.length; i++) {
        if (card[i].key === key) {
          index = i;
          break;
        }
      }
    }
    return index;
  };
  const callback = () => {
    setCheckBoxOther(!checkboxOther);
  };
  const SumItem = (amount, record) => {
    if (record.option === "Promotion") {
      return (amount * record.sale).toLocaleString();
    } else {
      return (amount * record.buy).toLocaleString();
    }
  };
  const ArrayProductSale = (value) => {
    if (value.option === "Promotion") {
      return value;
    }
  };
  const ArrayProductBuy = (value) => {
    if (value.option !== "Promotion") {
      return value;
    }
  };
  /// tổng tiền cả giỏ hàng
  const SumTotalPromotion = (card) => {
    let sale = card.filter(ArrayProductSale);
    let totalPromotion = 0;
    if (sale.length > 0) {
      for (let i = 0; i < sale.length; i++) {
        totalPromotion += sale[i].buyCart.amount * sale[i].sale;
      }
    }
    return totalPromotion;
  };
  const SumTotalOther = (card) => {
    let buy = card.filter(ArrayProductBuy);
    let totalOther = 0;
    if (buy.length > 0) {
      for (let i = 0; i < buy.length; i++) {
        totalOther += buy[i].buyCart.amount * buy[i].buy;
      }
    }
    return totalOther;
  };

  const SumTotalShip = (card) => {
    let total = 35000;
    if (card.length > 0) {
      for (let i = 0; i < card.length; i++) {
        total += card[i].buy.amount * card[i].sale;
      }
    }
    return total;
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
            onConfirm={() => handleDelete(reCard, record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" icon={<CloseCircleOutlined />} />
          </Popconfirm>
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
      title: "Amount",
      dataIndex: "buyCart",
      align: "center",
      width: "20%",
      render: (buyCart, record) => (
        <>
          <Text>{buyCart.amount}</Text>
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
  console.log("checkboxOther", checkboxOther);
  console.log("userLogin12321321321", userLogin.firstName);
  return (
    <div>
      <Row>
        <Col span={18} offset={3}>
          <Card style={{ borderRadius: "10px" }} size="small">
            <PageHeader
              className="site-page-header"
              title="Payment"
              ghost={false}
              onBack={() => window.history.back()}
            />
            {userLogin && (
              <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical" // Form chỉnh các lable va input
              >
                <Row gutter={[32, 0]}>
                  {/* Thông tin firstName người mua */}
                  <Col xs={24} sm={24} lg={8} xl={8}>
                    <Form.Item
                      hasFeedback
                      label="First Name"
                      name="firstName"
                      initialValue={userLogin.firstName}
                      rules={[
                        {
                          required: true,
                          message: "Please input your first name!",
                        },
                      ]}
                    >
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} lg={8} xl={8}>
                    <Form.Item
                      hasFeedback
                      label="Last Name"
                      name="lastName"
                      initialValue={userLogin.lastName}
                      rules={[
                        {
                          required: true,
                          message: "Please input your last name!",
                        },
                      ]}
                    >
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} lg={8} xl={8}>
                    <Form.Item
                      label="Phone "
                      name="phone"
                      initialValue={userLogin.phone}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          type: "number",
                          min: 100000000,
                          max: 999999999,
                          message: "Please input your phone 10 number",
                        },
                      ]}
                    >
                      <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} lg={12} xl={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      initialValue={userLogin.email}
                      hasFeedback
                      rules={[
                        { required: true, message: "Please input your Email!" },
                      ]}
                    >
                      <Input type="email" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} lg={12} xl={12}>
                    <Form.Item
                      label="Address"
                      name="address"
                      initialValue={userLogin.address}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please input your address!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} lg={24} xl={24}>
                    <Collapse onChange={callback}>
                      <Panel
                        header={
                          <Form.Item>
                            <Checkbox checked={checkboxOther}>
                              Other recipient information
                            </Checkbox>
                          </Form.Item>
                        }
                        key="1"
                      >
                        <Row gutter={[32, 0]}>
                          <Col xs={24} sm={24} lg={8} xl={8}>
                            <Form.Item
                              hasFeedback
                              label="First Name"
                              name="firstNameOther"
                            >
                              <Input type="text" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} lg={8} xl={8}>
                            <Form.Item
                              hasFeedback
                              label="last Name"
                              name="lastNameOther"
                            >
                              <Input type="text" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} lg={8} xl={8}>
                            <Form.Item
                              label="Phone "
                              name="phoneOther"
                              hasFeedback
                            >
                              <InputNumber style={{ width: "100%" }} />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} lg={12} xl={12}>
                            <Form.Item
                              label="Email"
                              name="emailOther"
                              hasFeedback
                            >
                              <Input type="email" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} lg={12} xl={12}>
                            <Form.Item
                              label="Address"
                              name="addressOther"
                              hasFeedback
                            >
                              <Input type="text" />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Panel>
                    </Collapse>
                  </Col>

                  <Col xs={24} sm={24} lg={24} xl={24}>
                    <Table
                      columns={columns}
                      dataSource={reCard}
                      pagination={false}
                      size="small"
                      rowKey="key"
                    />
                  </Col>
                  <Col xs={24} sm={24} lg={24} xl={24}>
                    <Descriptions
                      bordered
                      column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
                    >
                      <Descriptions.Item label="Provisional">
                        {reCard
                          ? (
                              SumTotalPromotion(reCard) + SumTotalOther(reCard)
                            ).toLocaleString()
                          : ""}{" "}
                        ₫
                      </Descriptions.Item>
                      <Descriptions.Item label="Transport fee">
                        {reCard ? "35,000 ₫" : ""}
                      </Descriptions.Item>
                      <Descriptions.Item label="Total">
                        {/* don't edit */}
                        <span id="paymentSubTotal" style={{ display: "none" }}>
                          {reCard
                            ? 35000 +
                              SumTotalPromotion(reCard) +
                              SumTotalOther(reCard)
                            : ""}
                        </span>
                        <span>
                          {reCard
                            ? (
                                35000 +
                                SumTotalPromotion(reCard) +
                                SumTotalOther(reCard)
                              ).toLocaleString()
                            : ""}
                        </span>{" "}
                        ₫{/* don't edit */}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    lg={16}
                    xl={16}
                    style={{ marginTop: "25px" }}
                  >
                    <Col xs={24} sm={24} lg={24} xl={24}>
                      <Form.Item name="note" label="Note">
                        <Input.TextArea type="text" />
                      </Form.Item>
                    </Col>
                  </Col>
                  <Col xs={24} sm={24} lg={8} xl={8}>
                    <Form.Item
                      name="typePayment"
                      initialValue="momo"
                      rules={[
                        {
                          required: true,
                          message: "Please check your payment!!!",
                        },
                      ]}
                    >
                      <Radio.Group options={checkBoxPayment} />
                    </Form.Item>
                    <Form.Item shouldUpdate={true}>
                      <Button
                        type="primary"
                        danger
                        disabled={reCard.length > 0 ? false : true}
                        htmlType="submit"
                        style={{ width: "100%", height: "50px" }}
                      >
                        PAYMENT
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default HomePaymentCart;
