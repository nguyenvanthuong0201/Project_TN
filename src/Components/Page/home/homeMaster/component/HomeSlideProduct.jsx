import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import "@splidejs/splide/dist/css/themes/splide-sea-green.min.css";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import { List } from "antd";
import React, { useState } from "react";
import InformationModal from "./InformationModal";

function HomeSlideProduct(props) {
  let { dataProductNew, dataProductPromotion } = props;
  const [openModal, setOpenModal] = useState(false);
  const [dataView, setDataView] = useState({});

  const information = (data) => {
    setOpenModal(true);
    setDataView(data);
  };
  const handleOk = () => {
    setOpenModal(true);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };
  return (
    <div className="new_arrivals">
      <InformationModal
        openModal={openModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
        dataView={dataView}
      />
      <h3>
        <span>new </span>arrivals
      </h3>
      <hr className="master_hr" />
      <div className="product-easy">
        <div className="container">
          <div className="sap_tabs">
            <div
              id="horizontalTab"
              style={{ display: "block", width: "100%", margin: "0px" }}
            >
              <div className="resp-tabs-container">
                <List
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                    xl: 4,
                    xxl: 4,
                  }}
                  pagination={{
                    pageSize: 8,
                    position: "bottom",
                    style: { textAlign: "center" },
                  }}
                  dataSource={dataProductNew}
                  renderItem={(item) => (
                    <List.Item>
                      <div className="product-men">
                        <div className="men-pro-item simpleCart_shelfItem">
                          <div className="men-thumb-item">
                            <img
                              src={item.picture}
                              alt=""
                              className="pro-image-front"
                            />
                            <img
                              src={item.picture}
                              alt=""
                              className="pro-image-back"
                            />
                          </div>
                          <div className="item-info-product ">
                            <h4>
                              <a href="#">{item.title}</a>
                            </h4>
                            <div className="info-product-price">
                              <span className="item_price">
                                {item.buy.toLocaleString()} ₫
                              </span>
                            </div>
                            <a
                              onClick={() => information(item)}
                              className="item_add single-item hvr-outline-out button2"
                            >
                              Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3>
        <span>hot </span>Promotion
      </h3>
      <hr className="master_hr" />
      <div className="product-easy">
        <div className="container">
          <div className="sap_tabs">
            <div
              id="horizontalTab"
              style={{ display: "block", width: "100%", margin: "0px" }}
            >
              <div className="resp-tabs-container">
                <List
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                    xl: 4,
                    xxl: 4,
                  }}
                  pagination={{
                    pageSize: 8,
                    position: "bottom",
                    style: { textAlign: "center" },
                  }}
                  dataSource={dataProductPromotion}
                  renderItem={(item) => (
                    <List.Item>
                      <div className="product-men">
                        <div className="men-pro-item simpleCart_shelfItem">
                          <div className="men-thumb-item">
                            <img
                              src={item.picture}
                              alt=""
                              className="pro-image-front"
                            />
                            <img
                              src={item.picture}
                              alt=""
                              className="pro-image-back"
                            />
                          </div>
                          <div className="item-info-product ">
                            <h4>
                              <a href="#">{item.title}</a>
                            </h4>
                            <div className="info-product-price">
                              <span className="item_price">
                                {item.sale.toLocaleString()} ₫
                              </span>
                              <del>{item.buy.toLocaleString()} ₫</del>
                            </div>
                            <a
                              className="item_add single-item hvr-outline-out button2"
                              onClick={() => information(item)}
                            >
                              Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSlideProduct;
