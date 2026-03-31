import styled from "styled-components";
import { media } from "../../../../styles/breakpoints";

export const CopyrightSection = styled.div`
  max-width: 934px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const CopyrightTitle = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #ffffff;
  text-align: left;
  text-transform: uppercase;

  ${media.max540} {
    font-size: 10px;
  }
`;
export const CopyrightText = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #84858a;
  text-align: left;

  & a {
    color: #d70022;
  }

  ${media.max540} {
    font-size: 8px;
  }
`;
