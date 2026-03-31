import styled from "styled-components";
import { media } from "../../styles/breakpoints";

export const FirstWrapper = styled.div`
  max-width: 450px;
  width: 100%;
  height: auto;
  padding: 0 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const Wrapper = styled.div`
  box-sizing: border-box;
  max-width: 450px;
  width: 100%;
  height: auto;
  border: 1px solid #84858a;
  border-radius: 6px;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 10px;
  gap: 7px;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 120%;
  color: #ffffff;
  text-transform: none;
  text-align: left;

  & img {
    width: 21px;
    height: 24px;
  }

  & span {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const StyledBtn = styled.button<{ isRed?: boolean }>`
  max-width: 387px;
  width: 100%;
  height: 44px;
  background: ${({ isRed }) => (isRed ? "rgba(215, 0, 34, 1)" : "#5B5B5B")};
  border-radius: 6px;
  border: none;
  outline: none;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px 20px;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  color: #ffffff;
  text-transform: uppercase;

  &:disabled {
    background-color: rgba(215, 0, 34, 0.6);
    cursor: not-allowed;
  }

  ${media.max430} {
    font-size: 13px;
  }
  ${media.max414} {
    font-size: 12px;
  }
  ${media.max393} {
    font-size: 11px;
  }
  ${media.max360} {
    font-size: 10px;
  }
  ${media.max344} {
    font-size: 9px;
  }
  ${media.max320} {
    font-size: 8px;
  }
`;

export const MiddlePoint = styled.div`
  max-width: 390px;
  width: 100%;
  height: 1px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 5px;

  padding: 0px;
  margin: 15px auto;
`;
export const MiddleLine = styled.div<{ isReversed?: boolean }>`
  max-width: 110px;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, #181818 0%, #84858a 50%);

  order: ${({ isReversed }) => (isReversed ? 2 : 0)};

  transform: rotate(${({ isReversed }) => (isReversed ? 180 : 0)}deg);
`;
export const MiddleText = styled.div`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #84858a;
  text-transform: none;

  flex: none;
  order: 1;

  ${media.max430} {
    font-size: 10px;
  }
`;
