/**
 * SimpleInput — стили контролируемого инпута с плавающим плейсхолдером.
 * data-placeholder, data-filled, data-error пробрасываются из SimpleInput.tsx.
 */
import styled, { css, keyframes } from "styled-components";
import { media } from "../../styles/breakpoints";

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const POPUP_GAP = 12;

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

/** Базовые стили попапа (размеры задаются через пропсы $minWidth / $width). */
const popupBase = (minWidth = 250, width?: number) => css`
  padding: 14px 0;
  min-width: ${minWidth}px;
  ${width != null ? `width: ${width}px;` : ""}
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
    min-width: ${Math.min(minWidth, 200)}px;
    padding: 12px 14px 12px 12px;
  }
  ${media.max430} {
    min-width: ${Math.min(minWidth, 180)}px;
  }
`;

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface StyledInputProps {
  isError?: boolean;
}

// -----------------------------------------------------------------------------
// Container & placeholder (::before)
// -----------------------------------------------------------------------------

/**
 * SimpleInputContainer — обёртка вокруг инпута.
 *
 * Размеры: фиксированная ширина 190px (min-width тоже 190px), чтобы в Safari/macOS
 * поле не сжималось в flex-контейнере. position: relative нужен для абсолютного
 * позиционирования ::before.
 *
 * Плавающий плейсхолдер реализован одним псевдоэлементом ::before:
 * 1) В покое (пустое поле, без фокуса): он визуально «внутри» поля — top: 50%,
 *    transform: translateY(-50%), font-size: 14px, выравнивание по вертикали как у текста инпута.
 * 2) При фокусе ( :focus-within ) или при заполненном поле ( [data-filled="true"] ):
 *    плейсхолдер плавно уезжает вверх: top: -5px, transform: translateY(0), font-size: 10px.
 * 3) transition на top, transform, font-size, line-height, color даёт анимацию ~0.25s.
 *
 * Текст для ::before берётся из content: attr(data-placeholder). Фон у псевдоэлемента
 * совпадает с фоном инпута, чтобы при подъёме текст не «проезжал» через бордер.
 * pointer-events: none — чтобы клики проходили в инпут.
 */
export const SimpleInputContainer = styled.div`
  width: 190px;
  min-width: 190px;
  height: auto;
  position: relative;
  box-sizing: border-box;
  flex-shrink: 0;

  /* ----- Псевдоэлемент: плавающий плейсхолдер ----- */
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
    background: rgba(24, 24, 24, 1);
    color: #84858a;
    font-weight: 300;
    pointer-events: none;

    /* Состояние «внутри поля»: по центру по вертикали, размер как у текста инпута */
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    transition:
      top 0.25s ease,
      transform 0.25s ease,
      font-size 0.25s ease,
      line-height 0.25s ease,
      color 0.25s ease;
  }

  /* Состояние «над полем»: при фокусе или при непустом value (data-filled из компонента) */
  &:focus-within::before,
  &[data-filled="true"]::before {
    top: -5px;
    transform: translateY(0);
    font-size: 10px;
    line-height: 12px;
  }

  /* Ошибка валидации: плейсхолдер и рамка инпута красные */
  &[data-error="true"]::before {
    color: #d70022;
  }

  ${media.max430} {
    width: 100%;
    min-width: 0;
    max-width: 190px;
  }
`;

/**
 * StyledInput — само поле ввода.
 *
 * Высота 44px, padding 0 10px, шрифт 14px — согласовано с начальным положением
 * плейсхолдера в контейнере (line-height: 44px у ::before в покое).
 * Рамка: серая по умолчанию, красная при isError (передаётся из SimpleInput).
 *
 * Нативный placeholder скрыт (color: transparent во всех префиксах), потому что
 * визуальный плейсхолдер рисуется только через ::before контейнера — так можно
 * анимировать один и тот же текст (из data-placeholder) из положения «внутри поля»
 * в положение «над полем».
 */
export const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  min-width: 0;
  max-width: 190px;
  height: 44px;
  box-sizing: border-box;
  background: rgba(24, 24, 24, 1);
  border: 1px solid ${({ isError }) => (isError ? "#d70022" : "#5b5b5b")};
  outline: none;
  padding: 0 10px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  border-radius: 6px;

  /* Нативный placeholder не показываем — используется только ::before контейнера */
  &::placeholder,
  &::-webkit-input-placeholder,
  &::-moz-placeholder,
  &:-ms-input-placeholder {
    color: transparent;
  }
`;

/**
 * StyledError — текст ошибки валидации под инпутом.
 * Красный цвет, на узких экранах размер шрифта уменьшается через медиа-брейкпоинты.
 */
export const StyledError = styled.p`
  font-size: 10px;
  color: #d70022;
  margin-top: 4px;
  text-transform: none;

  ${media.max384} {
    font-size: 10px;
  }
  ${media.max353} {
    font-size: 9px;
  }
  ${media.max320} {
    font-size: 8px;
  }
`;

/** Обёртка с position: relative для позиционирования попапа (используется при наличии popupContent). */
export const SimpleInputPopupWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

/** Инлайн-попап слева от инпута. Размеры через пропсы. */
export const SimpleInputPopup = styled.div<{
  $minWidth?: number;
  $width?: number;
  $maxWidth?: number;
}>`
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: ${POPUP_GAP}px;
  animation: ${popupFadeIn} 0.22s ease-out forwards;
  ${({ $maxWidth }) => $maxWidth != null && `max-width: ${$maxWidth}px;`}
  ${({ $minWidth = 250, $width }) => popupBase($minWidth, $width)}
`;

/** Попап для рендера в портале (position: fixed). */
export const SimpleInputPopupPortal = styled.div<{
  $left: number;
  $top: number;
  $minWidth?: number;
  $width?: number;
  $maxWidth?: number;
}>`
  position: fixed;
  left: ${({ $left }) => $left}px;
  top: ${({ $top }) => $top}px;
  transform: translateY(-50%);
  z-index: 1001;
  animation: ${popupFadeIn} 0.22s ease-out forwards;
  ${({ $maxWidth }) => $maxWidth != null && `max-width: ${$maxWidth}px;`}
  ${({ $minWidth = 250, $width }) => popupBase($minWidth, $width)}
`;

/** Блок правил в попапе: иконка предупреждения + текст (как в PasswordInput). */
export const SimpleInputPopupRulesBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 15px;
  gap: 8px;
`;

export const SimpleInputPopupWarningIcon = styled.span`
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

export const SimpleInputPopupRulesText = styled.p`
  flex: 1;
  min-width: 0;
  margin: 0;
  font-family: "Montserrat";
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #ffffff;
  text-transform: none;
  word-wrap: break-word;
`;
