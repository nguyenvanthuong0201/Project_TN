import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Col, Drawer, InputNumber, Row } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Text from "antd/lib/typography/Text";
import { deleteCarts, updateCarts } from "../../../../Actions";
function DrawerCart(props) {
  const { drawer, setDrawer, dataAddOnCart } = props;
  const reCard = useSelector((state) => state.reCard);
  const dispatch = useDispatch();

  const handleOnCloseDrawer = () => {
    setDrawer(false);
  };
  const updateQuantity = (key, amount, e) => {
    console.log("key", key);
    console.log("e", e);

    dispatch(updateCarts(key, e));
  };
  return (
    <Drawer
      width={512}
      title="View Card"
      visible={drawer}
      onClose={handleOnCloseDrawer}
      placement="right"
      maskClosable={true} /// Form nhấn bên ngoài để đóng ngăn
    >
      {reCard.length > 0
        ? reCard[0].key &&
          reCard.map((item, key) => (
            <Row gutter={[32, 0]} key={key} align="middle">
              <Col xs={10} ms={10} lg={10} xl={10}>
                <Text>{item.title}</Text> ||{item.buy.size}
                <img style={{ width: "100%" }} src={item.picture} alt="" />
              </Col>
              <Col xs={10} ms={10} lg={10} xl={10}>
                <InputNumber
                  min={1}
                  value={item.buy.amount}
                  onChange={(e) => updateQuantity(key, item.buy.amount, e)}
                />
              </Col>
              <Col xs={4} ms={4} lg={4} xl={4}>
                <Button
                  type="danger"
                  icon={<DeleteOutlined />}
                  onClick={() => dispatch(deleteCarts(key))}
                />
              </Col>
            </Row>
          ))
        : ""}
    </Drawer>
  );
}

export default DrawerCart;
