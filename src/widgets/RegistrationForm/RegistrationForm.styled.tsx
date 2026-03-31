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
  background: rgba(215, 0, 34, 1);
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
  ${media.max540} {
    width: 100%;
    height: 37px;
    padding: 15px 20px;
    font-size: 12px;
  }
  /* max430 задаёт height: 37px — вертикальный padding не должен суммарно превышать высоту
     (иначе на iPhone 12/12 Pro при 390px кнопка «ломается»). Оставляем компактные отступы. */
  ${media.max390} {
    padding: 8px 14px;
  }
  ${media.max384} {
    padding: 8px 13px;
  }
  ${media.max375} {
    padding: 8px 12px;
  }
  ${media.max360} {
    padding: 8px 11px;
  }
  ${media.max320} {
    padding: 6px 10px;
  }
`;
