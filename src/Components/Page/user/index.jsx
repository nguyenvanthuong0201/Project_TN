import {
  Button,
  Card,
  Col,
  Descriptions,
  Image,
  InputNumber,
  notification,
  Popconfirm,
  Row,
  Steps,
  Table,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import firebase from "../../../utils/firebase";
import { Tabs } from "antd";
import { format } from "../../../data/dataAdminProduct";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import notCart from "../../../Assets/images/DontCart.png";
import "./user.css";
const { TabPane } = Tabs;
const { Step } = Steps;
const moment = require("moment");

function AdminUser(props) {
  const [dataFireBase, setDataFireBase] = useState([]);
  const reLogin = useSelector((state) => state.reLogin);

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
      width: "5%",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Picture",
      dataIndex: "picture",
      align: "center",
      width: "10%",
      render: (picture) => (
        <>
          <Image style={{ cursor: "pointer" }} src={picture} />
        </>
      ),
    },
    {
      title: "Sale",
      dataIndex: "sale",
      align: "center",
      width: "20%",
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
      width: "15%",

      render: (buyCart) => (
        <>
          <InputNumber value={buyCart.amount} />
        </>
      ),
    },
    {
      title: "Size",
      dataIndex: "buyCart",
      align: "center",
      width: "20%",

      render: (buyCart) => <>{buyCart.size}</>,
    },
    {
      title: "Total",
      dataIndex: "sale",
      align: "center",
      width: "30%",
      render: (sale, record) => (
        <>
          <b style={{ color: "red" }}>
            {SumItem(record.buyCart.amount, record)} ₫
          </b>
        </>
      ),
    },
  ];
  const ArrayDataFirebase = (value) => {
    if (value.email === reLogin.email) {
      return value;
    }
  };
  const ArrayOrders = (value) => {
    if (value.status === "Orders") {
      return value;
    }
  };
  const ArrayConfirmed = (value) => {
    if (value.status === "Confirmed") {
      return value;
    }
  };
  const ArrayShipping = (value) => {
    if (value.status === "Shipping") {
      return value;
    }
  };
  const ArraySuccess = (value) => {
    if (value.status === "Success") {
      return value;
    }
  };
  const ArrayCancel = (value) => {
    if (value.status === "Cancel") {
      return value;
    }
  };
  const onCancelOrder = (key) => {
    const updateRef = firebase.firestore().collection("payment").doc(key);
    updateRef
      .update({
        status: "Cancel",
      })
      .then((docRef) => {
        notification.success({
          message: "Cancel order success !!!!!",
          placement: "bottomLeft",
          style: { backgroundColor: "greenyellow" },
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
  const onOrderAgain = (key) => {
    const updateRef = firebase.firestore().collection("payment").doc(key);
    updateRef
      .update({ status: "Orders" })
      .then((docRef) => {
        notification.success({
          message: "Order success !!!!!",
          placement: "bottomLeft",
          style: { backgroundColor: "greenyellow" },
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
  let dataPaymentUser = dataFireBase.filter(ArrayDataFirebase);
  let dataPaymentOrders = dataPaymentUser.filter(ArrayOrders);
  let dataPaymentConfirmed = dataPaymentUser.filter(ArrayConfirmed);
  let dataPaymentShipping = dataPaymentUser.filter(ArrayShipping);
  let dataPaymentSuccess = dataPaymentUser.filter(ArraySuccess);
  let dataPaymentCancel = dataPaymentUser.filter(ArrayCancel);

  const showNumberCart = (data) => {
    let number = 0;
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        number += 1;
      }
    }
    return number;
  };
  const showAllPayment = (dataPaymentUser) => {
    let result = null;
    if (dataPaymentUser.length > 0) {
      result = dataPaymentUser.map((pay, index) => {
        return (
          <Card>
            {/* <p> */}
            <p>
              <span>{moment(pay.createDate).format(format.dateTime)}</span>
              <span style={{ marginLeft: "20px" }}>
                Status :{" "}
                <Tag
                  color={
                    (pay.status === "Orders" && "red") ||
                    (pay.status === "Confirmed" && "yellow") ||
                    (pay.status === "Shipping" && "blue") ||
                    (pay.status === "Success" && "green")
                  }
                >
                  {pay.status}
                </Tag>
              </span>
            </p>
            <Row key={index}>
              <Col xs={24} md={24} lg={16} xl={16}>
                <Table
                  columns={columns}
                  dataSource={pay.payment}
                  size="small"
                  rowKey="createDate"
                  pagination={{ pageSize: 3 }}
                />
              </Col>
              <Col xs={24} md={24} lg={8} xl={8}>
                <Descriptions
                  bordered
                  column={{ xxl: 4, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                >
                  <Descriptions.Item label="Ship money">
                    <b style={{ color: "red" }}>35,000 ₫</b>
                  </Descriptions.Item>
                  <Descriptions.Item label="Total money">
                    <b style={{ color: "red" }}>
                      {parseInt(pay.paymentSubTotal).toLocaleString()}₫
                    </b>
                  </Descriptions.Item>
                </Descriptions>
                {pay.status === "Orders" ? (
                  <Popconfirm
                    placement="bottom"
                    title="Are you sure cancel this order?"
                    onConfirm={() => onCancelOrder(pay.key)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      type="danger"
                      style={{ width: "100%" }}
                      icon={<DeleteOutlined />}
                    >
                      Cancel order
                    </Button>
                  </Popconfirm>
                ) : (
                  ""
                )}
              </Col>
            </Row>
          </Card>
        );
      });
    }
    return result;
  };
  const showPaymentOrders = (dataPaymentUser) => {
    let result = null;
    if (dataPaymentUser.length > 0) {
      result = dataPaymentUser.map((pay, index) => {
        return (
          <Card>
            {/* <p> */}
            <p>
              <span>{moment(pay.createDate).format(format.dateTime)}</span>
            </p>
            <Row key={index}>
              <Col xs={24} md={24} lg={16} xl={16}>
                <Table
                  columns={columns}
                  dataSource={pay.payment}
                  size="small"
                  rowKey="createDate"
                  pagination={{ pageSize: 3 }}
                />
              </Col>
              <Col xs={24} md={24} lg={8} xl={8}>
                <Descriptions
                  bordered
                  column={{ xxl: 4, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                >
                  <Descriptions.Item label="Ship money">
                    <b style={{ color: "red" }}>35,000 ₫</b>
                  </Descriptions.Item>
                  <Descriptions.Item label="Total money">
                    <b style={{ color: "red" }}>
                      {parseInt(pay.paymentSubTotal).toLocaleString()}₫
                    </b>
                  </Descriptions.Item>
                </Descriptions>
                <Button
                  type="primary"
                  danger
                  style={{ width: "100%" }}
                  icon={<DeleteOutlined />}
                >
                  Cancel order
                </Button>
              </Col>
            </Row>
          </Card>
        );
      });
    } else {
      return (
        <div className="img_not">
          <img className="img_notProduct" src={notCart} alt="" />
        </div>
      );
    }
    return result;
  };
  const showPaymentConfirmed = (dataPaymentUser) => {
    let result = null;
    if (dataPaymentUser.length > 0) {
      result = dataPaymentUser.map((pay, index) => {
        return (
          <Card>
            {/* <p> */}
            <p>
              <span>{moment(pay.createDate).format(format.dateTime)}</span>
            </p>
            <Row key={index}>
              <Col xs={24} md={24} lg={16} xl={16}>
                <Table
                  columns={columns}
                  dataSource={pay.payment}
                  size="small"
                  rowKey="createDate"
                  pagination={{ pageSize: 3 }}
                />
              </Col>
              <Col xs={24} md={24} lg={8} xl={8}>
                <Descriptions
                  bordered
                  column={{ xxl: 4, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                >
                  <Descriptions.Item label="Ship money">
                    <b style={{ color: "red" }}>35,000 ₫</b>
                  </Descriptions.Item>
                  <Descriptions.Item label="Total money">
                    <b style={{ color: "red" }}>
                      {parseInt(pay.paymentSubTotal).toLocaleString()}₫
                    </b>
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </Card>
        );
      });
    } else {
      return (
        <div className="img_not">
          <img className="img_notProduct" src={notCart} alt="" />
        </div>
      );
    }
    return result;
  };
  const showPaymentShipping = (dataPaymentUser) => {
    let result = null;
    if (dataPaymentUser.length > 0) {
      result = dataPaymentUser.map((pay, index) => {
        return (
          <Card>
            {/* <p> */}
            <p>
              <span>{moment(pay.createDate).format(format.dateTime)}</span>
            </p>
            <Row key={index}>
              <Col xs={24} md={24} lg={16} xl={16}>
                <Table
                  columns={columns}
                  dataSource={pay.payment}
                  size="small"
                  rowKey="createDate"
                  pagination={{ pageSize: 3 }}
                />
              </Col>
              <Col xs={24} md={24} lg={8} xl={8}>
                <Descriptions
                  bordered
                  column={{ xxl: 4, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                >
                  <Descriptions.Item label="Ship money">
                    <b style={{ color: "red" }}>35,000 ₫</b>
                  </Descriptions.Item>
                  <Descriptions.Item label="Total money">
                    <b style={{ color: "red" }}>
                      {parseInt(pay.paymentSubTotal).toLocaleString()}₫
                    </b>
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </Card>
        );
      });
    } else {
      return (
        <div className="img_not">
          <img className="img_notProduct" src={notCart} alt="" />
        </div>
      );
    }
    return result;
  };
  const showPaymentSuccess = (dataPaymentUser) => {
    let result = null;
    if (dataPaymentUser.length > 0) {
      result = dataPaymentUser.map((pay, index) => {
        return (
          <Card>
            {/* <p> */}
            <p>
              <span>{moment(pay.createDate).format(format.dateTime)}</span>
            </p>
            <Row key={index}>
              <Col xs={24} md={24} lg={16} xl={16}>
                <Table
                  columns={columns}
                  dataSource={pay.payment}
                  size="small"
                  rowKey="createDate"
                  pagination={{ pageSize: 3 }}
                />
              </Col>
              <Col xs={24} md={24} lg={8} xl={8}>
                <Descriptions
                  bordered
                  column={{ xxl: 4, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                >
                  <Descriptions.Item label="Ship money">
                    <b style={{ color: "red" }}>35,000 ₫</b>
                  </Descriptions.Item>
                  <Descriptions.Item label="Total money">
                    <b style={{ color: "red" }}>
                      {parseInt(pay.paymentSubTotal).toLocaleString()}₫
                    </b>
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </Card>
        );
      });
    } else {
      return (
        <div className="img_not">
          <img className="img_notProduct" src={notCart} alt="" />
        </div>
      );
    }
    return result;
  };
  const showPaymentCancel = (dataPaymentUser) => {
    let result = null;
    if (dataPaymentUser.length > 0) {
      result = dataPaymentUser.map((pay, index) => {
        return (
          <Card key={index}>
            {/* <p> */}
            <p>
              <span>{moment(pay.createDate).format(format.dateTime)}</span>
            </p>
            <Row>
              <Col xs={24} md={24} lg={16} xl={16}>
                <Table
                  columns={columns}
                  dataSource={pay.payment}
                  size="small"
                  rowKey="createDate"
                  pagination={{ pageSize: 3 }}
                />
              </Col>
              <Col xs={24} md={24} lg={8} xl={8}>
                <Descriptions
                  bordered
                  column={{ xxl: 4, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                >
                  <Descriptions.Item label="Ship money">
                    <b style={{ color: "red" }}>35,000 ₫</b>
                  </Descriptions.Item>
                  <Descriptions.Item label="Total money">
                    <b style={{ color: "red" }}>
                      {parseInt(pay.paymentSubTotal).toLocaleString()}₫
                    </b>
                  </Descriptions.Item>
                </Descriptions>
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  icon={<PlusOutlined />}
                  onClick={() => {
                    onOrderAgain(pay.key);
                  }}
                >
                  Order Again
                </Button>
              </Col>
            </Row>
          </Card>
        );
      });
    } else {
      return (
        <div className="img_not">
          <img className="img_notProduct" src={notCart} alt="" />
        </div>
      );
    }
    return result;
  };
  return (
    <div>
      <Row>
        <Col xs={24} md={24} lg={24} xl={24}>
          <Card style={{ borderRadius: "10px" }} size="small">
            <Row>
              <Col xs={24} md={24} lg={24} xl={24}>
                <Tabs type="card" className="widthSize">
                  <TabPane
                    tab={
                      "All" + "-" + "(" + showNumberCart(dataPaymentUser) + ")"
                    }
                    key="1"
                  >
                    {showAllPayment(dataPaymentUser)}
                  </TabPane>
                  <TabPane
                    tab={
                      "Orders" +
                      "-" +
                      "(" +
                      showNumberCart(dataPaymentOrders) +
                      ")"
                    }
                    key="2"
                  >
                    {showPaymentOrders(dataPaymentOrders)}
                  </TabPane>
                  <TabPane
                    tab={
                      "Confirmed" +
                      "-" +
                      "(" +
                      showNumberCart(dataPaymentConfirmed) +
                      ")"
                    }
                    key="3"
                  >
                    {showPaymentConfirmed(dataPaymentConfirmed)}
                  </TabPane>
                  <TabPane
                    tab={
                      "Shipping" +
                      "-" +
                      "(" +
                      showNumberCart(dataPaymentShipping) +
                      ")"
                    }
                    key="4"
                  >
                    {showPaymentShipping(dataPaymentShipping)}
                  </TabPane>
                  <TabPane
                    tab={
                      "Success" +
                      "-" +
                      "(" +
                      showNumberCart(dataPaymentSuccess) +
                      ")"
                    }
                    key="5"
                  >
                    {showPaymentSuccess(dataPaymentSuccess)}
                  </TabPane>
                  <TabPane
                    tab={
                      "Cancel" +
                      "-" +
                      "(" +
                      showNumberCart(dataPaymentCancel) +
                      ")"
                    }
                    key="6"
                  >
                    {showPaymentCancel(dataPaymentCancel)}
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AdminUser;
