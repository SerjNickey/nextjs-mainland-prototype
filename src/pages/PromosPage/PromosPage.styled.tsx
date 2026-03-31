/**
 * Стили страницы Promos Page.
 *
 * Структура:
 * - Wrapper: общий контейнер страницы, тёмный фон.
 * - Content: основной контент (заголовок, табы, сетка карточек), max-width 1440px.
 * - Карточка: 467×216 px (ТЗ). Сетка: 3 колонки на десктопе, 2 на планшете, 1 на мобильном.
 * - Модальное окно: оверлей, баннер, тело с CTA и раскрывающимся блоком T&C.
 */
import styled from "styled-components";
import { media } from "../../styles/breakpoints";
import closeIcon from "../../assets/images/PreFooter/close_2x.webp";
import back_1440 from "../../assets/images/LandingPage/back_1440_3x.webp";

/** Ширина одной карточки промо (ТЗ). */
const CARD_WIDTH = 467;
/** Высота карточки (ТЗ). */
const CARD_HEIGHT = 216;
/** Расстояние между карточками в сетке. */
const GRID_GAP = 20;

/** Корневой контейнер страницы: колонка, тёмный фон, min-height 100vh. */
export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 3840px;
  background-image: url(${back_1440});
  background-position: top center;
  background-size: 100% auto;
  background-repeat: no-repeat;

  ${media.min768} {
    max-width: 1920px;
    zoom: 0.4; /* 768×1024 */
  }
  ${media.min800} {
    zoom: 0.417; /* 800×600 */
  }
  ${media.min960} {
    zoom: 0.5; /* 960×600, 1920×1200 @ 200% */
  }
  ${media.min1024} {
    zoom: 0.533; /* 1024×768 */
  }
  ${media.min1097} {
    zoom: 0.571; /* 1097×617/686, 1920×1080/1200 @ 175% */
  }
  ${media.min1152} {
    zoom: 0.6; /* 1152×864 */
  }
  ${media.min1176} {
    zoom: 0.613; /* 1176×664 */
  }
  ${media.min1280} {
    zoom: 0.667; /* 1280×720/768/800/960/1024, 1920×1200 @ 150% */
  }
  ${media.min1360} {
    zoom: 0.708; /* 1360×768 */
  }
  ${media.min1366} {
    zoom: 0.713; /* 1366×768 */
  }
  ${media.min1440} {
    zoom: 0.75; /* 1440×1080 */
  }
  ${media.min1536} {
    zoom: 0.8; /* 1536×864/960, 1920×1080/1200 @ 125% */
  }
  ${media.min1600} {
    zoom: 0.833; /* 1600×900/1024/1200 */
  }
  ${media.min1680} {
    zoom: 0.875; /* 1680×1050 */
  }
  ${media.min1720} {
    zoom: 0.896; /* 1720×720, 3440×1440 @ 200% */
  }
  ${media.min1920} {
    zoom: 1; /* 1920×1080 */
  }
  ${media.min1965} {
    zoom: 1.023; /* 1965×822, 3440×1440 @ 175% */
  }
  ${media.min2048} {
    zoom: 1.067; /* 2048×1280 */
  }
  ${media.min2293} {
    zoom: 1.194; /* 2293×960, 3440×1440 @ 150% */
  }
  ${media.min2560} {
    zoom: 1.333; /* 2560×1600 */
  }
  ${media.min2752} {
    zoom: 1.433; /* 2752×1152, 3440×1440 @ 125% */
  }
  ${media.min3440} {
    zoom: 1.792; /* 3440×1440 @ 100% */
  }
  ${media.min3840} {
    zoom: 2;
  }
  ${media.min5120} {
    zoom: 2.667; /* 21:9, 32:9 */
  }
`;

/** Основной контент: заголовок, табы, сетка карточек; центрирование, отступы. */
export const Content = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 24px 60px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  ${media.max768} {
    padding: 32px 16px 48px;
    gap: 24px;
  }
`;

/** Заголовок страницы (например "ALL PROMOS"): крупный, верхний регистр, по центру. */
export const Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  font-size: 48px;
  line-height: 1.2;
  text-transform: uppercase;
  color: #ffffff;
  text-align: center;
  margin: 0;

  ${media.max600} {
    font-size: 32px;
  }
`;

/** Строка табов категорий: flex, перенос, центрирование. */
export const TabsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

/** Название активной категории под табами: выравнивание слева. */
export const CategoryTitle = styled.h2`
  width: 100%;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 29px;
  text-transform: uppercase;
  color: #ffffff;
  text-align: left;
  margin: 0;

  ${media.max600} {
    font-size: 32px;
  }
