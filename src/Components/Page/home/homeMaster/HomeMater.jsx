import React, { useEffect, useState } from "react";
import { Card, Carousel, Col, Row } from "antd";
import HomeBannerBottom from "./component/HomeBannerBottom";
import HomeBannerRight from "./component/HomeBannerRight";
import HomeCarousel from "./component/HomeCarousel";
import HomeSlideProduct from "./component/HomeSlideProduct";
import "./homeMaster.css";
import firebase from "../../../../utils/firebase";
import { motion } from "framer-motion";
import { pageTransitionY } from "../../../../data/transition";

function HomeMater(props) {
  const [dataFireBase, setDataFireBase] = useState([]);
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
          buy,
          status,
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
  // start lấy dữ liệu product new
  const ArrayProductNew = (value) => {
    if (value.option === "New" && value.status === "Show") {
      return value;
    }
  };
  const ArrayProductPromotion = (value) => {
    if (value.option === "Promotion" && value.status === "Show") {
      return value;
    }
  };
  let dataProductNew = dataFireBase.filter(ArrayProductNew);
  let dataProductPromotion = dataFireBase.filter(ArrayProductPromotion);
  // End lấy dữ liệu product new0
  return (
    <motion.div
      initial="out"
      exit="out"
      animate="in"
      variants={pageTransitionY}
    >
      <Card style={{ borderRadius: "10px" }} size="small">
        <Row gutter={[32, 0]}>
          <Col xs={24} md={24} lg={16} xl={16}>
            <HomeCarousel />
          </Col>
          <Col xs={24} md={24} lg={8} xl={8}>
            <HomeBannerRight />
          </Col>
        </Row>
        <HomeBannerBottom />
        <HomeSlideProduct
          dataProductNew={dataProductNew}
          dataProductPromotion={dataProductPromotion}
        />
      </Card>
    </motion.div>
  );
}

export default HomeMater;
