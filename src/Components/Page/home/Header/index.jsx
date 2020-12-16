import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Layout, Menu, Breadcrumb, Button, Badge, Dropdown } from "antd";
import HomeCart from "./component/HomeCart";
import Avatar from "antd/lib/avatar/avatar";
import {
  CodeFilled,
  ContactsFilled,
  HomeFilled,
  ShoppingCartOutlined,
  SkinFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "../Login";
import firebase from "../../../../utils/firebase";
import { logoutUser } from "../../../../Actions";
import { Spin } from "antd";
import "./header.css";
import { PATH } from "../../../../constant/pathContants";

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
        number += reCard[i].buyCart.amount;
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
  console.log("userLogin12 :>> ", userLogin);
  const toPageAdmin = () => {
    if (userLogin) {
      if (userLogin.position === "admin") {
        return (window.location.href = PATH.ADMIN);
      } else if (userLogin.position === "employee") {
        return (window.location.href = PATH.ADMIN_EMPLOYEE);
      } else {
        return (window.location.href = PATH.USER);
      }
    }
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

  return (
    <>
      <div className="header-bot">
        <div className="container">
          <div className="col-md-3 header-left">
            <h1>
              <Link to="/">
                <img src="images/logo3.jpg" />
              </Link>
            </h1>
          </div>
          <div className="col-md-6 header-middle">
            <form>
              <div className="search">
                <input
                  type="search"
                  value="Search"
                  onfocus="this.value = '';"
                  onblur="if (this.value == '') {this.value = 'Search';}"
                  required=""
                />
              </div>
              <div className="section_room">
                <select
                  id="country"
                  onchange="change_country(this.value)"
                  className="frm-field required"
                >
                  <option value="null">All categories</option>
                  <option value="null">Electronics</option>
                  <option value="AX">kids Wear</option>
                  <option value="AX">Men's Wear</option>
                  <option value="AX">Women's Wear</option>
                  <option value="AX">Watches</option>
                </select>
              </div>
              <div className="sear-sub">
                <input type="submit" value=" " />
              </div>
              <div className="clearfix"></div>
            </form>
          </div>
          <div className="col-md-3 header-right footer-bottom">
            <ul>
              <li className="header_login-margin">
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
                    <a class="use1"></a>
                  </NavLink>
                )}
              </li>
              <li>
                <a className="fb" href="#"></a>
              </li>
              <li>
                <a className="twi" href="#"></a>
              </li>
              <li>
                <a className="insta" href="#"></a>
              </li>
              <li>
                <a className="you" href="#"></a>
              </li>
            </ul>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
      <div className="ban-top">
        <div className="container">
          <div className="top_nav_left">
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button
                    type="button"
                    className="navbar-toggle collapsed"
                    data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>
                <div
                  className="collapse navbar-collapse menu--shylock"
                  id="bs-example-navbar-collapse-1"
                >
                  <ul className="nav navbar-nav menu__list">
                    <li className="active menu__item ">
                      {/* menu__item--current */}
                      <Link className="menu__link" to="/">
                        Home
                        {/* <span className="sr-only">(current)</span> */}
                      </Link>
                    </li>
                    <li className=" menu__item">
                      <Link className="menu__link" to="/product">
                        Product
                      </Link>
                    </li>
                    <li className=" menu__item">
                      <Link className="menu__link" to="/introduce">
                        Introduce
                      </Link>
                    </li>
                    <li className=" menu__item">
                      <Link className="menu__link" to="/contact">
                        contact
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <div className="top_nav_right">
            <div className="cart box_1">
              <Link to="/viewCart">
                <h3>
                  <div className="total">
                    <Badge count={onNumber(reCard)}>
                      <Avatar
                        style={{ backgroundColor: "black" }}
                        shape="square"
                        icon={<ShoppingCartOutlined />}
                      />
                    </Badge>
                    <span className="totalCard__show">
                      {(
                        SumTotalPromotion(reCard) + SumTotalOther(reCard)
                      ).toLocaleString()}{" "}
                      ₫
                    </span>
                  </div>
                </h3>
              </Link>
              {/* <p>
                <a href="javascript:;" className="simpleCart_empty">
                  Empty Cart
                </a>
              </p> */}
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    </>
    // <Header
    //   style={{ position: "fixed", zIndex: 999, width: "100%" }}
    //   collapsible
    // >
    //   <div className="header-logo"></div>
    //   <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
    //     <Menu.Item icon={<HomeFilled />} key="1">
    //       <Link to="/">Home</Link>
    //     </Menu.Item>
    //     <Menu.Item icon={<SkinFilled />} key="2">
    //       <Link to="/product">Product</Link>
    //     </Menu.Item>
    //     <Menu.Item icon={<CodeFilled />} key="3">
    //       <Link to="/introduce">Introduce</Link>
    //     </Menu.Item>
    //     <Menu.Item icon={<ContactsFilled />} key="4">
    //       <Link to="/contact">Contact</Link>
    //     </Menu.Item>
    //     <div style={{ float: "right" }}>
    //       {data && Object.keys(data).length > 0 ? (
    //         <Dropdown overlay={menu} placement="bottomLeft">
    //           <Avatar
    //             src={userLogin.photoURL}
    //             size="large"
    //             icon={<UserOutlined />}
    //           />
    //         </Dropdown>
    //       ) : (
    //         <NavLink to="/login">
    //           <Avatar
    //             style={{ background: "#1890FF" }}
    //             size="large"
    //             icon={<UserOutlined />}
    //           />
    //         </NavLink>
    //       )}
    //     </div>
    //     <div style={{ float: "right", marginRight: "20px" }}>
    //       <NavLink to="/viewCart">
    //         <Badge count={onNumber(reCard)}>
    //           <Avatar
    //             style={{ background: "#1890FF" }}
    //             shape="square"
    //             icon={<ShoppingCartOutlined />}
    //           />
    //         </Badge>
    //       </NavLink>
    //     </div>
    //   </Menu>
    // </Header>
  );
}
export default HeaderHome;
