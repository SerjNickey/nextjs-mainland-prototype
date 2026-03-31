import styled from "styled-components";
import { media } from "../../styles/breakpoints";

export const Wrapper = styled.header`
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 1s ease;
  cursor: pointer;

  ${media.max600} {
    height: 48px;
  }
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
