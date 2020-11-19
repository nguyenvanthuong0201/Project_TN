import React from "react";
import PropTypes from "prop-types";
import CptStatisticCard from "./compoment/CptStatisticCard";
import CptStatisticCharts from "./compoment/CptStatisticCharts";
import { Card, Row } from "antd";
import { pageAnimate, pageTransitionX } from "../../../../data/transition";
import { motion } from "framer-motion";
AdminStatistic.propTypes = {};

function AdminStatistic(props) {
  return (
    <motion.div
      initial="initial"
      exit="out"
      animate="in"
      variants={pageTransitionX}
      transition={pageAnimate}
    >
      <Card style={{ borderRadius: "10px" }} size="small">
        <Row>
          <CptStatisticCard />
        </Row>
        <Row>
          <CptStatisticCharts />
        </Row>
      </Card>
    </motion.div>
  );
}

export default AdminStatistic;
