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
        <h1 className="header_title">Home introduce</h1>
      </motion.div>
    );
  }
}

export default HomeIntroduce;
