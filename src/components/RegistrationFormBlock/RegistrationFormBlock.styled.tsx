import styled from "styled-components";
import { media } from "../../styles/breakpoints";
import backIcon from "../../assets/images/QRFModal/back_2x.webp";

/** Корневой контейнер формы регистрации */
export const RegistrationFormBlockWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #242424;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.45);
`;
/** Хедер на странице Second (код подтверждения): кнопка «назад» + заголовок */
export const SecondPageHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  // margin-bottom: 8px;
`;

/** Кнопка «назад» (на Second — возврат к форме регистрации) */
export const BackButton = styled.button`
  width: 44px;
  height: 44px;
  margin-left: 20px;
  background: url(${backIcon.src});
  background-size: contain;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  flex-shrink: 0;

  ${media.max393} {
    width: 33px;
    height: 33px;
  }
`;

/** Заголовок страницы кода подтверждения */
export const SecondPageTitle = styled.div`
  font-family: "Montserrat";
  font-weight: 700;
  font-size: 20px;
  color: #ffffff;
  text-transform: none;

  ${media.max320} {
    font-size: 18px;
  }
`;

/** Корневой контейнер формы регистрации */
export const FormContainer = styled.div`
  border-radius: 6px;

  max-width: 450px;
  width: 100%;
  height: auto;
  margin: 0 auto;
  padding: 24px 0;
  background: rgba(24, 24, 24, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

/** Строка: ввод кода приглашения + выбор страны, gap 10px, оба поля одинаковой ширины */
export const CountryCodeRow = styled.div`
  width: 100%;
  padding: 0 15px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;

  & > * {
    flex: 1 1 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  /* обёртки инпутов на всю ширину ячейки */
  & > * > * {
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  & > * input {
    width: 100% !important;
    max-width: 100%;
    box-sizing: border-box;
  }
`;

/** Обёртка чекбокса и текста соглашения */
export const CheckboxWrapper = styled.div`
  max-width: 390px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 4px;

  & p {
    margin-top: -2px;
    color: #5b5b5b;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 18px;
    text-transform: none;
  }

  & a {
    color: #d3d3d3;
  }

  ${media.max384} {
    & p {
      font-size: 11px;
    }
  }
  ${media.max360} {
    & p {
      font-size: 10px;
    }
  }
  ${media.max344} {
    & p {
      font-size: 9px;
    }
  }
  ${media.max320} {
    & p {
      font-size: 8px;
    }
  }
`;

/** Текст ошибки под блоком чекбокса */
export const CheckboxError = styled.p`
  width: 100%;
  max-width: 390px;
  margin-top: -10px;
  padding: 0 4px;
  font-size: 12px;
  color: rgba(170, 0, 0, 1);
  font-family: "Montserrat";
  font-weight: 400;
`;

/** Обёртка кнопки регистрации */
export const ButtonWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

/** Блок «Уже есть учётная запись?» / Download */
export const DownloadWrapper = styled.div`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #84858a;
  text-align: center;
  text-transform: none;

  ${media.max384} {
    font-size: 11px;
  }
  ${media.max320} {
    font-size: 10px;
  }
`;

export const NicknameEmailRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

/** Оверлей загрузки при отправке формы */
export const LoadingOverlay = styled.div`
  width: 240px;
  height: 240px;
  color: #fff;
  text-transform: uppercase;
  font-size: 30px;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & > div {
    background: #000;
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;
