import styled, { keyframes } from "styled-components";
import { media } from "../../styles/breakpoints";
import closeIcon from "../../assets/images/PreFooter/close_2x.webp";
import langIcon from "../../assets/images/QRFModal/lang_2x.webp";
import backIcon from "../../assets/images/QRFModal/back_2x.webp";

/** Оверлей: затемнение + размытие фона (как в QRFModal и Promos); контент по центру */
export const ModalPositioner = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;

export const ModalContainer = styled.div`
  background: #181818;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: auto;
  height: auto;
  padding: 0 30px 35px 30px;
`;

// Заголовок модального окна. $inline = true — не в модалке (например, в форме регистрации), height: auto
export const ModalHeader = styled.div<{
  isVisible: boolean;
  $inline?: boolean;
}>`
  height: ${({ $inline }) => ($inline ? "45px" : "75px")};
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
`;

// Содержимое модального окна с прокруткой
export const ModalContent = styled.div`
  max-width: 390px;
  width: 100%;
  // flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

// Кнопка закрытия
export const CloseButton = styled.button`
  width: 44px;
  height: 44px;
  margin-top: 10px;
  margin-right: -20px;
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

export const DifButton = styled.button<{ currentPage?: string }>`
  width: 44px;
  height: 44px;
  margin-top: 10px;
  margin-left: -20px;
  background: url(${({ currentPage }) =>
    currentPage === "First" ? langIcon : backIcon});
  background-size: contain;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;

  ${media.max393} {
    width: 33px;
    height: 33px;
  }
`;

export const TitleContainer = styled.div<{ $inline?: boolean }>`
  width: 100%;
  padding-top: ${({ $inline }) => ($inline ? "0" : "25px")};
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: #ffffff;
  text-transform: none;
  text-align: center;
  margin-top: -4px;

  ${media.max430} {
    font-size: 19px;
  }
  ${media.max414} {
    font-size: 18px;
  }
  ${media.max393} {
    font-size: 17px;
  }
  ${media.max375} {
    font-size: 16px;
  }
  ${media.max360} {
    font-size: 15px;
  }
  ${media.max344} {
    font-size: 14px;
  }
  ${media.max320} {
    font-size: 13px;
  }
`;

export const DescriptionText = styled.div`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #84858a;
  text-align: center;
`;

export const InputWrapper = styled.div`
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;

  & input {
    max-width: 100%;
    box-sizing: border-box;
  }

  & span {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 145%;
    color: #84858a;
  }
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
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
  // Ограничиваем максимальную высоту модального окна
  max-height: 90vh;
  overflow-y: auto;

  // Скрываем скроллбар для браузеров WebKit
  &::-webkit-scrollbar {
    display: none;
  }

  // Скрываем скроллбар для Firefox
  scrollbar-width: none;
`;

/** Обёртка блока сброса пароля (без модалки — в потоке страницы) */
export const BlockWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 24px 16px;
`;

/** Контейнер контента блока сброса пароля */
export const BlockContainer = styled(ModalContainer)`
  max-width: 450px;
  width: 100%;
`;
