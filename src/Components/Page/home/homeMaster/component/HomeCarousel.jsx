import React, { Component } from "react";
import { Carousel } from "antd";
import Carousel1 from "../../../../../Assets/images/carousel1.png";
import Carousel2 from "../../../../../Assets/images/carousel2.png";
import Carousel3 from "../../../../../Assets/images/carousel3.png";
import Carousel4 from "../../../../../Assets/images/carousel4.png";

export default class HomeCarousel extends Component {
  contentStyle = {
    height: "300px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    backgroundColor: "cover",
    width: "100%",
  };
  render() {
    return (
      <Carousel autoplay dotPosition="bottom">
        <div>
          <img
            style={this.contentStyle}
            key={2}
            src={Carousel1}
            alt="carousel_2"
          />
        </div>
        <div>
          <img
            style={this.contentStyle}
            key={2}
            src={Carousel2}
            alt="carousel_2"
          />
        </div>
        <div>
          <img
            style={this.contentStyle}
            key={3}
            src={Carousel3}
            alt="carousel_3"
          />
        </div>
        <div>
          <img
            style={this.contentStyle}
            key={4}
            src={Carousel4}
            alt="carousel_4"
          />
        </div>
      </Carousel>
    );
  }
}
