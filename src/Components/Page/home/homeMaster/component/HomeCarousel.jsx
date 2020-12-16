import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default class HomeCarousel extends Component {
  render() {
    return (
      <Carousel autoPlay>
        <div>
          <img alt="" src="images/banner1.png" />
        </div>
        <div>
          <img alt="" src="images/banner2.png" />
        </div>
        <div>
          <img alt="" src="images/banner3.png" />
        </div>
        <div>
          <img alt="" src="images/banner4.png" />
        </div>
        <div>
          <img alt="" src="images/banner5.png" />
        </div>
      </Carousel>
    );
  }
}
