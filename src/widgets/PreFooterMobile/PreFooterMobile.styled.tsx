import styled from "styled-components";

export const Wrapper = styled.section`
  width: 100%;
  margin: 0;
  padding: 15px 15px 30px 15px;
  box-sizing: border-box;
`;

export const InnerWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 15px 0 15px 0;
  box-sizing: border-box;

  background: rgba(27, 27, 27, 0.7);
  border-radius: 10px;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 0 15px;
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(36, 36, 36, 0.72);
`;

export const BlockTitle = styled.h3`
margin-bottom: 6px;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  letter-spacing: -0.01em;
  text-transform: uppercase;

  color: #FFFFFF;
`;

export const BlockList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const LinkLine = styled.a`
  display: block;
  font-size: 16px;
  line-height: 1.45;
  color: #9ea0a6;
  text-decoration: none;
  padding: 4px 0;
`;

export const ContactSubtitle = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #FFFFFF;
`;

export const ContactLink = styled.a`
  display: inline-block;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #d70022;
  text-decoration: underline;
`;

export const AccordionCard = styled.div`
  border: 1px solid rgba(117, 81, 255, 0.28);
  background: rgba(36, 36, 36, 0.72);
  padding: 0;
  overflow: hidden;
`;

export const AccordionHeader = styled.button`
  width: 100%;
  border: 0;
  background: transparent;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 14px 12px;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 14px;
  line-height: 1.3;
  font-weight: 700;
`;

export const AccordionChevron = styled.span<{ $open: boolean }>`
  width: 10px;
  height: 10px;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: ${(p) => (p.$open ? "rotate(-135deg)" : "rotate(45deg)")};
  margin-right: 2px;
  transition: transform 0.2s ease;
`;

export const AccordionBody = styled.div<{ $open: boolean }>`
  display: ${(p) => (p.$open ? "block" : "none")};
  padding: 0 12px 12px;
`;

export const SocialRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

export const SocialIconLink = styled.a`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #53555b;
  color: #fff;
`;

export const RunningLineSection = styled.div`
  margin-top: 0;
  border: 1px solid rgba(117, 81, 255, 0.2);
  border-left: 0;
  border-right: 0;
  padding: 10px 0;
`;

export const RunningLineItem = styled.span`
  display: inline-flex;
  align-items: center;
`;

export const RunningLineText = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`;

export const RunningLineImage = styled.img`
  width: 28px;
  height: 28px;
  object-fit: contain;
  margin: 0 10px;
`;

export const Bottom = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const LegalText = styled.div`
  border: 1px solid rgba(117, 81, 255, 0.28);
  background: rgba(36, 36, 36, 0.72);
  padding: 12px 10px;
  font-size: 12px;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.75);
  text-align: center;

  p {
    margin: 0 0 8px;
  }
`;

export const CertificatesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const CertificateLink = styled.a`
  display: inline-flex;
  width: 56px;
  height: 34px;
  border-radius: 4px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const DocModalOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 1200;
  background: rgba(0, 0, 0, 0.7);
  display: ${(p) => (p.$open ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  padding: 12px;
  box-sizing: border-box;
`;

export const DocModalBox = styled.div`
  width: min(100%, 360px);
  max-height: 85vh;
  background: #1d1e22;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
`;

export const DocModalHeader = styled.div`
  padding: 12px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const DocModalTitle = styled.h4`
  margin: 0;
  font-size: 15px;
  line-height: 1.3;
  color: #fff;
`;

export const DocModalClose = styled.button`
  border: 0;
  background: transparent;
  color: #fff;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
`;

export const DocModalBody = styled.div`
  max-height: calc(85vh - 52px);
  overflow-y: auto;
  padding: 0 14px 14px;
  color: #fff;
  font-size: 13px;
  line-height: 1.45;

  p {
    margin: 0 0 12px;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

export const MobileOnly = styled.div`
  @media (min-width: 541px) {
    display: none;
  }
`;
