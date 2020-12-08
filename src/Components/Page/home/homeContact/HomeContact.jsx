import React, { Component } from "react";
import { motion } from "framer-motion";
import { pageTransitionY } from "../../../../data/transition";
class HomeContact extends Component {
  render() {
    return (
      <motion.div
        initial="out"
        exit="out"
        animate="in"
        variants={pageTransitionY}
      >
        <h1 className="header_title">Home contact</h1>
      </motion.div>
    );
  }
}

export default HomeContact;
