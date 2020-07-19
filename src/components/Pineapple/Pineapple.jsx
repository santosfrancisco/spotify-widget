import React from "react";
import styled from "styled-components";

const Pineapple = styled(({ className, type, ...props }) => {
  return <img className={className} src={`/${type}.svg`} {...props} />;
})`
  margin: 24px;
`;

Pineapple.displayName = "Pineapple";

export default React.memo(Pineapple);
