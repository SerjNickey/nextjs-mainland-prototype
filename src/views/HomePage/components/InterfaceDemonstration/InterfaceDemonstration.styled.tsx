import styled, { keyframes } from "styled-components";
import { media } from "../../../../styles/breakpoints";

/** Анимация плавного смещения фона превью слева направо и обратно */
const foregroundPan = keyframes`
  from {
    background-position: bottom left, bottom  center, top center;
  }
  to {
    background-position: bottom right, bottom  center, top center;
  }
`;

/** Анимация появления блока деталей (fade + лёгкий сдвиг снизу) */
const detailsFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/** Секция-обёртка блока «Демонстрация интерфейса»: центрирование, отступы, колонка */
export const Wrapper = styled.section`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto 96px auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

/** Заголовок секции: 48px, bold, uppercase, белый, по центру */
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

/** Контейнер контента: сетка (левая колонка + превью), колонки по высоте равны, тёмный фон */
export const Content = styled.div`
  display: grid;
  grid-template-columns: 636px 724px;
  gap: 32px;
  padding: 24px;
  align-items: stretch;
  background: rgba(27, 27, 27, 0.7);
  border-radius: 16px;

  ${media.max1024} {
    grid-template-columns: 1fr;
  }
`;

/** Левая колонка: сетка карточек и блок деталей, блок деталей прижат к низу (margin-top: auto) */
export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 0;
`;

/** Сетка карточек выбора режима: 3 колонки по 206.5px, строки по 120px, отступы 8px */
export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 206.5px);
  grid-auto-rows: 120px;
  gap: 8px;
  width: 636px;
  height: 248px;

  ${media.max600} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
    height: auto;
  }
`;

/** Карточка режима: кнопка с заголовком, иконкой (::before) и красным свечением при активном/фокусе (::after) */
export const Card = styled.button<{ $isActive: boolean; $iconUrl?: string }>`
  width: 207px;
  height: 120px;
  border-radius: 6px;
  border: ${(props) =>
    props.$isActive
      ? "2px solid rgba(215, 0, 34, 1)"
      : "2px solid rgba(36, 36, 36, 1)"};
  box-sizing: border-box;
  background-color: ${(props) =>
    props.$isActive ? "rgba(34, 34, 34, 0.7)" : "rgba(36, 36, 36, 1)"};

  padding-top: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
  cursor: pointer;
  position: relative;
  transition:
    border-color 0.4s ease,
    color 0.4s ease,
    background-color 0.4s ease;
  color: ${(props) => (props.$isActive ? "#ffffff" : "#6f6f6f")};

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 207px;
    height: 120px;
    transform: translateX(-50%);
    background-image: ${(props) =>
      props.$iconUrl ? `url("${encodeURI(props.$iconUrl)}")` : "none"};
    background-repeat: no-repeat;
    background-position: center;
    background-size: 207px 120px;
    z-index: 1;
    pointer-events: none;
    opacity: ${(props) => (props.$isActive ? 1 : 0.5)};
    transition: opacity 0.4s ease;
  }

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -10px;
    width: 72px;
    height: 72px;
    transform: translateX(-50%);
    border-radius: 50%;
    background: rgba(215, 0, 34, 0.3);
    filter: blur(10px);
    opacity: 0;
    transition: opacity 0.2s ease;
    z-index: 0;
    pointer-events: none;
  }

  &:hover::after,
  &:focus-visible::after,
  ${(props) => props.$isActive && "&::after"} {
    opacity: 1;
  }

  ${media.max600} {
    height: 110px;
  }
`;

/** Подпись на карточке режима: 16px, bold, uppercase, цвет наследуется от карточки */
export const CardTitle = styled.span`
  font-family: "Montserrat";
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  text-transform: uppercase;
  text-align: center;
  color: inherit;
  position: relative;
  z-index: 2;
`;

/** Блок деталей выбранного режима: заголовок + текст, анимация появления detailsFade */
export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: auto;
  animation: ${detailsFade} 0.4s ease;
`;

/** Заголовок блока деталей: 22px, extra bold, uppercase, белый */
export const DetailsTitle = styled.h3`
  font-family: "Montserrat";
  font-weight: 800;
  font-size: 22px;
  text-transform: uppercase;
  color: #ffffff;
`;

/** Текст блока деталей: 14px, regular, серый; параграфы с отступом снизу */
export const DetailsText = styled.div`
  font-family: "Montserrat";
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  color: #d0d0d0;

  p {
    margin: 0 0 6px 0;
  }
`;

/** Правая колонка: контейнер превью фиксированной ширины 724px */
export const RightColumn = styled.div`
  width: 724px;
`;

/** Превью интерфейса: несколько фонов из $backgroundUrls, анимация foregroundPan (72s), тёмный фон */
export const Preview = styled.div<{ $backgroundUrls?: string[] }>`
  width: 724px;
  height: 592px;
  border-radius: 8px;
  background-color: #1b1b1b;
  background-image: ${(props) => {
    const urls = (props.$backgroundUrls ?? []).filter(Boolean);
    if (urls.length === 0) {
      return "none";
    }
    return urls.map((url) => `url("${encodeURI(url)}")`).join(", ");
  }};
  background-size:
    auto auto,
    100% 100%,
    auto auto;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  animation: ${foregroundPan} 72s linear infinite alternate;
`;
