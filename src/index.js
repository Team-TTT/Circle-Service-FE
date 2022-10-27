import * as process from "process";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import GlobalStyle from "./GlobalStyle";
import App from "./app/App";

if (process.env.REACT_APP_NODE_ENV === "development") {
  window.global = window;
  window.process = process;
  window.Buffer = [];
}

const rootDiv = document.querySelector("#root");
const root = ReactDOM.createRoot(rootDiv);

root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <GlobalStyle />
    <App />
  </BrowserRouter>
);
