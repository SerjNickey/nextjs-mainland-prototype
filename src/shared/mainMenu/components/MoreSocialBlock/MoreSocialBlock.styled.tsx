import styled from "styled-components";
import { media } from "../../../../styles/breakpoints";

const textWhite = "#f4f7fc";

export const DropdownSectionFooter = styled.div`
  padding: 0 4px 4px;

  ${media.max430} {
    padding: 0;
  }
`;

export const SocialRow = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;

  ${media.max430} {
    justify-content: flex-start;
    margin-top: 0;
  }
`;

export const SocialIconTooltip = styled.span`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 6px;
  padding: 4px 8px;
  background: #2c2d31;
  color: ${textWhite};
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  border-radius: 6px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  z-index: 1;
`;

export const SocialIconWrap = styled.span`
  position: relative;
  display: inline-flex;

  &:hover ${SocialIconTooltip} {
    opacity: 1;
  }
`;

export const SocialIconButton = styled.a<{ title?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: rgba(71, 71, 71, 1);
  color: ${textWhite};
  transition: background 0.2s ease;
  cursor: pointer;

  &:hover {
    background: rgba(132, 133, 138, 1);
  }
`;
