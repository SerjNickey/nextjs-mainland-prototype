import styled from "styled-components";
import { media } from "../../styles/breakpoints";
import back_1440 from "../../assets/images/LandingPage/back_1440_3x.webp";

/** Внешняя обёртка без overflow, чтобы StickyHeaderWrap не ломался из‑за overflow-x на Wrapper. */
export const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0 auto;
  max-width: 3840px;

  /* Зум под разрешения: layout 1920px, zoom = ширина/1920 */
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
    zoom: 2; /* 3840/1920 */
  }
  ${media.min5120} {
    zoom: 2.667; /* 21:9 5120×2160, 32:9 5120×1440 */
  }
`;

export const Wrapper = styled.div`
  flex: 1;
  max-width: 3840px;
  width: 100%;
  min-width: 0;
  height: auto;
  margin: 0 auto;
  overflow-x: hidden;

  background-image: url(${back_1440});
  background-position: top center;
  background-size: 100% auto;
  background-repeat: no-repeat;

  ${media.max712} {
    background-image: none;
  }
  ${media.max540} {
    display: none;
  }
`;

export const MobileWrapper = styled.div`
  display: none;

  ${media.max540} {
    display: block;
  }
`;
export const LocalWrapper = styled.div`
  padding: 0 15px;
`;

export const Status = styled.div`
  margin: 20px auto 0;
  padding: 8px 16px;
  font-size: 14px;
  color: #ffffff;
  background: rgba(10, 10, 10, 0.6);
  border-radius: 999px;
  max-width: 320px;
  text-align: center;
`;

/** Десктопный BannerSlider */
export const BannerSliderDesktopOnly = styled.div`
  display: block;

  ${media.max430} {
    display: none;
  }
`;

/** Секция баннера: слайдер + поверх форма в контейнере 1440px по центру */
export const BannerSection = styled.section`
  position: relative;
  width: 100%;
  //  min-height: 600px;
`;

/** Слой ровно по области слайда: top/height совпадают с BannerSlider (padding 15px + высота SlideContent). Форма центрируется по слайду через align-items: center. */
export const BannerFormOverlay = styled.div`
  position: absolute;
  top: 15px;
  left: 0;
  right: 0;
  height: 508px;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  pointer-events: none;

  ${media.max1024} {
    height: 600px;
  }

  ${media.max600} {
    height: 420px;
    padding: 16px 12px;
  }

  ${media.max430} {
    height: 200px;
    padding: 0 16px;
  }
`;

/** Внутренний контейнер 1440px, высота 100% = высота оверлея (слайда). */
export const BannerFormOverlayInner = styled.div`
  position: relative;
  width: 100%;
  max-width: 1440px;
  height: 100%;
  pointer-events: none;
`;

/** Обёртка формы: справа по горизонтали, по центру по вертикали. */
export const BannerFormCard = styled.div`
  position: absolute;
  top: 50%;
  right: 15px;
  left: auto;
  transform: translateY(-50%);
  max-width: 420px;
  width: 100%;
  border-radius: 12px;
  // box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  overflow: visible;
  pointer-events: auto;

  ${media.max600} {
    right: 12px;
    left: 12px;
    width: auto;
    max-width: 100%;
  }
`;
