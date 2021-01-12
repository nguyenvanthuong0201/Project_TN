import { Button, Card, Col, Descriptions, Row, Table } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./ResultPaymentCart.css";

function ResultPaymentCart(props) {
  const data = JSON.parse(localStorage.getItem("PAYMENT"));
  const history = useHistory();
  const [url, setUrl] = useState("");
  let location = useLocation();
  const urlResult = location.search;
  const viTri = urlResult.indexOf("message=");
  const URL_RESULT = urlResult.substr(viTri, 11);
  useEffect(() => {
    if (URL_RESULT === "message=Err" || URL_RESULT === "message=Ord") {
      setUrl("Order failed");
    } else {
      setUrl("Order success");
    }
  }, []);
  const showProduct = (cart) => {
    let result = null;
    if (cart.length > 0) {
      result = cart.map((item, index) => {
        return (
          <p key={index}>
            {item.title} x {item.buyCart.amount}
          </p>
        );
      });
    }
    return result;
  };
  const showAmount = (cart) => {
    let number = 0;
    if (cart.length > 0) {
      for (let i = 0; i < cart.length; i++) {
        number += cart[i].buyCart.amount;
      }
    }
    return number;
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
  const goHome = () => {
    history.replace("/");
  };
  return (
    <div>
      <Row>
        <Col span={18} offset={3}>
          <Card style={{ borderRadius: "10px" }} size="small">
            <h1
              className={
                url === "Order failed"
                  ? "result_notification--false"
                  : "result_notification"
              }
            >
              {url} !{" "}
              <span className="result_notification--span">
                (The manager will contact you)
              </span>
            </h1>
            <Row>
              <Col xs={24} md={24} lg={12} xl={12}>
                <Descriptions
                  title="Information customer"
                  bordered
                  column={{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
                >
                  <Descriptions.Item label="First Name">
                    {data.firstName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Last Name">
                    {data.lastName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone" span={2}>
                    {data.phone}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email" span={2}>
                    {data.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Address" span={2}>
                    {data.address}
                  </Descriptions.Item>
                </Descriptions>
                {data.checkboxOther === true ? (
                  <Descriptions
                    title="Other recipient information"
                    bordered
                    column={{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
                  >
                    <Descriptions.Item label="First Name">
                      {data.firstNameOther}
                    </Descriptions.Item>
                    <Descriptions.Item label="Last Name">
                      {data.lastNameOther}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone" span={2}>
                      {data.phoneOther}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email" span={2}>
                      {data.emailOther}
                    </Descriptions.Item>
                    <Descriptions.Item label="Address" span={2}>
                      {data.addressOther}
                    </Descriptions.Item>
                  </Descriptions>
                ) : (
                  ""
                )}
              </Col>
              <Col xs={24} md={24} lg={12} xl={12}>
                <Descriptions
                  title="Payment cart"
                  bordered
                  column={{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
                >
                  <Descriptions.Item label="Product " span={2}>
                    {showProduct(data.payment)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Amount" span={2}>
                    {showAmount(data.payment)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Total" span={2}>
                    <h1 style={{ color: "red" }}>
                      {(
                        35000 +
                        SumTotalPromotion(data.payment) +
                        SumTotalOther(data.payment)
                      ).toLocaleString()}{" "}
                      ₫
                    </h1>
                  </Descriptions.Item>
                </Descriptions>
                <Button
                  type="primary"
                  style={{ width: "100%", marginTop: "20px" }}
                  onClick={goHome}
                >
                  Buy more products
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ResultPaymentCart;
