import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Layout, Menu, Breadcrumb } from "antd";
import CptFooter from "../admin/Footer";
import IconLogo from "../../../Assets/images/Logo.png";
import { ContainerOutlined, MenuOutlined } from "@ant-design/icons";
import HeaderHome from "./Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { routerHome } from "../../../routers";
import "./home.css";
import HomeMater from "./homeMaster/HomeMater";
import HomeProduct from "./homeProduct/HomeProduct";
import HomeIntroduce from "./homeIntroduce/HomeIntroduce";
// import moduleName from 'framer-motion'

const { Header, Content } = Layout;

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
            <Switch
              atEnter={{ opacity: 0, y: "-100%" }}
              atLeave={{ opacity: 0, y: "-100%" }}
              atActive={{ opacity: 1, y: 0 }}
            >
              {showContent(routerHome)}
            </Switch>
          </div>
        </Content>
        <CptFooter />
      </Layout>
    </Router>
  );
}

export default Home;
