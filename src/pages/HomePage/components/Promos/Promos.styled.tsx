import styled from "styled-components";
import { media } from "../../../../styles/breakpoints";

/** Секция блока Promos: заголовок + карусель слайдов, центрирование, отступы. */
export const Wrapper = styled.section`
  width: 100%;
  margin-bottom: 90px;
  padding: 0 15px 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  ${media.max600} {
    padding: 50px 0 40px;
    gap: 16px;
  }
`;

/** Заголовок блока (promos_title из API): крупный, uppercase, белый. */
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

/** Область видимости карусели Embla: overflow hidden, max-width 1440px. Фэйды слева/справа поверх слайдов. */
export const Viewport = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 1440px;
  padding: 0;
  box-sizing: border-box;
  border-radius: 10px;

  /* Left fade */
  // &::before {
  //   content: "";
  //   position: absolute;
  //   width: 240px;
  //   height: 100%;
  //   left: 0;
  //   top: 0;
  //   z-index: 5;
  //   background: linear-gradient(90deg, #000000 8.74%, rgba(0, 0, 0, 0) 100%);
  //   pointer-events: none;
  // }

  /* Right fade */
  &::after {
    content: "";
    position: absolute;
    width: 223px;
    height: 100%;
    right: 0;
    top: 0;
    z-index: 5;
    background: linear-gradient(270deg, #0a0a0a 0%, rgba(10, 10, 10, 0) 100%);
    pointer-events: none;
  }

  ${media.max600} {
    &::before {
      width: min(240px, 40%);
    }
    &::after {
      width: min(223px, 40%);
    }
  }
`;

/** Контейнер слайдов карусели: flex, $isCentered — выравнивание по центру или по старту. */
export const Container = styled.div<{ $isCentered: boolean }>`
  display: flex;
  gap: 0;
  padding-right: 20px;
  justify-content: ${(props) => (props.$isCentered ? "center" : "flex-start")};
`;

/** Один слайд карусели: фиксированная ширина 467px, скругление, отступ справа. */
export const Slide = styled.div`
  flex: 0 0 467px;
  min-width: 0;
  border-radius: 12px;
  margin-right: 20px;
`;

/** Контент слайда: высота 218px, фон из $backgroundUrl справа, колонка заголовок/текст/кнопка. */
export const SlideContent = styled.div<{ $backgroundUrl?: string }>`
  height: 218px;
  border-radius: 16px;

  padding: 24px;

  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: flex-start;
  align-items: flex-start;

  background-color: #242424;
  background-image: ${(props) =>
    props.$backgroundUrl ? `url(${props.$backgroundUrl})` : "none"};
  background-size: auto 100%;
  background-position: center right;
  background-repeat: no-repeat;
`;

/** Заголовок на слайде: до 2 строк, uppercase, белый. */
export const SlideTitle = styled.h3`
  max-width: 286px;
  width: 100%;
  min-height: 70px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 900;
  font-size: 32px;
  line-height: 108.02%;
  text-transform: uppercase;

  color: #ffffff;
`;

/** Подзаголовок на слайде: до 2 строк, мелкий шрифт, белый. */
export const SlideText = styled.p`
  max-width: 158px;
  width: 100%;
  min-height: 30px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;

  color: #ffffff;
`;

/** Кнопка на слайде: link — переход по ссылке, popup — открытие модалки (как на странице Promos). */
export const SlideButton = styled.button`
  min-width: 170px;
  margin-top: auto;
  padding: 12px 24px;
  background: #d70022;
  border: none;
  border-radius: 6px;
  color: #ffffff;
  font-family: "Montserrat";
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #c62828;
  }
`;

/** Обёртка блока точек навигации под каруселью. */
export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

/** Ряд точек (dots) для переключения слайдов. */
export const Dots = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

/** Одна точка навигации: $isActive — активный слайд, клик переключает слайд. Стили как у BannerSlider. */
export const DotButton = styled.button<{ $isActive: boolean }>`
  width: ${(props) => (props.$isActive ? "8px" : "6px")};
  height: ${(props) => (props.$isActive ? "8px" : "6px")};
  border-radius: 1px;
  border: none;
  background: ${(props) =>
    props.$isActive ? "rgba(132, 133, 138, 1)" : "rgba(64, 65, 71, 1)"};
  opacity: ${(props) => (props.$isActive ? 1 : 0.5)};
  cursor: pointer;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: scale(1.1);
  }
`;

/* ---------- Модальное окно ---------- */

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

/** Кнопка закрытия модалки (×) в правом верхнем углу. */
export const ModalClose = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 44px;
  height: 44px;
  background: #242424;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  z-index: 2;
  transition: opacity 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

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

/** Градиентный оверлей на баннере: заголовок/подзаголовок/note/CTA внизу баннера. */
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

  /* Стили скроллбара как в CountrySelect */
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

  /* Дети не сжимаются — скролл доходит до конца контента (в т.ч. T&C). */
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

/** Подзаголовок в модалке. */
export const ModalSubtitle = styled.p`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 32px;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0;
`;

/** Период кампании (note) в модалке — серый текст. */
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
  white-space: pre-line;
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
    margin: 12px 0;
    min-height: 0;
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

/** CTA-кнопка в модалке (ссылка на button_link). */
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
  white-space: pre-line;
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
    margin: 12px 0;
    min-height: 0;
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