`;

/** Один таб категории: цвета как в GrandMenu (navGray, navGrayHover, accentRed). */
const navGray = "#2d2e33";
const navGrayHover = "#3a3b40";
const accentRed = "#c41e3a";

export const Tab = styled.button<{ $active?: boolean }>`
  height: 32px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0px 12px;
  // background: ${({ $active }) => ($active ? navGrayHover : navGray)};
  background: transparent;
  border: 1px solid ${({ $active }) => ($active ? accentRed : "#84858a")};
  border-radius: 6px;
  outline: none;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;

  cursor: pointer;
  transition: background 0.2s ease;
  box-sizing: border-box;

  &:focus-visible {
    border: 1px solid ${accentRed};
  }
`;

/** Обёртка иконки в табе: 20×20, SVG наследует цвет (белый). */
export const TabIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: inherit;

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;

/** Иконка категории из API (img): принудительно белая через filter. */
export const TabIconImg = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  filter: brightness(0) invert(1);
`;

/** Сетка карточек: 3 колонки по CARD_WIDTH на десктопе, 2 на планшете, 1 на мобильном. */
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, ${CARD_WIDTH}px);
  grid-auto-rows: ${CARD_HEIGHT}px;
  gap: ${GRID_GAP}px;
  width: 100%;
  max-width: ${3 * CARD_WIDTH + 2 * GRID_GAP}px;
  justify-content: center;

  ${media.max1024} {
    grid-template-columns: repeat(2, minmax(0, ${CARD_WIDTH}px));
    max-width: 100%;
  }

  ${media.max600} {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

/** Одна карточка промо: фиксированная высота, контент прижат к низу, hover — лёгкое увеличение. */
export const Card = styled.article`
  position: relative;
  width: 100%;
  height: ${CARD_HEIGHT}px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px;
  box-sizing: border-box;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

/** Фоновое изображение карточки: на весь блок, выравнивание по правому краю. */
export const CardImage = styled.div<{ $imageUrl?: string }>`
  position: absolute;
  inset: 0;
  background-image: ${({ $imageUrl }) =>
    $imageUrl ? `url(${$imageUrl})` : "none"};
  background-size: auto 100%;
  background-position: center right;
  background-repeat: no-repeat;
  pointer-events: none;
`;

/** Блок текста и кнопки: заголовок/подзаголовок сверху, кнопка внизу (margin-top: auto при наличии). */
export const CardContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  min-height: 156px;
`;

/** Заголовок карточки: до 2 строк, обрезка по высоте. */
export const CardTitle = styled.h3`
  width: 286px;
  height: 70px;
  margin: 0;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 900;
  font-size: 32px;
  line-height: 108.02%;
  text-transform: uppercase;
  color: #ffffff;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

/** Подзаголовок карточки: до 2 строк. */
export const CardSubtitle = styled.p`
  width: 158px;
  height: 30px;
  margin: 0;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

/** Кнопка DETAILS: margin-top auto прижимает к низу CardContent при наличии заголовка/подзаголовка. */
export const CardButton = styled.button`
  min-width: 170px;
  height: 44px;
  align-self: flex-start;
  margin-top: auto;
  padding: 12px 24px;
  background: #d70022;
  border-radius: 6px;
  border: none;
  color: #ffffff;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #c62828;
  }

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 2px;
  }
`;

/* ---------- Модальное окно (Pop-up) ---------- */

/** Затемнённый оверлей: клик закрывает модалку, анимация появления. */
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
  animation: fadeIn 0.25s ease;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

/** Контейнер модалки: фиксированная высота, скролл только у ModalBody. */
export const ModalBox = styled.div`
  position: relative;
  width: 100%;
  max-width: 858px;
  height: 705px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #181818;
  border: 1px solid #2f2f2f;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  animation: slideIn 0.3s ease;
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

/** Кнопка закрытия модалки: иконка из closeIcon (background-image) в правом верхнем углу. */
export const ModalClose = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 44px;
  height: 44px;
  background-color: rgba(24, 24, 24, 1);
  background-image: url(${closeIcon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  z-index: 2;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

/** Обёртка баннерного изображения в модалке (фиксированная высота, не сжимается). */
export const ModalImageWrap = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 245px;
  border-radius: 16px 16px 0 0;
  overflow: hidden;

  ${media.max600} {
    height: 180px;
  }
`;

/** Фоновое изображение баннера в модалке. */
export const ModalImage = styled.div<{ $imageUrl?: string }>`
  position: absolute;
  inset: 0;
  background-image: ${({ $imageUrl }) =>
    $imageUrl ? `url(${$imageUrl})` : "none"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

/** Градиентный оверлей на баннере: заголовок/подзаголовок/note внизу баннера. */
export const ModalImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 16px;
  padding: 24px;
  box-sizing: border-box;
  // background: linear-gradient(
  //   to top,
  //   rgba(0, 0, 0, 0.85) 0%,
  //   rgba(0, 0, 0, 0.4) 40%,
  //   transparent 100%
  // );
`;

/** Тело модалки под баннером: описание, CTA-кнопка, блок T&C; единственная прокручиваемая область. */
export const ModalBody = styled.div`
  flex: 1 1 0;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 24px;
  padding-bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;

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

  & > * {
    flex-shrink: 0;
  }
`;

/** Заголовок в модалке (на баннере или в теле). */
export const ModalTitle = styled.h2`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 900;
  font-size: 45px;
  line-height: 108.02%;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0;
`;

/** Подзаголовок в модалке (на баннере или в теле). */
export const ModalSubtitle = styled.p`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 25.9952px;
  line-height: 32px;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0;
`;

/** Период кампании (note) в модалке. */
export const ModalNote = styled.p`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #b3b3b3;
  opacity: 0.7;
  margin: 0;
`;

/** Описание промо в модалке (HTML из API). Единые стили для контента с бэка. */
export const ModalDescription = styled.div`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: #ffffff;
  margin: 0 0 10px 0;
  box-sizing: border-box;

  p,
  ol,
  ul {
    margin: 0 0 12px 0;
  }
  p:empty {
    display: none;
  }
  p:last-child,
  ol:last-child,
  ul:last-child {
    margin-bottom: 0;
  }
  ol,
  ul {
    padding-left: 1.25em;
  }
  li {
    margin-bottom: 4px;
  }
  a {
    color: #d70022;
    text-decoration: underline;
  }
  a:hover {
    color: #ff4444;
  }
  b {
    font-weight: 700;
  }
`;

/** CTA-кнопка в модалке (например "DOWNLOAD AND CLAIM") — ссылка на button_link. */
export const ModalButton = styled.a`
  display: inline-block;
  align-self: flex-start;
  padding: 12px 28px;
  background: #d70022;
  border-radius: 6px;
  color: #ffffff;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: #c62828;
  }
`;

/** Обёртка раскрывающегося блока Terms & Conditions. */
export const ToggleBlock = styled.div`
  border-radius: 6px;
  overflow: hidden;
`;

/** Заголовок блока T&C: клик раскрывает/сворачивает; шеврон поворачивается при $open. */
export const ToggleHeader = styled.button<{ $open?: boolean }>`
  width: 100%;
  height: 64px;
  margin-bottom: 16px;
  padding: 14px 16px;
  background: #242424;
  border-radius: 6px;
  border: none;
  color: #ffffff;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-transform: uppercase;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  transition: background 0.2s ease;

  // &:hover {
  //   background: rgba(60, 60, 65, 0.95);
  // }

  .chevron {
    flex-shrink: 0;
    transition: transform 0.3s ease;
    transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
  }
`;

/** Контейнер содержимого T&C: max-height 0/8000px для анимации раскрытия (длинный текст не обрезается). */
export const ToggleContent = styled.div<{ $open?: boolean }>`
  max-height: ${({ $open }) => ($open ? "8000px" : "0")};
  overflow: hidden;
  transition: max-height 0.35s ease;
`;

/** Внутренний блок с HTML-текстом условий (terms_and_conditions из API). */
export const ToggleInner = styled.div`
  padding: 16px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 16px;
  background: #242424;
  color: #84858a;
  box-sizing: border-box;

  p,
  ol,
  ul {
    margin: 0 0 12px 0;
  }
  p:empty {
    display: none;
  }
  p:last-child,
  ol:last-child,
  ul:last-child {
    margin-bottom: 0;
  }
  ol,
  ul {
    padding-left: 1.25em;
  }
  li {
    margin-bottom: 4px;
  }
  a {
    color: #d70022;
    text-decoration: underline;
  }
  a:hover {
    color: #ff4444;
  }
  b {
    font-weight: 700;
  }
`;
