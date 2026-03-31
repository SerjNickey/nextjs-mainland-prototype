import styled from "styled-components";
import { media } from "../../styles/breakpoints";

export const Wrapper = styled.header`
  width: 100%;
  height: 48px;
  display: none;
  overflow: hidden;
  flex-shrink: 0;

  ${media.max430} {
    display: block;
    position: sticky;
    top: 0;
    z-index: 1195;
  }
`;

export const HeaderSlide = styled.div<{ $hidden?: boolean }>`
  transform: translateY(${({ $hidden }) => ($hidden ? "-100%" : "0")});
  transition: transform 0.25s ease-out;
  will-change: transform;
  pointer-events: ${({ $hidden }) => ($hidden ? "none" : "auto")};
  cursor: pointer;
`;

export const Container = styled.div<{ logoSrc: string }>`
  width: 100%;
  height: 48px;

  background: #242424;
  background-image: url(${({ logoSrc }) => logoSrc});
  background-size: 171px 19px;
  background-position: center;
  background-repeat: no-repeat;

  border-bottom: 1px solid #404147;
`;
