import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Layout, Menu, Breadcrumb } from "antd";
import CptFooter from "../admin/Footer";
import IconLogo from "../../../Assets/images/Logo.png";
import { ContainerOutlined, MenuOutlined } from "@ant-design/icons";
import HeaderHome from "./Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { routerHome } from "../../../routers";

const { Header, Content } = Layout;
Home.propTypes = {};

function Home(props) {
  /// Router trang
  const showContent = (routerHome) => {
    let result = null;
    if (routerHome.length > 0) {
      result = routerHome.map((route, index) => {
        return (
          <Route key={index} exact={route.exact} path={route.path}>
            {route.main}
          </Route>
        );
      });
    }
    return result;
  };

  return (
    <Router>
      <Layout>
        <HeaderHome />
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380 }}
          >
            <Switch>{showContent(routerHome)}</Switch>
          </div>
        </Content>
        <CptFooter />
      </Layout>
    </Router>
  );
}

export default Home;
