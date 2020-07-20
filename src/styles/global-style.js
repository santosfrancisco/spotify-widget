import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
* {
  box-sizing: border-box;
}
  body {
    font-family: 'Montserrat', sans-serif;
  }
  a {
    margin: 0 6px;
    text-decoration: none;
    font-weight: bold;
    color: #000;
    &:hover {
      color: #2b2b;
    }
  }
`;
