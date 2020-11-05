import React from "react";
import PropTypes from "prop-types";
import CptStatisticCard from "./compoment/CptStatisticCard";
import CptStatisticCharts from "./compoment/CptStatisticCharts";
import { Card, Row } from "antd";

AdminStatistic.propTypes = {};

function AdminStatistic(props) {
  return (
    <>
      <Card style={{ borderRadius: "10px" }} size="small">
        <Row>
          <CptStatisticCard />
        </Row>
        <Row>
          <CptStatisticCharts />
        </Row>
      </Card>
    </>
  );
}

export default AdminStatistic;
