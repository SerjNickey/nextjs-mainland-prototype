import styled from "styled-components";
import { media } from "../../../../styles/breakpoints";

export const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  width: 375px;
  height: 200px;
  margin: 0 auto 40px auto;
  padding: 20px 25px;

  & > img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    z-index: 0;
    pointer-events: none;
  }

  & > *:not(img) {
    position: relative;
    z-index: 1;
  }

  ${media.max360} {
    width: 360px;
    height: 192px;
    padding: 20px 20px;
  }
  ${media.max353} {
    width: 353px;
    height: 188px;
  }
  ${media.max344} {
    width: 344px;
    height: 183px;
    padding: 15px 15px;
  }
  ${media.max320} {
    width: 320px;
    height: 171px;
  }
`;

export const ButtonWrapper = styled.div`
  && > button {
    height: auto;
    min-height: 0;
    line-height: 1.2;

    ${media.max540} {
      padding: 15px 20px;
      font-size: 12px;
    }
  }
`;