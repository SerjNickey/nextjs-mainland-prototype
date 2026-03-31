import styled from "styled-components";

const textWhite = "#f4f7fc";
const dropdownLinkCurrentGray = "#84858a";
const borderGray = "#404147";
const navGray = "#2d2e33";
const navGrayHover = "#3a3b40";

export const DropdownLink = styled.a<{ $current?: boolean }>`
  display: block;
  padding: 8px 0;
  border-radius: 6px;
  color: ${({ $current }) =>
    $current ? dropdownLinkCurrentGray : textWhite};
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease;
  cursor: pointer;

  &:hover {
    color: ${dropdownLinkCurrentGray};
  }
`;

export const SocialRow = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px 12px 0;
  flex-wrap: wrap;
`;

export const LangButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  min-width: 44px;
  border-radius: 8px;
  border: 1px solid ${borderGray};
  background: ${navGray};
  color: ${textWhite};
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  transition: background 0.2s ease;
  box-sizing: border-box;

  &:hover {
    background: ${navGrayHover};
  }

  img {
    width: 28px;
    height: 20px;
    object-fit: cover;
    border-radius: 2px;
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

  img {
    width: 30px;
    height: 30px;
    object-fit: contain;
  }
`;
