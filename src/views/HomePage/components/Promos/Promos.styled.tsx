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

  ${media.max540} {
    padding: 0 15px 0 15px;
    gap: 12px;
    margin-bottom: 35px;
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

  ${media.max540} {
    font-weight: 800;
    font-size: 24px;
    line-height: 29px;
    text-align: center;
    text-transform: uppercase;
    color: #ffffff;
  }
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

  /* Узкие экраны: слайд по пропорции 343×158, ширина карточки = viewport − 30 (см. max360…max320) */
  ${media.max540} {
    border-radius: 6px;
    max-width: 343px;
    margin-left: auto;
    margin-right: auto;

    &::after {
      display: none;
    }
  }

  ${media.max360} {
    max-width: 330px;
  }

  ${media.max353} {
    max-width: 323px;
  }

  ${media.max344} {
    max-width: 314px;
  }

  ${media.max320} {
    max-width: 290px;
  }
`;

/** Контейнер слайдов карусели: flex, $isCentered — выравнивание по центру или по старту. */
export const Container = styled.div<{ $isCentered: boolean }>`
  display: flex;
  gap: 0;
  padding-right: 20px;
  justify-content: ${(props) => (props.$isCentered ? "center" : "flex-start")};

  ${media.max430} {
    gap: 12px;
    padding-right: 0;
  }

  ${media.max540} {
    gap: 0;
    padding-right: 0;
    justify-content: flex-start;
  }
`;

/**
 * На max540 — слайды по пропорции 343×158 (ширина − 30 на max360…max320).
 */
export const Slide = styled.div`
  flex: 0 0 467px;
  min-width: 0;
  border-radius: 12px;
  margin-right: 20px;

  ${media.max540} {
    flex: 0 0 343px;
    margin-right: 12px;
    /* Углы видны на Slide/SlideContent; без этого остаётся 12px с Slide */
    border-radius: 6px;

    &:last-child {
      margin-right: 12px;
    }
  }

  ${media.max360} {
    flex: 0 0 330px;
  }

  ${media.max353} {
    flex: 0 0 323px;
  }

  ${media.max344} {
    flex: 0 0 314px;
  }

  ${media.max320} {
    flex: 0 0 290px;
  }
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

  ${media.max540} {
    height: 158px;
    padding: 15px;
    /* Именно здесь рисуется карточка — без 6px на Viewport визуально не менялось (было 16px) */
    border-radius: 6px;
    gap: 0px;
  }

  ${media.max360} {
    height: 152px;
  }

  ${media.max353} {
    height: 149px;
  }

  ${media.max344} {
    height: 145px;
  }

  ${media.max320} {
    height: 134px;
  }

  ${media.max360} {
    padding: 14px;
  }

  ${media.max353} {
    padding: 13px;
  }

  ${media.max344} {
    padding: 12px;
  }

  ${media.max320} {
    padding: 10px;
  }
`;

/** Заголовок на слайде: до 2 строк, uppercase, белый. */
export const SlideTitle = styled.h3`
  max-width: 286px;
  width: 100%;
  min-height: 70px;
  margin: 0 0 0 0;
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

  ${media.max540} {
    max-width: 190px;
    min-height: 44px;
    margin: 0 0 0 0;
    font-size: 20px;
  }

  ${media.max360} {
    max-width: 182px;
    min-height: 42px;
    font-size: 19px;
  }

  ${media.max353} {
    max-width: 178px;
    min-height: 40px;
    font-size: 18px;
  }

  ${media.max344} {
    max-width: 172px;
    min-height: 38px;
    font-size: 18px;
  }

  ${media.max320} {
    max-width: 158px;
    min-height: 34px;
    font-size: 17px;
  }

  flex-shrink: 0;
`;

/**
 * Область между заголовком и кнопкой: flex:1 + align-items:center — подзаголовок
 * визуально по центру по вертикали (line-clamp остаётся на SlideText).
 */
export const SlideTextWrap = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 158px;
  align-self: flex-start;

  ${media.max360} {
    max-width: 150px;
  }

  ${media.max353} {
    max-width: 146px;
  }

  ${media.max344} {
    max-width: 142px;
  }

  ${media.max320} {
    max-width: 128px;
  }
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

  ${media.max540} {
    min-height: 0;
    font-size: 10px;
    /* line-height: 0 ломает -webkit-box и визуально «поднимает» текст к заголовку */
    line-height: 13px;
    overflow: hidden;
    margin: 0;
  }

  ${media.max360} {
    font-size: 10px;
    line-height: 12px;
  }

  ${media.max353} {
    font-size: 9px;
    line-height: 12px;
  }

  ${media.max344} {
    font-size: 9px;
    line-height: 11px;
  }

  ${media.max320} {
    font-size: 8px;
    line-height: 10px;
  }

  ${media.max360} {
    max-width: 150px;
  }

  ${media.max353} {
    max-width: 146px;
  }

  ${media.max344} {
    max-width: 142px;
  }

  ${media.max320} {
    max-width: 128px;
  }
`;

/** Кнопка на слайде: link — переход по ссылке, popup — открытие модалки (как на странице Promos). */
export const SlideButton = styled.button`
  flex-shrink: 0;
  width: 170px;
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

  ${media.max540} {
    width: 110px;
    padding: 10px 12px;
    font-size: 12px;
  }

  ${media.max360} {
    width: 104px;
    padding: 9px 10px;
    font-size: 11px;
    border-radius: 5px;
  }

  ${media.max353} {
    width: 100px;
    padding: 8px 10px;
    font-size: 11px;
  }

  ${media.max344} {
    width: 96px;
    padding: 8px 8px;
    font-size: 10px;
  }

  ${media.max320} {
    width: 86px;
    padding: 6px 8px;
    font-size: 9px;
    border-radius: 4px;
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

  ${media.max430} {
    gap: 4px;
  }
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

/** Затемнённый оверлей: клик закрывает модалку, анимация появления. z-index выше GrandMenuMobile (1200). */
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  padding: max(24px, env(safe-area-inset-top, 0px))
    max(24px, env(safe-area-inset-right, 0px))
    max(24px, env(safe-area-inset-bottom, 0px))
    max(24px, env(safe-area-inset-left, 0px));
  box-sizing: border-box;
  overflow-y: auto;
  overscroll-behavior: contain;
  animation: fadeIn 0.25s ease;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  ${media.max540} {
    padding: max(16px, env(safe-area-inset-top, 0px))
      max(16px, env(safe-area-inset-right, 0px))
      max(16px, env(safe-area-inset-bottom, 0px))
      max(16px, env(safe-area-inset-left, 0px));
  }

  ${media.max360} {
    padding: max(14px, env(safe-area-inset-top, 0px))
      max(14px, env(safe-area-inset-right, 0px))
      max(14px, env(safe-area-inset-bottom, 0px))
      max(14px, env(safe-area-inset-left, 0px));
  }

  ${media.max320} {
    padding: max(12px, env(safe-area-inset-top, 0px))
      max(12px, env(safe-area-inset-right, 0px))
      max(12px, env(safe-area-inset-bottom, 0px))
      max(12px, env(safe-area-inset-left, 0px));
  }
`;

/**
 * Контейнер модалки: высота по контенту (как FooterBlocksAccordion в PreFooterMobile),
 * верхняя граница по вьюпорту — скролл у ModalBody при переполнении.
 */
export const ModalBox = styled.div`
  position: relative;
  width: 100%;
  max-width: min(858px, calc(100vw - 48px));
  height: auto;
  max-height: min(705px, calc(100dvh - 48px));
  min-width: 0;
  min-height: 0;
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

  ${media.max540} {
    max-width: min(355px, calc(100vw - 32px));
    max-height: min(705px, calc(100dvh - 32px));
    border-radius: 12px;
  }

  ${media.max360} {
    max-width: min(330px, calc(100vw - 28px));
    max-height: min(705px, calc(100dvh - 28px));
  }

  ${media.max353} {
    max-width: min(323px, calc(100vw - 28px));
    max-height: min(705px, calc(100dvh - 28px));
  }

  ${media.max344} {
    max-width: min(314px, calc(100vw - 24px));
    max-height: min(705px, calc(100dvh - 24px));
  }

  ${media.max320} {
    max-width: min(290px, calc(100vw - 20px));
    max-height: min(705px, calc(100dvh - 20px));
    border-radius: 10px;
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
  border: 1px solid rgba(125, 125, 126, 1);
  border-radius: 6px;
  color: rgba(125, 125, 126, 1);
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

  ${media.max540} {
    width: 37px;
    height: 37px;
    top: 8px;
    right: 8px;
    font-size: 22px;
  }

  ${media.max360} {
    width: 35px;
    height: 35px;
    top: 7px;
    right: 7px;
    font-size: 21px;
  }

  ${media.max344} {
    width: 34px;
    height: 34px;
  }

  ${media.max320} {
    width: 32px;
    height: 32px;
    top: 6px;
    right: 6px;
    font-size: 19px;
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

  ${media.max540} {
    /* ~43% ширины карточки 355px — пропорции как в макете */
    height: 152px;
    border-radius: 12px 12px 0 0;
  }

  ${media.max360} {
    height: 141px;
    border-radius: 11px 11px 0 0;
  }

  ${media.max353} {
    height: 138px;
  }

  ${media.max344} {
    height: 135px;
  }

  ${media.max320} {
    height: 124px;
    border-radius: 10px 10px 0 0;
  }
`;

/** Фоновое изображение баннера в модалке. */
export const ModalImage = styled.div<{ $imageUrl?: string }>`
  position: absolute;
  inset: 0;
  background-image: ${({ $imageUrl }) =>
    $imageUrl ? `url(${$imageUrl})` : "none"};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  ${media.max540} {
    background-size: auto 100%;
    background-position: center right;
  }
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

  ${media.max540} {
    gap: 6px;
    padding: 10px 12px 12px 14px;
    justify-content: flex-end;
  }

  ${media.max360} {
    gap: 5px;
    padding: 9px 10px 11px 12px;
  }

  ${media.max353} {
    gap: 5px;
    padding: 8px 10px 10px 11px;
  }

  ${media.max344} {
    padding: 8px 9px 10px 11px;
  }

  ${media.max320} {
    gap: 4px;
    padding: 7px 8px 9px 10px;
  }
`;

/** Тело модалки под баннером: описание, CTA-кнопка, блок T&C; единственная прокручиваемая область. */
export const ModalBody = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 24px;
  padding-bottom: calc(32px + env(safe-area-inset-bottom, 0px));
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

  ${media.max540} {
    gap: 12px;
    padding: 16px 16px 20px;
  }

  ${media.max360} {
    gap: 10px;
    padding: 14px 14px 18px;
  }

  ${media.max353} {
    gap: 10px;
    padding: 13px 13px 16px;
  }

  ${media.max344} {
    gap: 9px;
    padding: 12px 12px 16px;
  }

  ${media.max320} {
    gap: 8px;
    padding: 10px 10px 14px;
  }
`;

/** Заголовок в модалке (на баннере или в теле). */
export const ModalTitle = styled.h2`
  max-width: auto;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 900;
  font-size: 45px;
  line-height: 108.02%;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0;

  ${media.max540} {
    max-width: 210px;
    font-size: 20px;
    line-height: 1.08;
  }

  ${media.max360} {
    max-width: 200px;
    font-size: 19px;
  }

  ${media.max353} {
    max-width: 196px;
    font-size: 18px;
  }

  ${media.max344} {
    max-width: 190px;
    font-size: 18px;
  }

  ${media.max320} {
    max-width: 172px;
    font-size: 17px;
    line-height: 1.06;
  }
`;

/** Подзаголовок в модалке. */
export const ModalSubtitle = styled.p`
  max-width: auto;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 32px;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0;

  ${media.max540} {
    font-size: 13px;
    font-weight: 700;
    line-height: 16px;
    max-width: 220px;
  }

  ${media.max360} {
    font-size: 12px;
    line-height: 15px;
    max-width: 210px;
  }

  ${media.max353} {
    font-size: 12px;
    line-height: 14px;
    max-width: 204px;
  }

  ${media.max344} {
    font-size: 11px;
    line-height: 14px;
    max-width: 198px;
  }

  ${media.max320} {
    font-size: 10px;
    line-height: 13px;
    max-width: 180px;
  }
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

  ${media.max540} {
    font-size: 10px;
    line-height: 13px;
    opacity: 0.85;
  }

  ${media.max360} {
    font-size: 9px;
    line-height: 12px;
  }

  ${media.max353} {
    font-size: 9px;
    line-height: 12px;
  }

  ${media.max344} {
    font-size: 9px;
    line-height: 11px;
  }

  ${media.max320} {
    font-size: 8px;
    line-height: 11px;
  }
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

  ${media.max540} {
    font-size: 12px;
    margin: 0 0 0 0;
  }

  ${media.max360} {
    font-size: 11px;
    line-height: 1.42;
  }

  ${media.max353} {
    font-size: 11px;
  }

  ${media.max344} {
    font-size: 10px;
    line-height: 1.4;
  }

  ${media.max320} {
    font-size: 10px;
    line-height: 1.35;
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

  ${media.max540} {
    padding: 8px 18px;
    font-size: 12px;
    border-radius: 6px;
    margin-top: 2px;
  }

  ${media.max360} {
    padding: 7px 16px;
    font-size: 11px;
    border-radius: 5px;
  }

  ${media.max353} {
    padding: 7px 14px;
    font-size: 11px;
  }

  ${media.max344} {
    padding: 6px 12px;
    font-size: 10px;
  }

  ${media.max320} {
    padding: 6px 10px;
    font-size: 9px;
    border-radius: 4px;
    margin-top: 1px;
  }
`;

/** Обёртка раскрывающегося блока Terms & Conditions. */
export const ToggleBlock = styled.div`
  border-radius: 6px;
  overflow: hidden;

  ${media.max540} {
    border-radius: 8px;
    margin-top: 4px;
  }
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

  ${media.max540} {
    min-height: 48px;
    height: auto;
    margin-bottom: 0;
    padding: 12px 14px;
    font-size: 12px;
    line-height: 15px;
    border-radius: 8px;
  }

  ${media.max360} {
    min-height: 44px;
    padding: 11px 12px;
    font-size: 11px;
    line-height: 14px;
  }

  ${media.max353} {
    min-height: 42px;
    padding: 10px 12px;
    font-size: 11px;
  }

  ${media.max344} {
    min-height: 40px;
    padding: 10px 11px;
    font-size: 10px;
    line-height: 13px;
  }

  ${media.max320} {
    min-height: 38px;
    padding: 8px 10px;
    font-size: 10px;
    line-height: 12px;
    border-radius: 6px;
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

  ${media.max540} {
    padding: 12px 14px 14px;
    font-size: 11px;
    line-height: 16px;
    border-radius: 0 0 8px 8px;
  }

  ${media.max360} {
    padding: 11px 12px 12px;
    font-size: 10px;
    line-height: 15px;
  }

  ${media.max353} {
    padding: 10px 12px 12px;
    font-size: 10px;
    line-height: 14px;
  }

  ${media.max344} {
    padding: 10px 11px 11px;
    font-size: 10px;
    line-height: 14px;
  }

  ${media.max320} {
    padding: 8px 10px 10px;
    font-size: 9px;
    line-height: 13px;
    border-radius: 0 0 6px 6px;
  }
`;
