import styled from "styled-components";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface StyledInputProps {
  isError?: boolean;
}

interface WrapperProps {
  $optionalLabel?: string;
  $isEn?: boolean;
}

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const INPUT_BG = "rgba(24, 24, 24, 1)";
const BORDER_ERROR = "#d70022";
const BORDER_DEFAULT = "#5b5b5b";
const PLACEHOLDER_TRANSITION =
  "top 0.25s ease, transform 0.25s ease, font-size 0.25s ease, line-height 0.25s ease, color 0.25s ease";

// -----------------------------------------------------------------------------
// Wrapper & field
// -----------------------------------------------------------------------------

/** Обёртка поля. ::before — подпись «* Необязательно»; скрывается при фокусе или data-filled. */
export const InvitationCodeInputWrapper = styled.div<WrapperProps>`
  width: 100%;
  min-width: 0;
  position: relative;

  &::before {
    content: "${({ $optionalLabel }) => $optionalLabel ?? "* Необязательно"}";
    position: absolute;
    top: -5px;
    left: 10px;
    z-index: 2;
    width: max-content;
    min-height: 12px;
    padding: 0 4px;
    box-sizing: content-box;
    font-weight: 300;
    font-size: 10px;
    line-height: 12px;
    color: #84858a;
    text-align: left;
    background: ${INPUT_BG};
  }

  &:focus-within::before,
  &[data-filled="true"]::before {
    display: none;
  }
`;

/** Обёртка инпута с плавающим плейсхолдером (data-placeholder, data-filled, data-error). */
export const BonusCodeFieldWrap = styled.div`
  position: relative;
  width: 100%;
  min-width: 0;

  &::before {
    content: attr(data-placeholder);
    position: absolute;
    left: 10px;
    z-index: 1;
    width: max-content;
    padding: 0 4px;
    box-sizing: content-box;
    text-align: left;
    white-space: nowrap;
    background: ${INPUT_BG};
    color: #84858a;
    font-weight: 300;
    pointer-events: none;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    transition: ${PLACEHOLDER_TRANSITION};
  }

  &:focus-within::before,
  &[data-filled="true"]::before {
    top: -5px;
    transform: translateY(0);
    font-size: 10px;
    line-height: 12px;
  }

  &[data-error="true"]::before {
    color: ${BORDER_ERROR};
  }
`;

// -----------------------------------------------------------------------------
// Input & error
// -----------------------------------------------------------------------------

export const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  height: 44px;
  box-sizing: border-box;
  background: ${INPUT_BG};
  border: 1px solid
    ${({ isError }) => (isError ? BORDER_ERROR : BORDER_DEFAULT)};
  outline: none;
  padding: 0 10px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: ${({ isError }) => (isError ? BORDER_ERROR : "#ffffff")};
  border-radius: 6px;

  &::placeholder,
  &::-webkit-input-placeholder,
  &::-moz-placeholder,
  &:-ms-input-placeholder {
    color: transparent;
  }
`;

export const StyledError = styled.p`
  font-size: 11px;
  color: ${BORDER_ERROR};
  margin-top: 4px;
  text-transform: none;
`;
