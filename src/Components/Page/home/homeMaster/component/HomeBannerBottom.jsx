import { Col, Row } from "antd";
import React, { Component } from "react";
import BannerBottom1 from "../../../../../Assets/images/banner3.png";
import BannerBottom2 from "../../../../../Assets/images/banner4.png";

class HomeBannerBottom extends Component {
  contentStyle = {
    height: "200px",
    backgroundSize: "cover",
    width: "100%",
  };
  render() {
    return (
      <Row style={{ marginTop: "20px" }}>
        <Col xs={24} md={24} lg={12} xl={12}>
          <img
            src={BannerBottom1}
            style={this.contentStyle}
            alt="pictureBottom 1"
          />
        </Col>
        <Col xs={24} md={24} lg={12} xl={12}>
          <img
            src={BannerBottom2}
            style={this.contentStyle}
            alt="pictureBottom 2"
          />
        </Col>
      </Row>
    );
  }
}

export default HomeBannerBottom;
