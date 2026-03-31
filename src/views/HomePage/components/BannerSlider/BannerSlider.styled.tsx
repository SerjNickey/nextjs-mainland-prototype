import styled from "styled-components";
import { media } from "../../../../styles/breakpoints";

export const Wrapper = styled.section`
  width: 100%;
  max-width: 100%;
  margin-top: 15px;
  margin-bottom: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow-x: hidden;
`;

export const Viewport = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: min(1920px, 100%);

  /* Фейды по макету; оверлей на 1px шире/ниже — убирает белую полоску по краю (субпиксель) */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: -2px;
    bottom: -2px;
    z-index: 1;
    pointer-events: none;
    background:
      /* Top: 180deg transparent→#0A0A0A + flip = непрозрачный сверху */
      linear-gradient(to bottom, #0a0a0a 0%, rgba(10, 10, 10, 0) 100%),
      /* Bottom: 180deg transparent→#0A0A0A без flip */
      linear-gradient(to top, #0a0a0a 0%, rgba(10, 10, 10, 0) 100%),
      /* Right: 90deg transparent→#0A0A0A 103.29% */
      linear-gradient(90deg, rgba(10, 10, 10, 0) 0%, #0a0a0a 103.29%),
      /* Left: 90deg #0A0A0A→transparent 96.93% */
      linear-gradient(90deg, #0a0a0a 0%, rgba(10, 10, 10, 0) 96.93%);
    background-size:
      100% 50px,
      100% 50px,
      700px 100%,
      400px 100%;
    background-position:
      0 0,
      0 100%,
      100% 0,
      0 0;
    background-repeat: no-repeat;
  }

  ${media.max600} {
    &::after {
      background-size:
        100% 80px,
        100% 80px,
        min(707px, 100%) 100%,
        min(1072px, 100%) 100%;
    }
  }
`;

export const Container = styled.div`
  display: flex;
`;

export const Slide = styled.div`
  flex: 0 0 100%;
  min-width: 0;
`;

export const SlideContent = styled.div<{ $backgroundUrl?: string }>`
  position: relative;
  height: 508px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 10px;
  padding: 32px;
  color: #ffffff;
  background-color: #242424;
  background-image: ${(props) =>
    props.$backgroundUrl ? `url(${props.$backgroundUrl})` : "none"};
  background-size: auto 100%;
  background-position: center left;
  background-repeat: no-repeat;

  ${media.max1024} {
    height: 600px;
    padding: 24px;
  }

  ${media.max600} {
    height: 420px;
    padding: 20px;
  }
`;

export const Title = styled.h2`
  position: relative;
  z-index: 1;
  font-family: "Montserrat";
  font-weight: 800;
  font-size: 36px;
  text-transform: uppercase;
  color: #ffffff;

  ${media.max600} {
    font-size: 24px;
  }
`;

export const Subtitle = styled.p`
  position: relative;
  z-index: 1;
  font-family: "Montserrat";
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
  max-width: 520px;

  ${media.max600} {
    font-size: 14px;
  }
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Dots = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

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
