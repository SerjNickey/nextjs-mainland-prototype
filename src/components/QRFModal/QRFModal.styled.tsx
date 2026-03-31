import styled, { keyframes } from "styled-components";
import { media } from "../../styles/breakpoints";
import closeIcon from "../../assets/images/PreFooter/close_2x.webp";
import langIcon from "../../assets/images/QRFModal/lang_2x.webp";
import enLangIcon from "../../assets/images/QRFModal/lang_en_2x.webp";
import backIcon from "../../assets/images/QRFModal/back_2x.webp";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
`;

export const ModalContainer = styled.div`
  background: #181818;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: auto;
  height: auto;
  padding: 0 0 30px 0;
`;

// Заголовок модального окна
export const ModalHeader = styled.div<{ isVisible: boolean }>`
  height: 75px;
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  color: #fff;
`;
export const ModalHeaderTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  justify-self: end;

  ${media.max430} {
    font-size: 15px;
  }
  ${media.max414} {
    font-size: 14px;
  }
  ${media.max393} {
    font-size: 13px;
  }
  ${media.max375} {
    font-size: 12px;
  }
  ${media.max360} {
    font-size: 11px;
  }
  ${media.max344} {
    font-size: 10px;
  }
  ${media.max320} {
    font-size: 9px;
  }
`;

// Содержимое модального окна с прокруткой
export const ModalContent = styled.div`
  // flex-grow: 1;
`;

// Кнопка закрытия
export const CloseButton = styled.button`
  width: 44px;
  height: 44px;
  margin-top: 10px;
  margin-right: 10px;
  background: url(${closeIcon});
  background-size: contain;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;

  ${media.max393} {
    width: 33px;
    height: 33px;
  }
`;

export const DifButton = styled.button<{
  currentPage?: string;
  yourLang?: string;
}>`
  width: 44px;
  height: 44px;
  margin-top: 10px;
  margin-left: 10px;
  background: url(${({ currentPage, yourLang }) =>
    currentPage === "First"
      ? yourLang === "ru"
        ? langIcon
        : enLangIcon
      : backIcon});
  background-size: contain;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;

  ${media.max393} {
    width: 33px;
    height: 33px;
  }
`;

export const TitleContainer = styled.div`
  padding-top: 25px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: #ffffff;
  text-transform: none;

  ${media.max320} {
    font-size: 18px;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimatedModalContainer = styled(ModalContainer)`
  animation: ${fadeIn} 0.3s ease-out;
  max-height: 90vh;
  overflow-y: auto;

  /* Скейл под разрешения 768×1024 … 5120 и шире */
  ${media.min768} {
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
    zoom: 0.667; /* 1280×…, 1920×1200 @ 150% */
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
    zoom: 0.896; /* 1720×720 */
  }
  ${media.min1920} {
    zoom: 1;
  }
  ${media.min1965} {
    zoom: 1.023; /* 1965×822 */
  }
  ${media.min2048} {
    zoom: 1.067; /* 2048×1280 */
  }
  ${media.min2293} {
    zoom: 1.194; /* 2293×960 */
  }
  ${media.min2560} {
    zoom: 1.333; /* 2560×1600 */
  }
  ${media.min2752} {
    zoom: 1.433; /* 2752×1152 */
  }
  ${media.min3440} {
    zoom: 1.792; /* 3440×1440 */
  }
  ${media.min3840} {
    zoom: 2; /* 3840/1920 */
  }
  ${media.min5120} {
    zoom: 2.667; /* 21:9, 32:9 */
  }

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;
