import { Layout } from "antd";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { routerHome } from "../../../routers";
import CptFooter from "../admin/Footer";
import HeaderHome from "./Header";
import "./home.css";
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
      <HeaderHome />
      <Content
        className="site-layout"
        // style={{ padding: "0 50px", marginTop: 64 }}
      >
        <div
          className="site-layout-background"
          // style={{ padding: 24, minHeight: 380 }}
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
    </Router>
  );
}

export default Home;
