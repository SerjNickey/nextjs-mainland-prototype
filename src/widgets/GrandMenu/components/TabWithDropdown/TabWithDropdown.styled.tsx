import styled from "styled-components";
import { media } from "../../../../styles/breakpoints";

const textWhite = "#f4f7fc";
const borderGray = "#404147";
const accentRed = "rgba(215, 0, 34, 1)";

export const DropdownWrap = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownPanel = styled.div<{
  $visible: boolean;
  $align?: "left" | "right";
}>`
  position: absolute;
  top: calc(100% + 20px);
  left: 50%;
  right: auto;
  width: max-content;
  max-width: 270px;
  min-height: 0;
  transform: ${({ $visible }) =>
    $visible
      ? "translateX(-50%) translateY(0)"
      : "translateX(-50%) translateY(-8px)"};
  background: #242424;
  border-radius: 12px;
  border: 1px solid ${borderGray};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  transition:
    opacity 0.2s ease,
    visibility 0.2s,
    transform 0.2s ease;
  z-index: 100;
  padding: 20px;
  box-sizing: border-box;
`;

export const TabButton = styled.button<{
  $active?: boolean;
  $accent?: boolean;
  $current?: boolean;
  $navigating?: boolean;
  as?: string;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  padding: 12px 30px;
  border-radius: 8px;
  border: none;
  background: rgba(36, 36, 36, 1);
  color: ${({ $current }) => ($current ? textWhite : "#84858A")};
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  cursor: ${({ $navigating }) => ($navigating ? "wait" : "pointer")};
  white-space: nowrap;
  transition:
    background 0.25s ease-in-out,
    color 0.25s ease-in-out,
    box-shadow 0.25s ease-in-out,
    opacity 0.2s ease;
  text-decoration: none;
  box-sizing: border-box;
  opacity: ${({ $navigating }) => ($navigating ? 0.85 : 1)};
  ${({ $current }) =>
    $current && `box-shadow: inset 0 0 0 1px ${accentRed};`}

  &:hover {
    color: ${textWhite};
    background: rgba(36, 36, 36, 1);
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${accentRed};
    outline-offset: 2px;
  }

  ${media.max768} {
    min-width: 100px;
    height: 40px;
    padding: 0 10px;
    font-size: 12px;
    gap: 6px;
  }
`;

export const IconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  flex-shrink: 0;
`;
