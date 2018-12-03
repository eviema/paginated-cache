import React from "react";
import img from "../assets/loading_spinner.gif";

const style = {
  textAlign: "center",
  height: "100%",
  width: "100%"
};
export default () => {
  return (
    <div style={style} id="loading">
      <img src={img} alt="loading" />
      <h1>LOADING</h1>
    </div>
  );
};
