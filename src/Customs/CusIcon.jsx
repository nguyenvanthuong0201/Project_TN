import React from "react";
import iconLogo from "../Assets/images/Logo.png";
import "./CusIcon.css";

function CusIcon(props) {
  return (
    <div className="CusIcon">
      <img src={iconLogo} alt="icon logo nè" />
    </div>
  );
}

export default CusIcon;
