import styled from "styled-components";
import { media } from "../../../../styles/breakpoints";

export const Wrapper = styled.section`
  width: 100%;
  max-width: 375px;
  margin: 0 auto 40px;
  padding: 0 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
`;

export const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

export const Title = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  font-size: 20px;
  line-height: 1.2;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0;
`;

export const Viewport = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 343px;
  margin: 0 auto;
`;

export const Container = styled.div`
  display: flex;
  margin-left: -15px;
`;

export const Slide = styled.div`
  flex: 0 0 100%;
  min-width: 0;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding-left: 15px;
`;

/** Одна карточка: изображение сверху, заголовок, описание, кнопка на всю ширину */
export const Card = styled.article`
  width: 100%;
  max-width: 343px;
  background: #141414;
  border: 1px solid #292929;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
  padding: 15px;
`;

export const ImageWrap = styled.div`
  width: 100%;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  overflow: hidden;
  background: #000000;
  margin-bottom: 15px;
`;

export const CardImage = styled.div<{ $imageUrl?: string }>`
  width: 100%;
  aspect-ratio: 343 / 180;
  min-height: 140px;
  background-color: #242424;
  background-image: ${({ $imageUrl }) =>
    $imageUrl ? `url(${JSON.stringify($imageUrl)})` : "none"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const CardBody = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  min-height: 0;
`;

export const CardTitle = styled.h3`
  font-weight: 800;
  font-size: 16px;
  line-height: 20px;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0;
`;

export const CardDescription = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
  letter-spacing: 0.01px;
  color: #ffffff;
  margin: 0;

  p {
    margin: 0 0 8px 0;
  }
  p:last-child {
    margin-bottom: 0;
  }
`;

export const MoreDetailsButton = styled.a`
  display: block;
  width: 100%;
  box-sizing: border-box;
  margin-top: 4px;
  padding: 12px 24px;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  color: #ffffff;
  background: #474747;
  border: none;
  border-radius: 6px;
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

/** Как в Promos: обёртка точек под каруселью. */
export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

/** Ряд точек — как в Promos (gap 8px, на max430 — 4px). */
export const Dots = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  ${media.max430} {
    gap: 4px;
  }
`;

/** Одна точка — как в Promos / BannerSlider. */
export const DotButton = styled.button<{ $isActive: boolean }>`
  width: ${(props) => (props.$isActive ? "8px" : "6px")};
  height: ${(props) => (props.$isActive ? "8px" : "6px")};
  border-radius: 1px;
  border: none;
  padding: 0;
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
