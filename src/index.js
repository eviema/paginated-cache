import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";
import App from "./containers/App";

import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.common["apiToken"] = process.env.REACT_APP_API_TOKEN;

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.getElementById("root")
);
