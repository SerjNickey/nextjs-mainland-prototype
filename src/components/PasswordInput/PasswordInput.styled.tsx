import styled, { css, keyframes } from "styled-components";
import { media } from "../../styles/breakpoints";
import checkboxOff from "../../assets/images/PasswordInput/checkbox_off.webp";
import checkboxOn from "../../assets/images/PasswordInput/checkbox_on.webp";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface StyledInputProps {
  isError?: boolean;
  isCapsLockOn?: boolean;
  showPassword?: boolean;
  isValid?: boolean;
}

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const INPUT_BG = "rgba(24, 24, 24, 1)";
const BORDER = {
  default: "#5b5b5b",
  error: "#d70022",
  caps: "#ffa500",
  valid: "rgba(0, 140, 84, 1)",
};
const FLOAT_PLACEHOLDER_TRANSITION =
  "top 0.25s ease, transform 0.25s ease, font-size 0.25s ease, line-height 0.25s ease, color 0.25s ease";

const getInputAccent = (p: StyledInputProps) =>
  p.isValid
    ? BORDER.valid
    : p.isError
      ? BORDER.error
      : p.isCapsLockOn
        ? BORDER.caps
        : BORDER.default;

// -----------------------------------------------------------------------------
// Keyframes & shared popup styles
// -----------------------------------------------------------------------------

/** Ширины инпута по брейкпоинтам (от больших к меньшим) */
const INPUT_WIDTHS: ReadonlyArray<{ key: keyof typeof media; width: number }> =
  [
    { key: "max430", width: 344 },
    { key: "max414", width: 328 },
    { key: "max412", width: 326 },
    { key: "max411", width: 325 },
    { key: "max407", width: 321 },
    { key: "max393", width: 307 },
    { key: "max390", width: 304 },
    { key: "max384", width: 298 },
    { key: "max375", width: 289 },
    { key: "max360", width: 274 },
    { key: "max353", width: 267 },
    { key: "max344", width: 258 },
    { key: "max320", width: 234 },
  ];

const inputWidthMedia = INPUT_WIDTHS.map(
  ({ key, width }) => `${media[key]} { width: ${width}px; }`
).join("\n");

const popupFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50%) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
`;

/** Общие стили попапа валидации (инлайн и портал) */
const popupBase = css`
  padding: 14px 0;
  min-width: 250px;
  background: #2a2a2a;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 0;
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: -4px;
    transform: translateY(-50%) rotate(45deg);
    width: 8px;
    height: 8px;
    background: #2a2a2a;
  }
  ${media.max600} {
    min-width: 200px;
    padding: 12px 14px 12px 12px;
  }
  ${media.max430} {
    min-width: 180px;
  }
`;

const placeholderHidden = css`
  &::placeholder,
  &::-webkit-input-placeholder,
  &::-moz-placeholder,
  &:-ms-input-placeholder {
    color: transparent;
  }
`;

// -----------------------------------------------------------------------------
// Styled components
// -----------------------------------------------------------------------------

export const PasswordInputContainer = styled.div`
  position: relative;
  width: auto;
  height: auto;
`;

export const InputColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

/** Обёртка с плавающим плейсхолдером (data-placeholder, data-filled, data-error, data-valid из PasswordInput). */
export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

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
    transition: ${FLOAT_PLACEHOLDER_TRANSITION};
  }
  &:focus-within::before,
  &[data-filled="true"]::before {
    top: -5px;
    transform: translateY(0);
    font-size: 10px;
    line-height: 12px;
  }
  &[data-error="true"]::before {
    color: ${BORDER.error};
  }
  &[data-valid="true"]::before {
    color: ${BORDER.valid};
  }
`;

export const StyledInput = styled.input<StyledInputProps>`
  width: 390px;
  height: 44px;
  background: ${INPUT_BG};
  border: 1px solid ${getInputAccent};
  outline: none;
  padding: 0 50px 0 10px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: ${({ showPassword }) => (showPassword ? "28px" : "14px")};
  letter-spacing: ${({ showPassword }) => (showPassword ? "5px" : "normal")};
  color: #ffffff;
  border-radius: 6px;
  position: relative;

  ${inputWidthMedia}
  ${placeholderHidden}
`;

export const StyledError = styled.p`
  font-size: 12px;
  color: ${BORDER.error};
  margin-top: 4px;
  text-transform: none;
`;

export const ToggleButton = styled.button`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #84858a;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  transition: color 0.2s ease;
  &:hover,
  &:focus {
    outline: none;
    color: #ffffff;
  }
`;

export const CapsLockWarning = styled.div`
  font-size: 12px;
  color: ${BORDER.caps};
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: "Montserrat";
  font-weight: 400;
  text-transform: none;
`;

export const ValidationText = styled.p<{ isValid: boolean }>`
  font-size: 12px;
  color: ${({ isValid }) => (isValid ? "#ffffff" : "#84858a")};
  margin: 2px 0;
  font-family: "Montserrat";
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.3s ease;
  text-transform: none;
  &::before {
    width: 14px;
    height: 14px;
    content: "";
    background-image: url(${({ isValid }) =>
      isValid ? checkboxOn : checkboxOff});
    background-size: contain;
  }
`;

export const ValidationContainer = styled.div`
  margin-top: 8px;
  padding: 8px 0;
`;

export const ValidationPopupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  padding: 0 0 6px 12px;
  border-bottom: 1px solid #3a3a3a;
`;

export const ValidationPopupWarningIcon = styled.span`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #ffffff;
  line-height: 1;
`;

export const ValidationPopupTitle = styled.span`
  font-family: "Montserrat";
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;
  text-transform: none;
`;

export const ValidationPopup = styled.div`
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 12px;
  animation: ${popupFadeIn} 0.22s ease-out forwards;
  ${popupBase}
`;

export const ValidationPopupPortal = styled.div<{
  $left: number;
  $top: number;
}>`
  position: fixed;
  left: ${({ $left }) => $left}px;
  top: ${({ $top }) => $top}px;
  transform: translateY(-50%);
  z-index: 1001;
  animation: ${popupFadeIn} 0.22s ease-out forwards;
  ${popupBase}
`;

export const ValidationPopupContent = styled.div`
  padding-left: 14px;
`;
