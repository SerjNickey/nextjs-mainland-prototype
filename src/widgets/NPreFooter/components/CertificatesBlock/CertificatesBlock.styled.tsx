import styled from "styled-components";
import { media } from "../../../../styles/breakpoints";

export const CertificatesSection = styled.div`
  max-width: 382px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 17px;

  ${media.max540} {
    justify-content: center;
    align-items: center;
  }
  ${media.max360} {
    gap: 15px;
  }
  ${media.max344} {
    gap: 12px;
  }
  ${media.max320} {
    gap: 4px;
  }
`;

export const CertificateLink = styled.a``;
