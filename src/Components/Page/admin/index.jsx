import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Layout, PageHeader } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import CptSiderbar from "./Sidebar";
import CptHeader from "./Header";
import CptFooter from "./Footer/";
import { routes } from "../../../routers";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

const { Content } = Layout;

PageAdmin.propTypes = {};

function PageAdmin(props) {
  const userLogin = useSelector((state) => state.reLogin);
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  const [collapsed, setCollapsed] = useState(false);

  /// Router trang
  const showContent = (routes) => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route key={index} exact={route.exact} path={route.path}>
            {route.main}
          </Route>
        );
      });
    }
    return result;
  };
  if (Object.keys(userLogin).length > 0) {
    return (
      <Router>
        <Fragment>
          <Layout style={{ minHeight: "100vh" }}>
            {/* Start Siderbar */}
            <CptSiderbar collapsed={collapsed} />
            <Layout className="site-layout">
              <CptHeader collapsed={collapsed} onCollapse={onCollapse} />

              {/* End Header */}

              {/* Start Content */}
              <Content
                className="site-layout-background"
                style={{
                  margin: "24px 16px",
                  padding: 24,
                  minHeight: 280,
                  position: "relative",
                }}
              >
                {/* this is content nè  */}
                <AnimatePresence>
                  <Switch>{showContent(routes)}</Switch>
                </AnimatePresence>
              </Content>
              {/* End Content */}
              {/* Start Footer */}
              <CptFooter />
              {/* End Footer */}
            </Layout>
          </Layout>
        </Fragment>
      </Router>
      // }
    );
  }
}

export default PageAdmin;
