import styled from "styled-components";
import { media } from "../../styles/breakpoints";
import back from "../../assets/images/pages/404Page/Ellipse.webp";

export const Wrapper = styled.section`
  width: 100%;
  height: auto;
  margin: 0 auto;
  max-width: 3840px;

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
  ${media.min1463} {
    zoom: 0.762; /* 1463×823 */
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
  ${media.min1707} {
    zoom: 0.889; /* 1707×960 */
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

export const Content = styled.div`
  max-width: 1440px;
  width: 100%;
  height: auto;

  margin: 50px auto 0 auto;

  background-color: rgba(10, 10, 10, 1);
  background-image: url(${back});
  background-position: top center;
  background-size: 100% auto;
  background-repeat: no-repeat;
`;

export const ErrorCode = styled.div`
  padding-top: 100px;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 400px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;

  ${media.max1280} {
    padding-top: 50px;
    font-size: 300px;
  }
  ${media.max1024} {
    padding-top: 25px;
    font-size: 200px;
  }
  ${media.max768} {
    padding-top: 10px;
    font-size: 150px;
  }
  ${media.max600} {
    padding-top: 20px;
    font-size: 100px;
  }
  ${media.max375} {
    padding-top: 0px;
  }
`;
export const ErrorText = styled.div`
  max-width: 100%;
  width: 100%;
  height: 20px;
  margin: 0 auto;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  text-transform: uppercase;

  color: #ffffff;

  ${media.max375} {
    max-width: 240px;
    height: auto;
    font-size: 24px;
  }
`;
