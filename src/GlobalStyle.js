import { createGlobalStyle } from "styled-components";
import theme from "./config/constants/theme";

const GlobalStyle = createGlobalStyle`
  * *::before, *::after {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
  }

  #core-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 25px;
    left: 15px;
    width: 60px;
    height: 60px;
    border: 3px solid black;
    border-radius: 40%;
    background-color: ${theme.skyBlue};
    cursor: pointer;
  }

  .material-symbols-outlined {
    display: flex;
    justify-content: center;
    font-size: 45px;
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
    border-radius: 30px;
  }

  #root {
    width: 100%;
    height: 100%;
    border-radius: 30px;
    padding: 10px;
    background-color: ${theme.skyBlue};

  }

  .circle-service {
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
