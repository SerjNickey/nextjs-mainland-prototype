import styled from "styled-components";

export const AccordionCard = styled.div`
  background: rgba(36, 36, 36, 0.72);
  padding: 15px;
  border-radius: 10px;
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
  padding: 0;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 12px;
  letter-spacing: -0.01em;
  color: #ffffff;

  > span:first-child {
    line-height: 1.2;
  }
`;

export const AccordionChevron = styled.span<{ $open: boolean }>`
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 16px;
  color: #fff;
  transform: ${(p) => (p.$open ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.2s ease;
`;

export const AccordionBody = styled.div<{ $open: boolean }>`
  display: ${(p) => (p.$open ? "block" : "none")};
  padding: 0;
`;

export const BlockList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const LinkLine = styled.a`
  display: block;
  width: 100%;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
  font-weight: 400;
  font-size: 10px;
  color: #84858A;
  text-decoration: none;
  padding-bottom: 10px;

  &:first-child {
    padding-top: 10px;
  }
  &:last-child {
    padding-bottom: 0;
  }
`;

export const ModalOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  opacity: ${(p) => (p.$open ? 1 : 0)};
  visibility: ${(p) => (p.$open ? "visible" : "hidden")};
  transition:
    opacity 0.25s ease,
    visibility 0.25s ease;
  box-sizing: border-box;
  overflow: hidden;
  pointer-events: ${(p) => (p.$open ? "auto" : "none")};

  & > div {
    width: 100%;
    max-width: min(1276px, calc(100vw - 48px));
    max-height: min(625px, calc(100vh - 48px));
    min-width: 0;
    min-height: 0;
    transform: ${(p) => (p.$open ? "scale(1)" : "scale(0.98)")};
    opacity: ${(p) => (p.$open ? 1 : 0)};
    transition:
      transform 0.25s ease,
      opacity 0.25s ease;
    pointer-events: auto;
  }
`;

export const ModalBox = styled.div`
  position: relative;
  width: 100%;
  max-width: 1276px;
  height: auto;
  max-height: min(625px, calc(100vh - 48px));
  min-width: 0;
  min-height: 0;
  background: rgba(24, 24, 24, 1);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  position: relative;
  flex-shrink: 0;
  padding: 20px 56px 16px 24px;
  margin-bottom: 32px;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -12px;
    height: 2px;
    background: linear-gradient(90deg, #181818 0%, #d70022 50%, #181818 100%);
  }
`;

export const ModalTitle = styled.h4`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
`;

export const ModalClose = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid rgba(132, 133, 138, 1);
  background: transparent;
  color: #84858a;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalBody = styled.div`
  flex: 1;
  min-height: 0;
  min-width: 0;
  max-width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px 24px 24px;
  margin-bottom: 25px;
  font-size: 14px;
  color: #84858a;
  line-height: 1.5;
  word-break: break-word;
  overflow-wrap: anywhere;

  p {
    margin: 0 0 12px;
  }

  a {
    color: #d70022;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 12px 0;
  }

  ul,
  ol {
    margin: 12px 0;
    padding-left: 24px;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  li {
    margin: 4px 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    font-size: inherit;
    color: inherit;
    margin: 12px 0;
  }

  th,
  td {
    border: 1px solid #5b5b5b;
    padding: 8px 12px;
    text-align: left;
    vertical-align: top;
  }

  th {
    font-weight: 700;
  }

  thead th,
  tr:first-child th {
    background: rgba(36, 36, 36, 0.8);
  }
`;
