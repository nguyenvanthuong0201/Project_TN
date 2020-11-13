import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import "@splidejs/splide/dist/css/themes/splide-sea-green.min.css";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import Logo from "../../../../../Assets/images/Logo.png";
import ao1 from "../../../../../Assets/images/ao1-1.png";
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
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
  console.log("dataProductNew :>> ", dataProductNew);
  return (
    <>
      {/* Open Modal */}
      <InformationModal
        openModal={openModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
        dataView={dataView}
      />
      <h1 style={{ textAlign: "center" }}>New Arrivals</h1>
      <hr style={{ width: "600px", margin: "auto" }} />
      <Splide
        options={{
          rewind: true,
          perPage: 4,
          perMove: 1,
          gap: "1rem",
        }}
        id="splide2"
      >
        {dataProductNew.map((data, index) => {
          return (
            <SplideSlide key={index}>
              <Card
                onClick={() => information(data)}
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={data.picture} />}
              >
                <h3 style={{ textAlign: "center", color: "red" }}>
                  {data.sale.toLocaleString()} ₫
                </h3>
              </Card>
            </SplideSlide>
          );
        })}
      </Splide>
      <h1 style={{ textAlign: "center" }}>Promotion</h1>
      <hr style={{ width: "600px", margin: "auto" }} />
      <Splide
        options={{
          rewind: true,
          perPage: 4,
          perMove: 1,
          gap: "1rem",
        }}
        id="splide2"
      >
        {dataProductPromotion.map((data, index) => {
          return (
            <SplideSlide key={index + 99}>
              <Card
                onClick={() => information(data)}
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={data.picture} />}
              >
                <h3 style={{ textAlign: "center", color: "red" }}>
                  {data.sale.toLocaleString()} ₫
                </h3>
              </Card>
            </SplideSlide>
          );
        })}
      </Splide>
    </>
  );
}

export default HomeSlideProduct;
