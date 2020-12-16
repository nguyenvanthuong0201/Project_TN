import React, { Component } from "react";
import "./Homeintroduce.css";
import { motion } from "framer-motion";
import { pageTransitionY } from "../../../../data/transition";
class HomeIntroduce extends Component {
  render() {
    return (
      <motion.div
        initial="out"
        exit="out"
        animate="in"
        variants={pageTransitionY}
      >
        <div class="coupons">
          <div class="container">
            <div class="coupons-grids text-center">
              <div class="col-md-3 coupons-gd">
                <h3>Buy your product in a simple way</h3>
              </div>
              <div class="col-md-3 coupons-gd">
                <span
                  class="glyphicon glyphicon-user"
                  aria-hidden="true"
                ></span>
                <h4>LOGIN TO YOUR ACCOUNT</h4>
                <p>
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                  amet, consectetur.
                </p>
              </div>
              <div class="col-md-3 coupons-gd">
                <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                <h4>SELECT YOUR ITEM</h4>
                <p>
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                  amet, consectetur.
                </p>
              </div>
              <div class="col-md-3 coupons-gd">
                <span
                  class="glyphicon glyphicon-credit-card"
                  aria-hidden="true"
                ></span>
                <h4>MAKE PAYMENT</h4>
                <p>
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                  amet, consectetur.
                </p>
              </div>
              <div class="clearfix"> </div>
            </div>
          </div>
        </div>
        <div class="content-bottom">
          <div class="col-md-7 content-lgrid">
            <div class="col-sm-6 content-img-left text-center">
              <div class="content-grid-effect slow-zoom vertical">
                <div class="img-box">
                  <img
                    src="images/p1.jpg"
                    alt="image"
                    class="img-responsive zoom-img"
                  />
                </div>
                <div class="info-box">
                  <div class="info-content simpleCart_shelfItem">
                    <h4>Mobiles</h4>
                    <span class="separator"></span>
                    {/* <p>
                      <span class="item_price">$500</span>
                    </p>
                    <span class="separator"></span> */}
                    {/* <a class="item_add hvr-outline-out button2" href="#">
                      add to cart{" "}
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 content-img-right">
              <h3>
                Special Offers and 50%<span>Discount On</span> Mobiles
              </h3>
            </div>

            <div class="col-sm-6 content-img-right">
              <h3>
                Buy 1 get 1 free on <span> Branded</span> Watches
              </h3>
            </div>
            <div class="col-sm-6 content-img-left text-center">
              <div class="content-grid-effect slow-zoom vertical">
                <div class="img-box">
                  <img
                    src="images/p2.jpg"
                    alt="image"
                    class="img-responsive zoom-img"
                  />
                </div>
                <div class="info-box">
                  <div class="info-content simpleCart_shelfItem">
                    <h4>Watches</h4>
                    <span class="separator"></span>
                    {/* <p>
                      <span class="item_price">$250</span>
                    </p>
                    <span class="separator"></span> */}
                    {/* <a class="item_add hvr-outline-out button2" href="#">
                      add to cart{" "}
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
            <div class="clearfix"></div>
          </div>
          <div class="col-md-5 content-rgrid text-center">
            <div class="content-grid-effect slow-zoom vertical">
              <div class="img-box">
                <img
                  src="images/p4.jpg"
                  alt="image"
                  class="img-responsive zoom-img"
                />
              </div>
              <div class="info-box">
                <div class="info-content simpleCart_shelfItem">
                  <h4>Shoes</h4>
                  <span class="separator"></span>
                  {/* <p>
                    <span class="item_price">$150</span>
                  </p>
                  <span class="separator"></span> */}
                  {/* <a class="item_add hvr-outline-out button2" href="#">
                    add to cart{" "}
                  </a> */}
                </div>
              </div>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
      </motion.div>
    );
  }
}

export default HomeIntroduce;
