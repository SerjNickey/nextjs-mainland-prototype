import styled from "styled-components";

/** Высота только Header (логотип). Не меняется — скрытие через transform, без скачка страницы и скролла. */
const HEADER_BAR_HEIGHT = 48;

/** Обёртка: фиксированная высота, overflow hidden. Layout не меняется. */
export const HeaderHideWrap = styled.div`
  width: 100%;
  height: ${HEADER_BAR_HEIGHT}px;
  overflow: hidden;
  flex-shrink: 0;
`;

/** Скрытие через translateY + transition. Высота страницы не меняется → скролл не скачет. */
export const HeaderSlide = styled.div<{ $hidden?: boolean }>`
  transform: translateY(${({ $hidden }) => ($hidden ? "-100%" : "0")});
  transition: transform 0.25s ease-out;
`;

/** Обёртка GrandMenu: при скрытом хедере сдвигается вверх в зону хедера (только визуально, layout не меняется). */
export const GrandMenuWrap = styled.div<{ $headerHidden?: boolean }>`
  transform: translateY(
    ${({ $headerHidden }) => ($headerHidden ? `-${HEADER_BAR_HEIGHT}px` : "0")}
  );
  transition: transform 0.25s ease-out;
`;

/** Шапка (Header + GrandMenu): position sticky. Скрывается только Header по скроллу, GrandMenu всегда видим. */
export const StickyHeaderWrap = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
