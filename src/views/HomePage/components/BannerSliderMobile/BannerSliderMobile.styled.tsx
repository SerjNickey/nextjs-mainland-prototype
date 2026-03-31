import styled from "styled-components";

/** Мобильный баннер: только слайдер, без фейдов по краям */
export const Wrapper = styled.section`
  width: 100%;
  max-width: 100%;
  margin-top: 15px;
  margin-bottom: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  overflow-x: hidden;
`;

export const Viewport = styled.div`
  position: relative;
  overflow: hidden;
  width: min(343px, calc(100vw - 32px));
  height: 200px;
  border-radius: 6px;
`;

export const Container = styled.div`
  display: flex;
  height: 100%;
`;

export const Slide = styled.div`
  flex: 0 0 100%;
  min-width: 0;
  height: 100%;
`;

export const SlideContent = styled.div<{ $backgroundUrl?: string }>`
  position: relative;
  width: 100%;
  height: 200px;
  background-color: #242424;
  background-image: ${(props) =>
    props.$backgroundUrl ? `url(${props.$backgroundUrl})` : "none"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Dots = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

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
    transform: scale(1.05);
  }
`;
