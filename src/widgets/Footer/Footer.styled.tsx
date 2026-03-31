import styled from "styled-components";
import { media } from "../../styles/breakpoints";

export const Container = styled.footer`
  width: 100%;
  height: 38px;
  margin: 0 auto;
  padding: 10px 14px;
  background: #1c1c1c;
  font-family: "Montserrat";
  font-style: normal;
  font-size: 14px;
  color: #5d5d5d;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-align: center;

  & br {
    display: none;
  }

  ${media.max768} {
    font-size: 13px;
  }
  ${media.max712} {
    font-size: 12px;
  }
  ${media.max640} {
    font-size: 11px;
  }
  ${media.max600} {
    font-size: 10px;
  }
  ${media.max540} {
    font-size: 9px;
  }
  ${media.max480} {
    height: 32px;
    font-size: 8px;

    & br {
      display: block;
    }
  }
`;
