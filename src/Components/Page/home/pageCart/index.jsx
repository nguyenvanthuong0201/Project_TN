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

function PageCart(props) {
  const reCard = useSelector((state) => state.reCard);
  const dispatch = useDispatch();

  const handleDelete = (card, key) => {
    const index = findProductInCart(card, key);
    dispatch(deleteCarts(index));
  };
  /// tìm vị trí của index
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
  // / thêm bớt số lượng prooduct
  const btnMinus = (card, key, value) => {
    const index = findProductInCart(card, key);

    if (value > 0) {
      dispatch(updateCarts(index, value));
      console.log("index", index);
      console.log("value", value);
    } else {
      alert("Bạn định hack à ");
    }
  };
  const btnPlus = (card, key, value) => {
    const index = findProductInCart(card, key);
    dispatch(updateCarts(index, value));
  };
  /// tổng tiền của item trong table card
  const SumItem = (amount, sale) => {
    return (amount * sale).toLocaleString();
  };
  /// tổng tiền cả giỏ hàng
  const SumTotal = (card) => {
    let total = 0;
    if (card.length > 0) {
      for (let i = 0; i < card.length; i++) {
        total += card[i].buy.amount * card[i].sale;
      }
    }
    return total.toLocaleString();
  };
  /// tổng số lượng sản phẩm
  const sumAmount = (card) => {
    let number = 0;
    if (card.length > 0) {
      for (let i = 0; i < card.length; i++) {
        number += card[i].buy.amount;
      }
    }
    return number;
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
      render: (sale) => <b style={{ color: "red" }}>{sale.toLocaleString()}</b>,
    },
    {
      title: "Amount",
      dataIndex: "buy",
      align: "center",
      width: "20%",
      render: (buy, record) => (
        <>
          <Button
            style={{ float: "left" }}
            shape="round"
            type="primary"
            icon={<MinusCircleOutlined />}
            onClick={() => btnMinus(reCard, record.key, buy.amount - 1)}
          />
          <span>{buy.amount}</span>
          <Button
            style={{ float: "right" }}
            shape="round"
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => btnPlus(reCard, record.key, buy.amount + 1)}
          />
        </>
      ),
    },
    {
      title: "Size",
      dataIndex: "buy",
      align: "center",
      width: "10%",
      render: (buy) => <>{buy.size}</>,
    },
    {
      title: "Total",
      dataIndex: "sale",
      align: "center",
      width: "20%",

      render: (sale, record) => (
        <>
          <b style={{ color: "red" }}>
            {SumItem(record.buy.amount, record.sale)} ₫
          </b>
        </>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="View Cart"
        ghost={false}
        onBack={() => window.history.back()}
      />
      <Row>
        <Col xs={24} md={24} lg={16} xl={16}>
          <Table
            columns={columns}
            dataSource={reCard}
            pagination={{ pageSize: 10 }}
            size="small"
            rowKey="key"
          />
        </Col>
        <Col xs={24} md={24} lg={8} xl={8}>
          <Card title="Total Card">
            <Descriptions
              bordered
              column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
            >
              <Descriptions.Item label="Total Money">
                <h1 style={{ color: "red" }}>{SumTotal(reCard)} ₫</h1>
              </Descriptions.Item>
              <Descriptions.Item label="Amount">
                <h3>{sumAmount(reCard)}</h3>
              </Descriptions.Item>
            </Descriptions>
            <Row gutter={[32, 0]} style={{ marginTop: "20px" }}>
              <Col xs={24} md={24} lg={12} xl={12}>
                <Button
                  style={{
                    width: "100%",
                    height: "50px",
                    backgroundColor: "greenyellow",
                  }}
                  type="dashed"
                >
                  <NavLink to="/">CONTINUE BUYING</NavLink>
                </Button>
              </Col>
              <Col xs={24} md={24} lg={12} xl={12}>
                <Button
                  style={{ width: "100%", height: "50px" }}
                  type="primary"
                >
                  CONTINUE PAYMENT
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default PageCart;
