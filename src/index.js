import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import GlobalStyle from "./GlobalStyle";
import App from "./app/App";

const rootDiv = document.querySelector("#root");
const root = ReactDOM.createRoot(rootDiv);

root.render(
  <BrowserRouter>
    <GlobalStyle />
    <App />
  </BrowserRouter>
);
