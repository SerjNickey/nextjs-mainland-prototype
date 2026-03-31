/**
 * Стили блока Community: заголовок, подзаголовок, горизонтальный ряд карточек соцсетей.
 * Контейнер: 245px высота, 1440px ширина (ТЗ). Hover/active — красная рамка.
 */
import styled from "styled-components";
import { media } from "../../../../styles/breakpoints";
import defaultBack from "../../../../assets/icons/Community/default.webp";
import activeBack from "../../../../assets/icons/Community/active.webp";

export const GrandWrapper = styled.section`
  margin-bottom: 100px;
`;
/** Контейнер блока: 245×1440 px по ТЗ, центрирование по горизонтали */
export const Wrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  // min-height: 245px;
  margin: 0 auto 30px auto;
  padding: 0 24px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;

  ${media.max768} {
    padding: 24px 16px 32px;
    min-height: auto;
  }
`;

/** Заголовок блока (Main title): 32 px, bold, uppercase, белый */
export const Title = styled.h2`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 800;
  font-size: 40px;
  line-height: 49px;
  /* identical to box height */
  text-align: center;
  text-transform: uppercase;

  color: #ffffff;
`;

/** Подзаголовок (Subtitle): 32 px по ТЗ, regular, визуально меньше заголовка */
export const Subtitle = styled.p`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 120%;
  color: #ffffff;
  text-transform: uppercase;
  text-align: center;
  margin: 0;

  ${media.max600} {
    font-size: 16px;
  }
`;

/** Горизонтальный ряд карточек соцсетей на всю ширину Wrapper */
export const CardRow = styled.div`
  display: flex;
  width: 100%;
  align-items: stretch;
  gap: 16px;
  margin-top: 8px;
  box-sizing: border-box;

  ${media.max600} {
    flex-wrap: wrap;
  }
`;

const redIconFilter =
  "brightness(0) saturate(100%) invert(14%) sepia(98%) saturate(5000%) hue-rotate(355deg) brightness(95%) contrast(101%)";

/** Иконка соцсети (svg/img). По умолчанию белая; при наведении на карточку — красная. */
export const CardIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  flex-shrink: 0;
  transition: filter 0.2s ease;
  filter: brightness(0) invert(1);
`;

export const Card = styled.a`
  position: relative;
  height: 59px;
  display: flex;
  flex: 1 1 0;
  min-width: 0;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  padding: 0 18px;
  background: url(${defaultBack});
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 8px;
  text-decoration: none;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: url(${activeBack});
    background-size: contain;
    background-repeat: no-repeat;

    & ${CardIcon} {
      filter: ${redIconFilter};
    }
  }
`;

/** Название соцсети: 12 px по ТЗ */
export const CardName = styled.span`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  color: #ffffff;
`;
