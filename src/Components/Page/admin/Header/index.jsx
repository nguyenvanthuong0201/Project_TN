import React, { useState } from "react";
import { ConfigProvider, DatePicker, Dropdown, Radio, Switch } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./Header.css";
import { Menu } from "antd";
import { Layout } from "antd";
import { Select } from "antd";
import enUS from "antd/es/locale/en_US";
import viVN from "antd/es/locale/vi_VN";
import moment from "moment";
import "moment/locale/zh-cn";
import Avatar from "antd/lib/avatar/avatar";
import firebase from "../../../../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../../Actions";
import { Redirect } from "react-router-dom";
import { PATH } from "../../../../constant/pathContants";
moment.locale("en");

const { Option } = Select;

const { Header } = Layout;

function CptHeader(props) {
  const dispatch = useDispatch();
  const { collapsed, onCollapse } = props;
  const userLogin = useSelector((state) => state.reLogin);

  const HandleClickCollapsed = () => {
    onCollapse(!collapsed);
  };
  const firebaseLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        dispatch(logoutUser());
        dispatch({ type: "CLOSE_SPIN" });
        localStorage.removeItem("LOGIN");
        window.location.href = PATH.MASTER;
      })
      .catch(function (error) {});
  };
  const logout = () => {
    dispatch({ type: "OPEN_SPIN" });
    firebaseLogout();
    console.log("loggg");
  };
  const ToCart = () => {
    window.location.href = PATH.MASTER;
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank">{userLogin.displayName}</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={ToCart}>HOME</a>
      </Menu.Item>
      <Menu.Item>
        <div onClick={logout}>LOGOUT</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="site-layout-background Header">
      <div>
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: HandleClickCollapsed,
          }
        )}
      </div>
      <div className="Header_controller">
        <div className="Header__account">
          <Dropdown overlay={menu} placement="bottomLeft">
            <Avatar
              src={userLogin.photoURL}
              size="large"
              icon={<UserOutlined />}
            />
          </Dropdown>
        </div>
      </div>
    </Header>
  );
}

export default CptHeader;
