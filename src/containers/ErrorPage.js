import React from "react";
import PropTypes from "prop-types";
import img from "../assets/cloud_off.png";

export default function ErrorPage({ error }) {
  return (
    <div
      style={{ textAlign: "center", height: "100%", width: "100%" }}
      id="error"
    >
      <img src={img} alt="error" />
      <h1>{error}</h1>
    </div>
  );
}

ErrorPage.propTypes = {
  error: PropTypes.string.isRequired
};
