import styled from "styled-components";

interface IStyledButtonProps {
  disabled?: boolean;
}

export const StyledButton = styled.button<IStyledButtonProps>`
  width: 190px;
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  // padding: 15px 20px;
  gap: 8px;
  font-family: "Montserrat";
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;

  background-color: ${(props) =>
    props.disabled ? "rgba(91, 91, 91, 0.6)" : "rgba(91, 91, 91, 1)"};
  color: white;

  border: none;
  border-radius: 6px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${(props) =>
      props.disabled ? "rgba(91, 91, 91, 0.6)" : "rgba(91, 91, 91, 1)"};
  }
`;
