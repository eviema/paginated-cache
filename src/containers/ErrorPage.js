import React from "react";
import PropTypes from "prop-types";
import img from "../assets/cloud_off.png";

const style = {
  textAlign: "center",
  height: "100%",
  width: "100%"
};
export default function ErrorPage({ error }) {
  return (
    <div style={style} id="error">
      <img src={img} alt="error" />
      <h1>{error}</h1>
    </div>
  );
}

ErrorPage.propTypes = {
  error: PropTypes.string.isRequired
};
