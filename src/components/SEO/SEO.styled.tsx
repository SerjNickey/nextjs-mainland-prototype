import styled from "styled-components";
import { media } from "../../styles/breakpoints";

interface IAboutText {
  $isOpen: boolean;
}
interface IAboutButton {
  $isOpen: boolean;
}

export const AboutBlock = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto 30px auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  color: #84858a;

  ${media.max540} {
    font-size: 12px;
  }
`;

export const AboutTitle = styled.h1`
  font-size: 20px;
  text-align: center;
  font-weight: 700;
`;

export const AboutText = styled.div<IAboutText>`
  font-weight: 400;
  text-align: left;
  height: ${({ $isOpen }) => ($isOpen ? "auto" : "48px")};
  overflow: hidden;

  & span {
    font-weight: 700;
  }

  ${media.max360} {
    height: ${({ $isOpen }) => ($isOpen ? "auto" : "68px")};
  }
`;

/** Контейнер контента из seo_text_body. */
export const AboutBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;

  p {
    margin: 0 0 8px 0;
  }
  p:empty {
    display: none;
  }
  p:last-child {
    margin-bottom: 0;
  }
  a {
    color: #84858a;
    text-decoration: underline;
  }
  b {
    font-weight: 700;
  }
  i {
    font-style: italic;
  }
  s {
    text-decoration: line-through;
  }
  sup {
    vertical-align: super;
    font-size: 0.75em;
  }
  sub {
    vertical-align: sub;
    font-size: 0.75em;
  }
  code {
    font-family: monospace;
    font-size: 0.9em;
    padding: 2px 6px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 4px;
  }
  blockquote {
    margin: 12px 0;
    padding-left: 16px;
    border-left: 3px solid #5b5b5b;
    color: #a0a0a0;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 12px 0 8px 0;
    font-weight: 700;
    color: #ffffff;
  }
  h1 {
    font-size: 1.5em;
  }
  h2 {
    font-size: 1.35em;
  }
  h3 {
    font-size: 1.2em;
  }
  h4 {
    font-size: 1.1em;
  }
  h5 {
    font-size: 1em;
  }
  h6 {
    font-size: 0.9em;
  }
  ol,
  ul {
    margin: 8px 0;
    padding-left: 1.5em;
  }
  li {
    margin-bottom: 4px;
  }
  hr {
    border: none;
    border-top: 1px solid #5b5b5b;
    margin: 16px 0;
  }
  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 12px 0;
    border-radius: 4px;
  }
`;

export const AboutParagraph = styled.div`
  margin: 0;
`;

export const AboutTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin: 12px 0;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: inherit;
    color: inherit;
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
  thead th {
    background: rgba(36, 36, 36, 0.8);
  }
`;

export const AboutPlaceholder = styled.span`
  color: #84858a;
  font-style: italic;
`;

export const AboutButton = styled.button<IAboutButton>`
  width: 17px;
  height: 16px;
  background: transparent;
  cursor: pointer;
  outline: none;
  border: none;
  padding: 0;

  & img {
    width: 100%;
    height: 100%;
    transform: rotate(${({ $isOpen }) => ($isOpen ? "180" : "0")}deg);
  }
`;
