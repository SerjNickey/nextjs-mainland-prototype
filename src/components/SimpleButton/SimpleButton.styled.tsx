import styled from "styled-components";

export const ButtonWrapper = styled.button`
  max-width: 387px;
  width: 100%;
  height: 44px;
  background: rgba(215, 0, 34, 1);
  border-radius: 6px;
  border: none;
  outline: none;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px 20px;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  color: #ffffff;

  &:disabled {
    color: rgba(189, 189, 189, 1);
    background-color: rgba(215, 0, 34, 0.6);
    cursor: not-allowed;
  }

  // &:hover:not(:disabled) {
  //   background-color: rgba(215, 0, 34, 0.6);
  // }
`;
