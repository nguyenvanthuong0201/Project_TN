import { List, Card, Tag } from "antd";
import React, { useEffect, useState } from "react";
import firebase from "../../../../utils/firebase";
import { motion } from "framer-motion";
import { pageTransitionY } from "../../../../data/transition";
import InformationModal from "../homeMaster/component/InformationModal";

function HomeProduct(props) {
  const [dataFireBase, setDataFireBase] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [dataView, setDataView] = useState({});

  const handleClickGetAll = () => {
    let tutorialsRef = firebase.firestore().collection("/product");
    tutorialsRef.onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        const {
          title,
          type,
          size,
          sale,
          cost,
          buy,
          status,
          amount,
          option,
          picture,
          createDate,
        } = doc.data();
        data.push({
          key: doc.id,
          title,
          type,
          size,
          status,
          buy,
          cost,
          amount,
          picture,
          option,
          sale,
          createDate,
        });
      });
      setDataFireBase(data);
    });
  };
  useEffect(() => {
    handleClickGetAll();
  }, []);

  const ArrayProduct = (value) => {
    if (value.status === "Show") {
      return value;
    }
  };
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

  let dataProduct = dataFireBase.filter(ArrayProduct);
  return (
    <motion.div
      initial="out"
      exit="out"
      animate="in"
      variants={pageTransitionY}
    >
      <InformationModal
        openModal={openModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
        dataView={dataView}
      />
      <div class="men-wear">
        <div class="container">
          <div class="col-md-12 products-right">
            <h5>Product Compare(0)</h5>
            <div class="sort-grid">
              <div class="sorting">
                <h6>Sort By</h6>
                <select
                  id="country1"
                  onchange="change_country(this.value)"
                  class="frm-field required sect"
                >
                  <option value="null">Default</option>
                  <option value="null">Name(A - Z)</option>
                  <option value="null">Name(Z - A)</option>
                  <option value="null">Price(High - Low)</option>
                  <option value="null">Price(Low - High)</option>
                  <option value="null">Model(A - Z)</option>
                  <option value="null">Model(Z - A)</option>
                </select>
                <div class="clearfix"></div>
              </div>
              <div class="sorting">
                <h6>Showing</h6>
                <select
                  id="country2"
                  onchange="change_country(this.value)"
                  class="frm-field required sect"
                >
                  <option value="null">7</option>
                  <option value="null">14</option>
                  <option value="null">28</option>
                  <option value="null">35</option>
                </select>
                <div class="clearfix"></div>
              </div>
              <div class="clearfix"></div>
            </div>
            <div class="men-wear-top">
              <div class="clearfix"></div>
            </div>
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
                      pageSize: 16,
                      position: "bottom",
                      style: { textAlign: "center" },
                    }}
                    dataSource={dataProduct}
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
                              <Tag
                                color={
                                  (item.option === "Promotion" && "red") ||
                                  (item.option === "New" && "blue")
                                }
                              >
                                {item.option === "Other" ? "" : item.option}
                              </Tag>
                              <div className="info-product-price">
                                {item.sale === 0 ? (
                                  <span className="item_price">
                                    {item.buy.toLocaleString()} ₫
                                  </span>
                                ) : (
                                  <>
                                    <span className="item_price">
                                      {item.sale.toLocaleString()} ₫
                                    </span>
                                    <del>{item.buy.toLocaleString()} ₫</del>
                                  </>
                                )}
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
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default HomeProduct;
