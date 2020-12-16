import { Layout } from "antd";
import React from "react";
import { Link } from "react-router-dom";
const { Footer } = Layout;

function CptFooter() {
  return (
    <div className="footer">
      <div className="container">
        <div className="col-md-3 footer-left">
          <h2>
            <a href="index.html">
              <img src="images/logo3.jpg" alt=" " />
            </a>
          </h2>
          <p>
            I’m selfish, impatient and a little insecure. I make mistakes, I am
            out of control and at times hard to handle. But if you can’t handle
            me at my worst, then you sure as hell don’t deserve me at my best. ―
            Marilyn Monroe.
          </p>
        </div>
        <div className="col-md-9 footer-right">
          {/* <div className="col-sm-6 newsleft">
            <h3>SIGN UP FOR NEWSLETTER !</h3>
          </div>
          <div className="col-sm-6 newsright">
            <form>
              <input type="text" value="Email" required="" />
              <input type="submit" value="Submit" />
            </form>
          </div> */}
          <div className="clearfix"></div>
          <div className="sign-grds">
            <div className="col-md-4 sign-gd">
              <h4>Information</h4>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/product">Product</Link>
                </li>
                <li>
                  <Link to="/introduce">Introduce</Link>
                </li>
                <li>
                  <Link to="/contact">contact</Link>
                </li>
              </ul>
            </div>

            <div className="col-md-4 sign-gd-two">
              <h4>Store Information</h4>
              <ul>
                <li>
                  <i
                    className="glyphicon glyphicon-map-marker"
                    aria-hidden="true"
                  ></i>
                  Address : 157-159 Hoang Van Thu,{" "}
                  <span>Ho Chi Minh City.</span>
                </li>
                <li>
                  <i
                    className="glyphicon glyphicon-envelope"
                    aria-hidden="true"
                  ></i>
                  Email :{" "}
                  <a href="mailto:info@example.com">
                    nguyenvanthuong0201@gmail.com
                  </a>
                </li>
                <li>
                  <i
                    className="glyphicon glyphicon-earphone"
                    aria-hidden="true"
                  ></i>
                  Phone : +1234 567 567
                </li>
              </ul>
            </div>

            <div className="clearfix"></div>
          </div>
        </div>
        <div className="clearfix"></div>
        {/* <p class="copy-right">
          &copy 2016 Smart Shop. All rights reserved | Design by{" "}
          <a href="http://w3layouts.com/">W3layouts</a>
        </p> */}
      </div>
    </div>
  );
}

export default CptFooter;
