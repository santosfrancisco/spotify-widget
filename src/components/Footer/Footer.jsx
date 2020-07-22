import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import Pineapple from "../Pineapple";

const Footer = ({ className }) => (
  <footer className={className}>
    <div className="with-love">
      <FormattedMessage id="built_with" />
      <Pineapple className="pineapple-icon" type="pineapple" width={32} />
      <FormattedMessage
        id="by_francisco"
        values={{
          github: (
            <a href="https://github.com/santosfrancisco/" title="Github">
              Francisco
            </a>
          ),
        }}
      />
    </div>
    <div className="freepik-credits">
      <FormattedMessage
        id="icons_credits"
        values={{
          freepik: (
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>
          ),
          flaticon: (
            <a href="https://www.flaticon.com/" title="Flaticon">
              flaticon
            </a>
          ),
        }}
      />
    </div>
  </footer>
);

Footer.displayName = "Footer";

export default styled(Footer)`
  margin-top: 48px;
  .with-love {
    display: flex;
    justify-content: center;
    align-items: center;
    .pineapple-icon {
      margin: 0 6px;
    }
  }
  .freepik-credits {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 100%;
    font-size: 12px;
  }
`;
