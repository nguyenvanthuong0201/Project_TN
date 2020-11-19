import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Layout, Menu, Breadcrumb, Button, Badge, Dropdown } from "antd";
import HomeCart from "./component/HomeCart";
import Avatar from "antd/lib/avatar/avatar";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "../Login";
import firebase from "../../../../utils/firebase";
import { logoutUser } from "../../../../Actions";
import { Spin } from "antd";

const { Header, Content } = Layout;

HeaderHome.propTypes = {};

function HeaderHome(props) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.reLogin);
  const reCard = useSelector((state) => state.reCard);
  const data = JSON.parse(localStorage.getItem("LOGIN"));
  // / thêm số lượng cho icon cart

  const onNumber = (reCard) => {
    let number = 0;
    if (reCard.length > 0) {
      for (let i = 0; i < reCard.length; i++) {
        number += reCard[i].buy.amount;
      }
    }
    return number;
  };

  const firebaseLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        dispatch(logoutUser());
        dispatch({ type: "CLOSE_SPIN" });
        localStorage.removeItem("LOGIN");
      })
      .catch(function (error) {});
  };
  const logout = () => {
    dispatch({ type: "OPEN_SPIN" });
    firebaseLogout();
    console.log("loggg");
  };
  const toPageAdmin = () => {
    window.location.href = "http://localhost:3000/admin";
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank">{userLogin.displayName}</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={toPageAdmin}>Page Manage</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={logout}>Logout</a>
      </Menu.Item>
    </Menu>
  );

  console.log("đât", userLogin);
  return (
    <Header
      style={{ position: "fixed", zIndex: 999, width: "100%" }}
      collapsible={true}
    >
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/product">Product</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/introduce">Introduce</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/contact">Contact</Link>
        </Menu.Item>
        {/* Button đăng nhập  */}

        <div style={{ float: "right" }}>
          {data && Object.keys(data).length > 0 ? (
            <Dropdown overlay={menu} placement="bottomLeft">
              <Avatar
                src={userLogin.photoURL}
                size="large"
                icon={<UserOutlined />}
              />
            </Dropdown>
          ) : (
            <NavLink to="/login">
              <Button>Sign in</Button>
            </NavLink>
          )}
        </div>
        <div style={{ float: "right", marginRight: "20px" }}>
          <NavLink to="/viewCart">
            <Badge count={onNumber(reCard)}>
              <Avatar shape="square" icon={<ShoppingCartOutlined />} />
            </Badge>
          </NavLink>
        </div>
      </Menu>
    </Header>
  );
}
export default HeaderHome;
