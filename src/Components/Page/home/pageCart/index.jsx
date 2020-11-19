import {
  CloseCircleOutlined,
  DeleteFilled,
  DeleteOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Image,
  InputNumber,
  PageHeader,
  Popconfirm,
  Row,
  Table,
} from "antd";
import Column from "antd/lib/table/Column";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteCarts, updateCarts } from "../../../../Actions";
import "./pageCart.css";

function PageCart(props) {
  const reCard = useSelector((state) => state.reCard);
  const dispatch = useDispatch();

  const handleDelete = (card, key) => {
    const index = findProductInCart(card, key);
    dispatch(deleteCarts(index));
  };
  /// tìm vị trí của index
  let findProductInCart = (card, key) => {
    let index = -1;
    if (card.length > 0) {
      for (let i = 0; i < card.length; i++) {
        if (card[i].key === key) {
          index = i;
          break;
        }
      }
    }
    return index;
  };
  var findProductInCartSize = (card, size, key) => {
    var index = -1;
    if (card.length > 0) {
      for (var i = 0; i < card.length; i++) {
        if (card[i].key === key && card[i].buyCart.size === size) {
          index = i;
          break;
        }
      }
    }
    return index;
  };
  // / thêm bớt số lượng prooduct 1 san phẩm
  // const btnMinus = (card, key, value) => {
  //   const index = findProductInCart(card, key);

  //   if (value > 0) {
  //     dispatch(updateCarts(index, value));
  //     console.log("index", index);
  //     console.log("value", value);
  //   } else {
  //     alert("Bạn định hack à ");
  //   }
  // };
  // const btnPlus = (card, key, value) => {
  //   const index = findProductInCart(card, key);
  //   dispatch(updateCarts(index, value));
  // };

  /// tổng tiền của item trong table card
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
  /// tổng số lượng sản phẩm
  const sumAmount = (card) => {
    let number = 0;
    if (card.length > 0) {
      for (let i = 0; i < card.length; i++) {
        number += card[i].buyCart.amount;
      }
    }
    return number;
  };
  const updateQuantity = (card, key, size, e) => {
    console.log("size", size);
    const index = findProductInCartSize(card, size, key);
    dispatch(updateCarts(index, e));
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
      title: "STT",
      dataIndex: "index",
      align: "center",
      width: "5%",
    },
    {
      title: "Picture",
      dataIndex: "picture",
      align: "center",
      width: "15%",
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
      width: "20%",
      render: (buyCart, record) => (
        <>
          <InputNumber
            min={1}
            value={buyCart.amount}
            onChange={(e) =>
              updateQuantity(reCard, record.key, record.buyCart.size, e)
            }
          />
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
    <div>
      <PageHeader
        className="site-page-header"
        ghost={false}
        onBack={() => window.history.back()}
      >
        <h1 className="pageCart_titleHeader">View Cart</h1>
      </PageHeader>
      <Row>
        <Col xs={24} md={24} lg={16} xl={16}>
          <Table
            columns={columns}
            dataSource={reCard}
            pagination={{ pageSize: 10 }}
            size="small"
            rowKey="index"
          />
        </Col>
        <Col xs={24} md={24} lg={8} xl={8}>
          <Card>
            <h3 className="pageCart_title">TOTAL CART</h3>
            <Descriptions
              bordered
              column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
            >
              <Descriptions.Item label="Total Money">
                <h1 style={{ color: "red" }}>
                  {(
                    SumTotalPromotion(reCard) + SumTotalOther(reCard)
                  ).toLocaleString()}{" "}
                  ₫
                </h1>
              </Descriptions.Item>
              <Descriptions.Item label="Amount">
                <h3>{sumAmount(reCard)}</h3>
              </Descriptions.Item>
            </Descriptions>
            <Row gutter={[32, 0]} style={{ marginTop: "20px" }}>
              <Col xs={24} md={24} lg={12} xl={12}>
                <Button
                  className="pageCart_continueBuying"
                  style={{
                    width: "100%",
                    height: "50px",
                  }}
                  type="ghost"
                >
                  <NavLink to="/">CONTINUE BUYING</NavLink>
                </Button>
              </Col>
              <Col xs={24} md={24} lg={12} xl={12}>
                <NavLink to="/paymentCart">
                  <Button
                    style={{ width: "100%", height: "50px" }}
                    type="primary"
                  >
                    CONTINUE PAYMENT
                  </Button>
                </NavLink>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PageCart;
