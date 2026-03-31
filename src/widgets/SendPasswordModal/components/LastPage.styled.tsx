import styled from "styled-components";
import { media } from "../../../styles/breakpoints";

export const SuccessContainer = styled.div`
  max-width: 375px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding-top: 30px;
`;

export const SuccessFirst = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
export const SuccessTitle = styled.div`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  color: #ffffff;
`;
export const SuccessText = styled.div`
  width: 100%;
  height: auto;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 15px;
  color: #ffffff;
  text-align: center;
  text-transform: none;

  ${media.max393} {
    font-size: 13px;
  }
  ${media.max375} {
    font-size: 12px;
  }
  ${media.max353} {
    font-size: 11px;
  }
  ${media.max320} {
    font-size: 10px;
  }
`;

export const SuccessBanner = styled.div`
  width: 100%;
  height: auto;

  & img {
    width: 100%;
    height: auto;
  }
`;

export const DownloadAppText = styled.div`
  max-width: 390px;
  width: 100%;
  height: auto;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 15px;
  color: #84858a;
  text-align: center;
  text-transform: none;

  ${media.max390} {
    font-size: 13px;
  }
  ${media.max360} {
    font-size: 12px;
  }
  ${media.max344} {
    font-size: 11px;
  }
  ${media.max320} {
    font-size: 10px;
  }
`;
