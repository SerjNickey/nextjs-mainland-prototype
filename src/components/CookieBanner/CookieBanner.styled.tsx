/**
 * Стили баннера Cookies — фиксированный блок в правом нижнем углу.
 */
import styled from "styled-components";
import { media } from "../../styles/breakpoints";

export const CookieWrap = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  max-width: 380px;
  padding: 20px 24px;
  background: rgba(28, 28, 28, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;

  ${media.max600} {
    left: 16px;
    right: 16px;
    bottom: 16px;
    max-width: none;
    padding: 16px 20px;
  }
`;

export const CookieText = styled.div`
  margin: 0 0 16px;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.9);

  p {
    margin: 0 0 0.5em;
  }
  p:last-child {
    margin-bottom: 0;
  }
  a {
    color: #d70022;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;

export const CookieButton = styled.button`
  display: block;
  width: 100%;
  max-width: 120px;
  margin: 0;
  padding: 10px 20px;
  background: #d70022;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #b8001e;
  }
`;
