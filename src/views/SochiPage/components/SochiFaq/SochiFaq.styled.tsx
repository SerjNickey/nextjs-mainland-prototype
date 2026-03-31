import styled from "styled-components";
import { media } from "../../../../styles/breakpoints";

export const Wrapper = styled.section`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto 100px auto;
  padding: 0 15px;
  box-sizing: border-box;

  ${media.max768} {
    padding: 24px 16px 40px;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow: hidden;
  backdrop-filter: blur(5px);
`;

export const Item = styled.div<{ $open: boolean }>`
  background: ${({ $open }) =>
    $open ? "rgba(39, 39, 39, 0.7)" : "rgba(27, 27, 27, 0.7)"};
  backdrop-filter: blur(5px);
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 8px;
  transition: background 0.2s ease;
`;

export const Question = styled.button<{ $open: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  text-transform: uppercase;

  color: #ffffff;

  text-align: left;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;

  // &:hover {
  //   background: rgba(255, 255, 255, 0.05);
  // }
`;

export const Toggle = styled.span<{ $open: boolean }>`
  border: 1px solid #84858a;
  border-radius: 6px;
  transform: matrix(-1, 0, 0, 1, 0, 0);
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #84858a;
  font-size: 36px;
  font-weight: 400;
  line-height: 1;
  &::before {
    content: "${({ $open }) => ($open ? "×" : "+")}";
  }
`;

export const Answer = styled.div<{ $open: boolean }>`
  overflow: hidden;
  max-height: ${({ $open }) => ($open ? "500px" : "0")};
  transition: max-height 0.3s ease;
`;

export const AnswerInner = styled.div`
  padding: 0 24px 20px 24px;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #84858a;

  p {
    margin: 0 0 12px;
  }
  p:last-child {
    margin-bottom: 0;
  }
`;
