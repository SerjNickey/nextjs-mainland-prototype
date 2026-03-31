import styled from "styled-components";
import checkboxOn from "../../assets/images/PasswordInput/checkbox_on.webp";

interface IStyledCheckbox {
  isError?: boolean;
}

interface ICheckboxLabel {
  isError?: boolean;
}

export const CheckboxContainer = styled.div`
  width: auto;
  height: auto;
`;

export const CheckboxLabel = styled.label<ICheckboxLabel>`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: ${({ isError }) => (isError ? "#d70022" : "#ffffff")};
  transition: color 0.2s ease;

  span {
    user-select: none;
  }
`;

export const StyledCheckbox = styled.input<IStyledCheckbox>`
  width: 20px;
  height: 20px;
  border: 1px solid ${({ isError }) => (isError ? "#d70022" : "#5b5b5b")};
  border-radius: 4px;
  background: rgba(24, 24, 24, 1);
  cursor: pointer;
  appearance: none;
  position: relative;
  transition: all 0.2s ease;

  &:checked {
    background: url(${checkboxOn.src});
    background-size: contain;
    background-repeat: no-repeat;
    border-color: transparent;
  }

  &:checked::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
  }

  &:hover {
    border-color: ${({ isError }) => (isError ? "#d70022" : "#ffffff")};
  }

  &:focus {
    outline: none;
    border-color: ${({ isError }) => (isError ? "#d70022" : "#ffffff")};
  }
`;

export const StyledError = styled.p`
  font-size: 12px;
  color: #d70022;
  margin-top: 4px;
  font-family: "Montserrat";
  font-weight: 400;
`;
