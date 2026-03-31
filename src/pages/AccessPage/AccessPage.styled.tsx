/**
 * Стили страницы Access (ограничение доступа по региону).
 * Макет: тёмный космический фон, центрированный контент, только логотип в шапке.
 */
import styled from "styled-components";
import { media } from "../../styles/breakpoints";

export const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0 auto;
  max-width: 3840px;
  background: #0a0a0a;

  ${media.min768} {
    max-width: 1920px;
    zoom: 0.4; /* 768×1024 */
  }
  ${media.min800} {
    zoom: 0.417; /* 800×600 */
  }
  ${media.min960} {
    zoom: 0.5; /* 960×600, 1920×1200 @ 200% */
  }
  ${media.min1024} {
    zoom: 0.533; /* 1024×768 */
  }
  ${media.min1097} {
    zoom: 0.571; /* 1097×617/686, 1920×1080/1200 @ 175% */
  }
  ${media.min1152} {
    zoom: 0.6; /* 1152×864 */
  }
  ${media.min1176} {
    zoom: 0.613; /* 1176×664 */
  }
  ${media.min1280} {
    zoom: 0.667; /* 1280×720/768/800/960/1024, 1920×1200 @ 150% */
  }
  ${media.min1360} {
    zoom: 0.708; /* 1360×768 */
  }
  ${media.min1366} {
    zoom: 0.713; /* 1366×768 */
  }
  ${media.min1440} {
    zoom: 0.75; /* 1440×1080 */
  }
  ${media.min1536} {
    zoom: 0.8; /* 1536×864/960, 1920×1080/1200 @ 125% */
  }
  ${media.min1600} {
    zoom: 0.833; /* 1600×900/1024/1200 */
  }
  ${media.min1680} {
    zoom: 0.875; /* 1680×1050 */
  }
  ${media.min1720} {
    zoom: 0.896; /* 1720×720, 3440×1440 @ 200% */
  }
  ${media.min1920} {
    zoom: 1; /* 1920×1080 */
  }
  ${media.min1965} {
    zoom: 1.023; /* 1965×822, 3440×1440 @ 175% */
  }
  ${media.min2048} {
    zoom: 1.067; /* 2048×1280 */
  }
  ${media.min2293} {
    zoom: 1.194; /* 2293×960, 3440×1440 @ 150% */
  }
  ${media.min2560} {
    zoom: 1.333; /* 2560×1600 */
  }
  ${media.min2752} {
    zoom: 1.433; /* 2752×1152, 3440×1440 @ 125% */
  }
  ${media.min3440} {
    zoom: 1.792; /* 3440×1440 @ 100% */
  }
  ${media.min3840} {
    zoom: 2;
  }
  ${media.min5120} {
    zoom: 2.667; /* 21:9, 32:9 */
  }
`;

export const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 48px 24px 80px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 120px);
  background-color: #0a0a0a;
  background-image: none;
  background-size: 100% 100%;
  background-repeat: no-repeat;

  ${media.max768} {
    padding: 32px 16px 60px;
    min-height: calc(100vh - 100px);
  }
`;

export const Main = styled.main`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
`;

export const AccessTitle = styled.h1`
  margin: 0 0 28px;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 40px;
  line-height: 1.35;
  line-height: 49px;
  text-align: center;
  text-transform: uppercase;
  color: #fff;

  ${media.max600} {
    font-size: 22px;
    margin-bottom: 20px;
  }
`;

export const AccessSubtitle = styled.p`
  margin: 0 0 32px;
  font-family: "Montserrat", sans-serif;
  ont-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;

  ${media.max600} {
    font-size: 15px;
    margin-bottom: 24px;
  }
`;

export const AccessText = styled.div`
  margin: 0 0 40px;
  text-align: left;
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;

  ul {
    margin: 0;
    padding-left: 1.5em;
    list-style: none;
  }
  li {
    position: relative;
    margin: 0 0 16px;
    padding-left: 0.5em;
  }
  li::before {
    content: "•";
    position: absolute;
    left: -1em;
    color: #fff;
    font-weight: 700;
  }
  strong,
  b {
    font-weight: 700;
    color: #fff;
  }
  a {
    color: #d70022;
    text-decoration: none;
    font-weight: 600;
  }
  a:hover {
    text-decoration: underline;
  }
`;

export const AccessHelp = styled.div`
  margin-top: 40px;
  padding-top: 32px;
  text-align: center;
`;

export const AccessHelpTitle = styled.h2`
  margin: 0 0 12px;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 20px;
  color: #ffffff;
`;

export const AccessHelpSubtitle = styled.p`
  margin: 0 0 8px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: #ffffff;
`;

export const AccessHelpEmail = styled.a`
  display: inline-block;
  margin-top: 4px;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #d70022;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
