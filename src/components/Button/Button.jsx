import styled from "styled-components";

const Button = styled.button`
  width: 190px;
  height: 40px;
  background-color: #2b2b;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;

Button.displayName = "Button";

export default Button;
