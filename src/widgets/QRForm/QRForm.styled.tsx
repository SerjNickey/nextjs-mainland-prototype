import styled from "styled-components";
import { media } from "../../styles/breakpoints";

export const QRFormContainer = styled.div`
  padding: 0 0;
  max-width: 450px;
  width: 100%;
  height: auto;
  margin: 0 auto;
  background: rgba(24, 24, 24, 1);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

/** Подзаголовок под «REGISTRATION»: «The download has started...» */
export const RegistrationSubtitle = styled.p`
  width: 100%;
  max-width: 390px;
  margin: 0 0 6px 0;
  padding: 0;
  font-family: "Montserrat";
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #a0a0a0;
  text-align: center;
  text-transform: none;

  ${media.max430} {
    font-size: 13px;
    line-height: 18px;
  }
  ${media.max360} {
    font-size: 12px;
    line-height: 17px;
  }
`;

/** Строка Nickname + Email — ширина как у двух SimpleInput (195+10+195) */
export const NicknameEmailRow = styled.div`
  width: 100%;
  max-width: 390px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

/** Строка: код приглашения + выбор страны — та же ширина, чтобы колонки совпадали с первой строкой */
export const CountryCodeRow = styled.div`
  width: 100%;
  max-width: 390px;
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

export const CheckboxWrapper = styled.div`
  max-width: 390px;
  width: 100%;
  height: auto;
  display: flex;
  flex-directon: row;
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

export const ButtonWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

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
