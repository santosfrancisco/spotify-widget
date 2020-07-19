import React from "react";
import styled from "styled-components";

const Footer = ({ className }) => {
  return (
    <footer className={className}>
      Icons made by{" "}
      <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
        Freepik
      </a>{" "}
      from{" "}
      <a href="https://www.flaticon.com/" title="Flaticon">
        {" "}
        www.flaticon.com
      </a>
    </footer>
  );
};

Footer.displayName = "Footer";

export default styled(Footer)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100%;
  margin-top: 48px;
`;
