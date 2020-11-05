import React from "react";
import PropTypes from "prop-types";
import { Column } from "@ant-design/charts";
import { Col } from "antd";
const data = [
  {
    name: "London",
    week: "Jan.",
    c: 18.9,
  },
  {
    name: "London",
    week: "Feb.",
    c: 28.8,
  },
  {
    name: "London",
    week: "Mar.",
    c: 39.3,
  },
  {
    name: "London",
    week: "Apr.",
    c: 81.4,
  },
  {
    name: "London",
    week: "May",
    c: 47,
  },
  {
    name: "London",
    week: "Jun.",
    c: 20.3,
  },
  {
    name: "London",
    week: "Jul.",
    c: 24,
  },
  {
    name: "London",
    week: "Aug.",
    c: 35.6,
  },
  {
    name: "Berlin",
    week: "Jan.",
    c: 12.4,
  },
  {
    name: "Berlin",
    week: "Feb.",
    c: 23.2,
  },
  {
    name: "Berlin",
    week: "Mar.",
    c: 34.5,
  },
  {
    name: "Berlin",
    week: "Apr.",
    c: 99.7,
  },
  {
    name: "Berlin",
    week: "May",
    c: 52.6,
  },
  {
    name: "Berlin",
    week: "Jun.",
    c: 35.5,
  },
  {
    name: "Berlin",
    week: "Jul.",
    c: 37.4,
  },
  {
    name: "Berlin",
    week: "Aug.",
    c: 42.4,
  },
];
const config = {
  data,
  isGroup: true,
  xField: "week",
  yField: "c",
  seriesField: "name",
  color: ["#1ca9e6", "#f88c24"],
  marginRatio: 0,
};
function CptStatisticCharts(props) {
  return (
    <>
      <Col xs={24} md={24} lg={24}>
        <h1>Statistit Charts</h1>
      </Col>
      <Col xs={24} md={24} lg={24} style={{ height: "500px" }}>
        <Column {...config} />;
      </Col>
    </>
  );
}

export default CptStatisticCharts;
