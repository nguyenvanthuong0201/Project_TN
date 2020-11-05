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
moment.locale("en");

const { Option } = Select;

const { Header } = Layout;

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank">Nguyễn Văn Thương</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank">Giỏ hàng</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank">Logout</a>
    </Menu.Item>
  </Menu>
);

function CptHeader(props) {
  const { collapsed, onCollapse } = props;
  const HandleClickCollapsed = () => {
    onCollapse(!collapsed);
  };

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
            <Avatar size="large" icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </div>
    </Header>
  );
}

export default CptHeader;
