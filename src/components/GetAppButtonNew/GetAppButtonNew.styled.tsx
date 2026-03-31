import styled, { keyframes } from "styled-components";
import { media } from "../../styles/breakpoints";

interface IShinyButton {
  fullWidth?: boolean;
}

const shineAnimation = keyframes`
  0% {
    transform: translateX(-100%) skew(-20deg);
  }
  100% {
    transform: translateX(200%) skew(-20deg);
  }
`;

export const ShinyButton = styled.a<IShinyButton>`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  height: 44px;
  padding: 15px 20px;
  position: relative;
  overflow: hidden;
  background: #d70022;
  border: none;
  border-radius: 6px;

  color: #fff;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  transition: all 0.3s ease;

  &:hover {
    background: #b5001c;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: ${shineAnimation} 2s infinite;
  }
  ${media.max600} {
    height: 44px;
    font-size: 16px;
  }
  ${media.max430} {
    width: 100%;
    padding: 26px 26px;
  }
  ${media.max390} {
    padding: 25px 25px;
  }
  ${media.max384} {
    padding: 22px 22px;
  }
  ${media.max375} {
    padding: 18px 18px;
  }
  ${media.max360} {
    padding: 15px 15px;
  }
  ${media.max320} {
    padding: 13px 13px;
    font-size: 14px;
  }
`;

export const TextRef = styled.a`
  color: #84858a;
  font-weight: 700;
`;
