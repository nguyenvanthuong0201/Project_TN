import { Col, Row } from "antd";
import React, { Component } from "react";
import Banner1 from "../../../../../Assets/images/banner1.png";
import Banner2 from "../../../../../Assets/images/banner2.png";

class HomeBannerRight extends Component {
  contentStyle = {
    height: "145px",
    width: "100%",
    backgroundColor: "cover",
    marginBottom: "10px",
  };
  contentStyleNoMargin = {
    height: "140px",
    width: "100%",
    backgroundColor: "cover",
  };

  render() {
    return (
      <>
        <Row gutter={[32, 0]}>
          <Col xs={24} md={24} lg={24} xl={24}>
            <img src={Banner1} alt="Banner1" style={this.contentStyle} />
          </Col>
        </Row>
        <Row gutter={[32, 0]}>
          <Col xs={24} md={24} lg={24} xl={24}>
            <img
              src={Banner2}
              alt="Banner2"
              style={this.contentStyleNoMargin}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default HomeBannerRight;
