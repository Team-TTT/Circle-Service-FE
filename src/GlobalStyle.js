import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
  }

  #root {
    width: 100%;
    height: 100%;
  }

  #iframe-circle {
    position: fixed;
    bottom: 25px;
    left: 25px;
    width: 370px;
    height: 250px;
    min-height: 520px;
    max-height: 680px;
    margin: 15px;
    border: none;
    border-radius: 30px;
    box-shadow: 0px 12px 60px 5px rgba(0, 0, 0, 0.5);
    font-size: 16px;
    overflow: hidden;
  }
`;

export default GlobalStyle;
