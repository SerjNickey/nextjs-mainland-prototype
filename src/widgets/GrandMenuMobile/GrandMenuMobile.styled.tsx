import styled, { css, keyframes } from "styled-components";
import { media } from "../../styles/breakpoints";

const overlayFadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const popoverSlideIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const PageOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: linear-gradient(180deg, rgba(10, 10, 10, 0) 0%, #0a0a0a 70%);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 1190;
  display: none;
  animation: ${overlayFadeIn} 0.25s ease-out;

  ${media.max430} {
    display: block;
  }
`;

export const Wrapper = styled.nav<{ $hidden?: boolean; $isIos?: boolean }>`
  position: fixed;
  left: 50%;
  bottom: calc(
    40px + env(safe-area-inset-bottom, 0px) + var(--vv-layout-bottom-gap, 0px)
  );
  transform: translateX(-50%);
  width: min(327px, calc(100vw - 48px));
  padding: 6px;
  background: rgba(28, 28, 28, 0.45);
  border: 1px solid rgba(251, 251, 251, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  z-index: 1200;
  display: none;
  isolation: isolate;
  transform: translateX(-50%)
    translateY(${({ $hidden }) => ($hidden ? "12px" : "0")});
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  visibility: ${({ $hidden }) => ($hidden ? "hidden" : "visible")};
  pointer-events: ${({ $hidden }) => ($hidden ? "none" : "auto")};
  transition:
    transform 0.25s ease-out,
    opacity 0.25s ease-out,
    visibility 0.25s ease-out;

  &::before {
    content: "";
    position: absolute;
    top: -18px;
    bottom: -42px;
    left: 50%;
    width: 100vw;
    transform: translateX(-50%);
    border-radius: 0;
    background: linear-gradient(180deg, rgba(10, 10, 10, 0) 0%, #0a0a0a 70%);
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
    z-index: -1;
    pointer-events: none;

    ${({ $isIos }) =>
      $isIos &&
      css`
        content: none;
        display: none;
      `}
  }

  ${media.max540} {
    display: block;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  position: relative;
  z-index: 2;
`;

export const MenuButton = styled.button<{ $open?: boolean }>`
  flex-shrink: 0;
  width: 103px;
  /* как у ShinyButton в RegistrationForm — одна высота, без сдвига при смене иконки */
  height: 37px;
  padding: 0 10px;
  border: ${({ $open }) =>
    $open ? "2px solid rgba(215, 0, 34, 1)" : "2px solid transparent"};
  border-radius: 6px;
  background: rgba(36, 36, 36, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  box-sizing: border-box;
`;

export const MenuText = styled.span<{ $open?: boolean }>`
  color: ${({ $open }) => ($open ? "#ffffff" : "rgba(132, 133, 138, 1)")};
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
`;

/** Три полоски: в CSS только ::before и ::after на элементе — третья линия через box-shadow. */
export const BurgerIcon = styled.span`
  position: relative;
  width: 18px;
  height: 11px;
  display: inline-block;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: -1px;
    width: 18px;
    height: 2px;
    border-radius: 1px;
    background: #ffffff;
    /* средняя и нижняя линии (шаг 5px при высоте полоски 2px) */
    box-shadow:
      0 5px 0 #ffffff,
      0 10px 0 #ffffff;
  }
`;

export const CloseIcon = styled.span`
  position: relative;
  width: 18px;
  height: 14px;
  display: inline-block;
  flex-shrink: 0;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 18px;
    height: 2px;
    border-radius: 1px;
    background: #ffffff;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

export const DownloadWrap = styled.div<{ $iosTestOrange?: boolean }>`
  flex: 1;
  min-width: 0;
  display: flex;

  & > * {
    flex: 1;
    min-width: 0;
  }

  ${({ $iosTestOrange }) =>
    $iosTestOrange &&
    css`
      background: orange;
      border-radius: 6px;
    `}
`;

export const Popover = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(100% + 10px);
  /* max-height: min(55vh, 420px); */
  max-height: 596px;
  overflow-y: auto;
  padding: 20px;
  border-radius: 10px;
  background: #2c2d31;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 8px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${popoverSlideIn} 0.28s ease-out;
`;

export const MainItemButton = styled.button<{ $active?: boolean }>`
  width: 100%;
  border: 0;
  background: transparent;
  color: ${({ $active }) => ($active ? "rgba(215, 0, 34, 1)" : "#ffffff")};
  font-weight: 600;
  font-size: 14px;
  text-align: left;
  padding: 0;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(132, 133, 138, 0.2);
  }
`;

export const Chevron = styled.span<{ $open?: boolean }>`
  width: 8px;
  height: 8px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(${({ $open }) => ($open ? "-135deg" : "45deg")});
  margin-top: ${({ $open }) => ($open ? "4px" : "-2px")};
  transition:
    transform 0.2s ease,
    margin-top 0.2s ease;
`;

export const SubmenuGroupTitle = styled.div`
  color: rgba(132, 133, 138, 1);
  font-size: 10px;
  font-weight: 600;
  margin-top: 6px;
  padding-left: 16px;
`;

export const SubmenuItem = styled.button`
  width: 100%;
  border: 0;
  background: transparent;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  padding: 6px 0 0 16px;
  cursor: pointer;
`;

export const BottomBlock = styled.div`
  display: block;

  ${media.max430} {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

export const LangWrap = styled.div`
  margin-top: 10px;
  padding: 0 4px 4px;

  ${media.max430} {
    margin-top: 0;
    padding: 0;
  }
`;
