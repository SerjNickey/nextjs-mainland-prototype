import styled from "styled-components";
import { media } from "../../styles/breakpoints";
import arrowGrey from "../../assets/images/PasswordInput/arrow_grey.webp";
import arrowWhite from "../../assets/images/PasswordInput/arrow_white.webp";

interface IStyledInput {
  isError?: boolean;
  hasValue?: boolean;
  isValid?: boolean;
}

interface IToggleButton {
  isOpened: boolean;
  hasValue: string;
}

export const CountryInputSelectContainer = styled.div`
  width: auto;
  height: auto;
  position: relative;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  /* Плейсхолдер над полем (как у SimpleInput): ширина по размеру текста, padding чтобы фон был виден */
  &::before {
    width: max-content;
    min-height: 12px;
    padding: 0 4px;
    box-sizing: content-box;
    display: none;
    content: attr(data-placeholder);
    font-weight: 300;
    font-size: 10px;
    line-height: 12px;
    color: #84858a;
    text-align: left;
    white-space: nowrap;

    position: absolute;
    top: -5px;
    left: 10px;
    z-index: 1;
    background: rgba(24, 24, 24, 1);
  }

  /* Показываем плейсхолдер над полем, когда пользователь что-то ввёл */
  &[data-has-value="true"]::before {
    display: block;
  }

  /* При ошибке — красный цвет текста псевдоэлемента (плейсхолдера над полем) */
  &[data-error="true"]::before {
    color: #d70022;
  }

  /* Успешная валидация: зелёный цвет лейбла (как в SimpleInput) */
  &[data-valid="true"]:not([data-error="true"])::before {
    color: rgb(0, 140, 84);
  }
`;

export const StyledInput = styled.input<IStyledInput>`
  width: 390px;
  height: 44px;
  background: rgba(24, 24, 24, 1);
  border: 1px solid
    ${({ isError, isValid }) =>
      isError ? "#d70022" : isValid ? "rgb(0, 140, 84)" : "#5b5b5b"};
  outline: none;
  padding: 0 40px 0 10px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: ${({ isError, hasValue }) =>
    isError ? "#d70022" : hasValue ? "#ffffff" : "#84858a"};
  border-radius: 6px;

  ${media.max430} {
    width: 344px;
  }
  ${media.max414} {
    width: 328px;
  }
  ${media.max412} {
    width: 326px;
  }
  ${media.max411} {
    width: 325px;
  }
  ${media.max407} {
    width: 321px;
  }
  ${media.max393} {
    width: 307px;
  }
  ${media.max390} {
    width: 304px;
  }
  ${media.max384} {
    width: 298px;
  }
  ${media.max375} {
    width: 289px;
  }
  ${media.max360} {
    width: 274px;
  }
  ${media.max353} {
    width: 267px;
  }
  ${media.max344} {
    width: 258px;
  }
  ${media.max320} {
    width: 234px;
  }

  &::placeholder {
    color: ${({ isError }) => (isError ? "#d70022" : "#84858a")};
  }
`;

export const ToggleButton = styled.button<IToggleButton>`
  width: 44px;
  height: 44px;
  position: absolute;
  right: 0px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  color: #84858a;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: 12px 5px;
  background-image: url(${({ hasValue }) =>
    hasValue ? arrowWhite : arrowGrey});
  background-position: center;
  background-repeat: no-repeat;
  transform: rotate(${({ isOpened }) => (isOpened ? "180deg" : "0deg")});

  &:hover {
    color: #ffffff;
  }

  &:focus {
    outline: none;
    color: #ffffff;
  }
`;

export const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(24, 24, 24, 1);
  border: 1px solid #5b5b5b;
  border-top: none;
  border-radius: 0 0 6px 6px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;

  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.35) transparent;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.35);
    border-radius: 2px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

/** Вариант для Portal: position fixed, координаты через props. Рендерится в document.body — не обрезается модалкой. */
export const DropdownListPortal = styled.div<{
  $top: number;
  $left: number;
  $width: number;
}>`
  position: fixed;
  top: ${({ $top }) => $top}px;
  left: ${({ $left }) => $left}px;
  width: ${({ $width }) => $width}px;
  background: rgba(24, 24, 24, 1);
  border: 1px solid #5b5b5b;
  border-top: none;
  border-radius: 0 0 6px 6px;
  max-height: 200px;
  overflow-y: auto;
  /* Выше QRFModal Overlay (1300), иначе список рисуется под затемнением */
  z-index: 1420;

  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.35) transparent;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.35);
    border-radius: 2px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

export const DropdownItem = styled.div`
  padding: 12px 10px;
  font-family: "Montserrat";
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-transform: none;
  text-align: left;
  border-left: 2px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-left: 2px solid red;
    border-radius: 4px;
  }

  &:last-child {
    border-radius: 0 0 6px 6px;
  }
`;

export const StyledError = styled.p`
  font-size: 12px;
  color: #d70022;
  margin-top: 4px;
  font-family: "Montserrat";
  font-weight: 400;
`;
