import styled from "styled-components";
import { media } from "../../../../styles/breakpoints";

const accentRed = "#D70022";
const textGray = "#343132";
const lineGray = "#343132";

export const Wrapper = styled.section`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 40px 0 60px;
  box-sizing: border-box;
`;

/** Вертикальная линия по центру (фон, серая) */
export const VerticalLine = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(
    0deg,
    rgba(10, 10, 10, 0.2) 0%,
    ${lineGray} 11.06%,
    ${lineGray} 33.65%,
    ${lineGray} 96.57%,
    rgba(10, 10, 10, 0.2) 100%
  );
  transform: translateX(-50%);

  ${media.max768} {
    left: 20px;
  }
`;

/** Сегмент вертикальной линии (как LineSegment в Steps): градиент + точка при $isActive */
export const VerticalLineSegment = styled.div<{ $isActive?: boolean }>`
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 4px;
  transform: translateX(-50%);
  background: transparent;
  transition: background 0.3s ease;
  pointer-events: none;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ $isActive }) =>
      $isActive
        ? `linear-gradient(180deg, ${lineGray} 0%, ${accentRed} 50%, ${lineGray} 100%)`
        : "transparent"};
    clip-path: ${({ $isActive }) =>
      $isActive
        ? "polygon(50% 0%, 100% 6%, 100% 94%, 50% 100%, 0% 94%, 0% 6%)"
        : "none"};
    transition:
      background 0.3s ease,
      clip-path 0.3s ease;
  }

  &::after {
    content: "";
    position: absolute;
    width: 24px;
    height: 24px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: ${({ $isActive }) => ($isActive ? accentRed : lineGray)};
    border-radius: 4px;
    z-index: 1;
    transition: background 0.3s ease;
  }

  ${media.max768} {
    left: 20px;
  }
`;

export const Timeline = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-top: 24px;
`;

/** Один шаг таймлайна: Dot по центру карточки, ховер только по Card. */
export const Step = styled.div<{ $side: "left" | "right" }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $side }) =>
    $side === "left" ? "flex-start" : "flex-end"};
  /* Контент заканчивается за STEP_PADDING_OFFSET до центра (линия + Dot) */
  padding-right: ${({ $side }) =>
    $side === "left" ? `calc(50% + ${STEP_PADDING_OFFSET}px)` : "0"};
  padding-left: ${({ $side }) =>
    $side === "right" ? `calc(50% + ${STEP_PADDING_OFFSET}px)` : "0"};
  padding-bottom: 48px;
  position: relative;
  min-height: 120px;

  ${media.max768} {
    padding-left: 56px;
    padding-right: 0;
    justify-content: flex-start;
  }
`;

/** Отступ между карточкой и точкой на линии */
const CARD_DOT_GAP = 0;
const DOT_RADIUS = 8;
/** От края контента до центра линии: зазор + радиус точки */
const STEP_PADDING_OFFSET = CARD_DOT_GAP + DOT_RADIUS;

/** Карточка шага. $side — с какой стороны линии; отступ до Dot = CARD_DOT_GAP. Ховер/клик только здесь. */
export const Card = styled.div<{
  $isActive?: boolean;
  $side?: "left" | "right";
}>`
  max-width: 546px;
  width: 100%;
  padding: 20px 24px;
  margin-right: ${({ $side }) => ($side === "left" ? CARD_DOT_GAP : 0)}px;
  margin-left: ${({ $side }) => ($side === "right" ? CARD_DOT_GAP : 0)}px;

  backdrop-filter: blur(5px);
  border-radius: 8px;
  text-align: left;
  transition: background 0.3s ease;
  cursor: pointer;
`;

export const Date = styled.div<{ $highlight?: boolean; $isActive?: boolean }>`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  text-transform: uppercase;
  color: ${({ $highlight, $isActive }) =>
    $highlight || $isActive ? accentRed : textGray};
  margin-bottom: 8px;
  transition: color 0.3s ease;
`;

export const StepTitle = styled.h3<{ $isActive?: boolean }>`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  text-transform: uppercase;
  color: ${({ $isActive }) => ($isActive ? "#ffffff" : textGray)};
  margin: 0 0 12px;
  line-height: 1.25;
  transition: color 0.3s ease;
`;

export const StepDescription = styled.p<{ $isActive?: boolean }>`
  ffont-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  color: ${({ $isActive }) => ($isActive ? "#b0b0b5" : textGray)};
  margin: 0;
  transition: color 0.3s ease;
`;
