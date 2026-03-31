import styled, { keyframes } from "styled-components";
import { media } from "../../../../styles/breakpoints";

const foregroundPan = keyframes`
  from {
    background-position: bottom left, bottom center, top center;
  }
  to {
    background-position: bottom right, bottom center, top center;
  }
`;

export const Wrapper = styled.section`
  width: 100%;
  margin: 0 auto 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 0 15px;
`;

export const Title = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0;
`;

export const Card = styled.article`
  width: 100%;
  max-width: 343px;
  background: rgba(27, 27, 27, 0.7);
  border: 1px solid #2f2f2f;
  border-radius: 8px;
  overflow: hidden;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 15px;

  ${media.max360} {
    max-width: 330px;
  }

  ${media.max353} {
    max-width: 323px;
  }

  ${media.max344} {
    max-width: 314px;
  }

  ${media.max320} {
    max-width: 290px;
  }
`;

export const TabsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2px;
  width: 100%;
`;

export const TabCard = styled.button<{ $isActive: boolean; $iconUrl?: string }>`
  width: 100%;
  height: 64px;
  border-radius: 4px;
  border: ${({ $isActive }) =>
    $isActive ? "1px solid rgba(215, 0, 34, 1)" : "1px solid #101010"};
  box-sizing: border-box;
  background: linear-gradient(179.59deg, #101010 0.36%, #000000 99.64%);
  padding-top: 6px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1;
  opacity: 1;
  transition:
    border-color 0.4s ease,
    color 0.4s ease,
    background-color 0.4s ease;
  padding: 0 4px;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-50%);
    background-image: ${({ $iconUrl }) =>
      $iconUrl ? `url("${encodeURI($iconUrl)}")` : "none"};
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    z-index: 1;
    pointer-events: none;
    opacity: ${({ $isActive }) => ($isActive ? 1 : 0.5)};
    transition: opacity 0.4s ease;
  }

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -8px;
    width: 36px;
    height: 36px;
    transform: translateX(-50%);
    border-radius: 50%;
    background: rgba(215, 0, 34, 0.3);
    filter: blur(7px);
    opacity: 0;
    transition: opacity 0.2s ease;
    z-index: 0;
    pointer-events: none;
  }

  ${({ $isActive }) => $isActive && "&::after"} {
    opacity: 1;
  }

  ${media.max360} {
    height: 62px;
  }

  ${media.max353} {
    height: 60px;
  }

  ${media.max344} {
    height: 59px;
  }

  ${media.max320} {
    height: 54px;
  }
`;

export const TabTitle = styled.span<{ $isActive: boolean }>`
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 16px);
  font-weight: 700;
  font-size: 9px;
  line-height: 1.1;
  text-transform: uppercase;
  color: ${({ $isActive }) => ($isActive ? "#ffffff" : "rgba(91, 91, 91, 1)")};
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 2;

  ${media.max360} {
    top: 5px;
    width: calc(100% - 14px);
    font-size: 8px;
    line-height: 1.05;
  }

  ${media.max353} {
    top: 5px;
    width: calc(100% - 12px);
    font-size: 8px;
    line-height: 1.02;
  }

  ${media.max344} {
    top: 4px;
    width: calc(100% - 12px);
    font-size: 7px;
    line-height: 1.02;
  }

  ${media.max320} {
    top: 4px;
    width: calc(100% - 10px);
    font-size: 7px;
    line-height: 1;
  }
`;

export const Preview = styled.div<{ $backgroundUrls?: string[] }>`
  width: 315px;
  height: 385px;
  border-radius: 8px;
  background-color: #1b1b1b;
  background-image: ${(props) => {
    const urls = (props.$backgroundUrls ?? []).filter(Boolean);
    if (urls.length === 0) return "none";
    return urls.map((url) => `url("${encodeURI(url)}")`).join(", ");
  }};
  background-size:
    auto auto,
    100% 100%,
    auto auto;
  background-repeat: no-repeat;
  overflow: hidden;
  animation: ${foregroundPan} 40s linear infinite alternate;

  ${media.max360} {
    width: 300px;
    height: 367px;
  }

  ${media.max353} {
    width: 293px;
    height: 358px;
  }

  ${media.max344} {
    width: 284px;
    height: 347px;
  }

  ${media.max320} {
    width: 260px;
    height: 318px;
  }
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const DetailsTitle = styled.h3`
  margin: 0;
  font-weight: 800;
  font-size: 16px;
  line-height: 20px;
  text-transform: uppercase;
  color: #ffffff;
`;

export const DetailsText = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  letter-spacing: 0.01px;
  color: #ffffff;

  p {
    margin: 0 0 6px 0;
  }
  p:last-child {
    margin-bottom: 0;
  }
`;
