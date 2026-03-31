import styled from "styled-components";
import { media } from "../../../../styles/breakpoints";

export const Wrapper = styled.section`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;

  text-align: center;
  box-sizing: border-box;

  ${media.max768} {
    padding: 32px 16px 40px;
  }
`;

export const Title = styled.h1`
  max-width: 1250px;
  margin: 100px auto 32px auto;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 60px;
  line-height: 73px;
  text-align: center;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #ffffff;

  ${media.max768} {
    font-size: 22px;
    margin-bottom: 24px;
  }
`;

export const Intro = styled.div`
  max-width: 950px;
  margin: 0 auto;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  text-align: center;

  p {
    margin: 0 0 16px;
  }
  p:last-child {
    margin-bottom: 0;
  }

  ${media.max768} {
    font-size: 14px;
  }
`;
