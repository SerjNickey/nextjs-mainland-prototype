import styled from "styled-components";

// -----------------------------------------------------------------------------
// Component styles
// -----------------------------------------------------------------------------

/** Обёртка для скрытия без размонтирования: анимация продолжает играть. */
export const LoaderOverlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 9999;
  visibility: ${(p) => (p.$visible ? "visible" : "hidden")};
  pointer-events: ${(p) => (p.$visible ? "auto" : "none")};
`;

export const StyledLoader = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  background-color: #0a0a0a;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #1b1b1b;

  span {
    max-width: 90%;
    text-align: center;
  }
`;

export const LottieWrap = styled.div<{ $size: number }>`
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  flex-shrink: 0;
`;
