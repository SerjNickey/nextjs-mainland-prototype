import styled from "styled-components";
import { media } from "../../../../styles/breakpoints";

interface IInput {
  $filled?: boolean;
  $verified?: boolean | null;
}

interface IStatusContainer {
  $verifed?: boolean | null;
}

// Обертка для всего компонента
export const VerificationContainer = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  font-family: "Montserrat";
  font-style: normal;
`;

// Контейнер для полей ввода
export const InputsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

// Базовые стили для поля ввода, расширяемые через props
export const Input = styled.input.attrs({ type: "text", maxLength: 1 })<IInput>`
  width: 44px;
  height: 44px;
  text-align: center;
  font-size: 18px;
  border: 2px solid;
  border-radius: 4px;
  transition: border-color 0.3s;
  outline: none;
  background: rgba(24, 24, 24, 1);
  font-weight: 400;
  font-size: 16px;
  color: #fff;

  /* Динамический цвет границы на основе props */
  border-color: ${({ $verified, $filled }) => {
    if ($verified === true) return "rgba(0, 140, 84, 1)"; // Зеленый при успехе
    if ($verified === false) return "rgba(170, 0, 0, 1)"; // Красный при ошибке
    return $filled ? "rgba(132, 133, 138, 1)" : "rgba(64, 65, 71, 1)"; // Синий при вводе, серый по умолчанию
  }};
`;

export const StatusContainer = styled.div<IStatusContainer>`
  margin-top: 4px;
  font-size: 12px;
  color: ${({ $verifed }) =>
    $verifed ? "rgba(0, 140, 84, 1)" : "rgba(170, 0, 0, 1)"};
  text-transform: none;
`;

export const InfoContainer = styled.p`
  max-width: 380px;
  font-size: 14px;
  color: #84858a;
  text-align: center;
  line-height: 17px;
  text-transform: none;

  & span {
    text-decoration: underline;
    font-weight: 600;
    cursor: pointer;
  }

  ${media.max393} {
    font-size: 12px;
  }
  ${media.max353} {
    font-size: 11px;
  }
  ${media.max320} {
    font-size: 10px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;

  ${media.max430} {
    flex-direction: column;
  }
`;
export const ResendButton = styled.button`
  width: 190px;
  height: 44px;
`;
// Кнопка проверки
export const VerifyButton = styled.button`
  width: 190px;
  height: 44px;
  background: rgba(215, 0, 34, 1);
  border-radius: 6px;
  padding: 15px 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat";
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:disabled {
    background-color: rgba(215, 0, 34, 0.6);
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: rgba(215, 0, 34, 0.6);
  }
`;
