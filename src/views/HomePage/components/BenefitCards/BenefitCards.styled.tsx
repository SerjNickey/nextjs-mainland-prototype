/**
 * Стили секции BenefitCards (переворачивающиеся карточки «Почему выбрать PokerPlanets»).
 * Константы размеров карточек и сетки заданы в пикселях; брейкпоинты — в styles/breakpoints.
 */
import styled from "styled-components";
import { media } from "../../../../styles/breakpoints";

/* Размеры карточек и сетки (px) */
const CARD_WIDTH = 467;
const CARD_HEIGHT_1X = 385; /* обычная карточка */
const CARD_HEIGHT_2X = 790; /* первая (большая) карточка */
const TITLE_HEIGHT = 59;
const GRID_GAP = 20;

/** Секция целиком: центрирование, отступы, колонка (заголовок + сетка карточек) */
export const Wrapper = styled.section`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto 120px auto;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  ${media.max768} {
    padding: 32px 16px 48px;
  }
`;

/** Контейнер заголовка секции: фиксированная высота, центрирование текста */
export const TitleWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  height: ${TITLE_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

/** Заголовок секции («WHY CHOOSE POKERPLANETS» или из API) */
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

/** Сетка карточек: 3 колонки на десктопе, 2 на планшете, 1 на мобильном; первая карточка занимает 2 строки */
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, ${CARD_WIDTH}px);
  grid-auto-rows: ${CARD_HEIGHT_1X}px;
  gap: ${GRID_GAP}px;
  width: 100%;
  max-width: ${3 * CARD_WIDTH + 2 * GRID_GAP}px;
  justify-content: center;

  ${media.max1024} {
    grid-template-columns: repeat(2, minmax(0, ${CARD_WIDTH}px));
    grid-auto-rows: minmax(${CARD_HEIGHT_1X}px, auto);
    max-width: 100%;
  }

  ${media.max600} {
    grid-template-columns: 1fr;
    grid-auto-rows: minmax(${CARD_HEIGHT_1X}px, auto);
    gap: 16px;
  }
`;

/**
 * Обёртка одной карточки: задаёт высоту и perspective для 3D-переворота.
 * $isFirst: true для benefit_card_primary — высота CARD_HEIGHT_2X и grid-row: span 2.
 */
export const CardWrapper = styled.article<{ $isFirst?: boolean }>`
  position: relative;
  width: 100%;
  height: ${({ $isFirst }) => ($isFirst ? CARD_HEIGHT_2X : CARD_HEIGHT_1X)}px;
  perspective: 1000px;
  grid-row: ${({ $isFirst }) => ($isFirst ? "span 2" : "auto")};
  cursor: pointer;

  ${media.max1024} {
    height: ${({ $isFirst }) => ($isFirst ? CARD_HEIGHT_2X : CARD_HEIGHT_1X)}px;
  }

  ${media.max600} {
    height: ${CARD_HEIGHT_1X}px !important;
    grid-row: auto;
  }
`;

/**
 * Внутренний слой карточки: содержит CardFront и CardBack, крутится по оси Y.
 * $flipped: true — повёрнут на -180deg (видна обратная сторона).
 * При hover на карточке — лёгкий наклон -10deg (если не перевёрнута).
 */
export const CardInner = styled.div<{ $flipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: rotateY(${({ $flipped }) => ($flipped ? "-180deg" : "0deg")});
  transition: transform 0.3s ease;

  ${CardWrapper}:hover & {
    transform: rotateY(${({ $flipped }) => ($flipped ? "-180deg" : "-10deg")});
    transition-duration: 1.5s;
  }
`;

/**
 * Базовая «грань» карточки (лицо и оборот): абсолютное заполнение, скрытие обратной стороны при 3D,
 * flex по вертикали (контент сверху), скругление, тень. Фон переопределяется в CardBack.
 */
const CardFace = styled.div`
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 24px;
  box-sizing: border-box;
  background: linear-gradient(
    145deg,
    rgba(45, 20, 25, 0.95) 0%,
    rgba(30, 15, 20, 0.98) 50%,
    rgba(25, 10, 15, 0.98) 100%
  );
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);

  ${media.max600} {
    padding: 20px;
  }
`;

/** Лицевая сторона: сдвиг по Z для корректного 3D (градиент + картинка поверх) */
export const CardFront = styled(CardFace)`
  transform: translateZ(1px);
`;

/** Обратная сторона: повёрнута на 180deg по Y, чёрный фон (без картинки в разметке) */
export const CardBack = styled(CardFace)`
  transform: rotateY(180deg) translateZ(1px);
  background: #121212;
  box-shadow: inset 0px 2px 0px rgba(255, 255, 255, 0.05);
`;

/** Блок текста на карточке (заголовок + описание): поверх картинки/фона за счёт z-index */
export const CardContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

/** Заголовок на лицевой стороне карточки (крупнее). */
export const CardTitleFront = styled.h3`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  text-transform: uppercase;
  color: #ffffff;

  ${media.max600} {
    font-size: 24px;
  }
`;

/** Заголовок на обороте карточки. */
export const CardTitle = styled.h3`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 800;
  font-size: 32px;
  text-transform: uppercase;
  color: #ffffff;
`;

/** Текст описания на обороте карточки (поддерживает HTML через dangerouslySetInnerHTML) */
export const CardDescription = styled.p`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 140%;
  color: #ffffff;
  margin: 0;
  max-width: 90%;

  ${media.max600} {
    font-size: 13px;
  }
`;

/** Фон-картинка на лицевой стороне: на весь размер карточки (inset: 0), cover, без кликов */
export const CardImage = styled.div<{ $imageUrl?: string }>`
  position: absolute;
  inset: 0;
  background-image: ${({ $imageUrl }) =>
    $imageUrl ? `url(${$imageUrl})` : "none"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  pointer-events: none;
`;

/**
 * Кнопка переворота карточки (иконка стрелки по кругу): правый нижний угол.
 * При hover затемняется фон кнопки и крутится только иконка (svg) на 180deg.
 */
export const FlipButton = styled.button`
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: 44px;
  height: 44px;
  background: rgba(46, 46, 46, 0.46);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  z-index: 10;
  cursor: pointer;
  pointer-events: auto;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }

  &:hover svg {
    transform: rotate(180deg);
  }

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 2px;
  }

  svg {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }
`;

/** Кнопка «Подробнее» на обороте: левый нижний угол, только у карточек 2–5 (не у первой) */
export const MoreDetailsButton = styled.a`
  position: absolute;
  left: 16px;
  bottom: 16px;
  padding: 12px 24px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  color: #ffffff;
  background: #474747;
  border: none;
  border-radius: 6px;
  text-decoration: none;
  z-index: 2;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(80, 81, 87, 0.95);
  }

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 2px;
  }
`;
