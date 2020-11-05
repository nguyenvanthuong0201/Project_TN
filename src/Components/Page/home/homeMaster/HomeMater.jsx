import React, { useEffect, useState } from "react";
import { Card, Carousel, Col, Row } from "antd";
import HomeBannerBottom from "./component/HomeBannerBottom";
import HomeBannerRight from "./component/HomeBannerRight";
import HomeCarousel from "./component/HomeCarousel";
import HomeSlideProduct from "./component/HomeSlideProduct";
import "./homeMaster.css";
import firebase from "../../../../utils/firebase";

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
    if (value.option === "New") {
      return value;
    }
  };
  const ArrayProductPromotion = (value) => {
    if (value.option === "Promotion") {
      return value;
    }
  };
  let dataProductNew = dataFireBase.filter(ArrayProductNew);
  let dataProductPromotion = dataFireBase.filter(ArrayProductPromotion);

  // End lấy dữ liệu product new
  return (
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
      {/* Start Slide */}
      <HomeSlideProduct
        dataProductNew={dataProductNew}
        dataProductPromotion={dataProductPromotion}
      />
      {/* End slide */}
    </Card>
  );
}

export default HomeMater;
