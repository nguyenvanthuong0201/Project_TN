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
      <div class="page-head">
        <div class="container">
          <h3>Home</h3>
        </div>
      </div>
    );
  }
}

export default HomeBannerBottom;
