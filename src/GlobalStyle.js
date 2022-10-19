import { createGlobalStyle } from "styled-components";
import theme from "./config/constants/theme";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
  }

  #root {
    width: 100%;
    height: 100%;
    border-radius: 30px;
    padding: 15px;
    background-color: ${theme.skyBlue};
  }
`;

export default GlobalStyle;
