/**
 * Стили GrandMenu: контейнер меню, табы, выпадающее подменю, иконки, ссылки.
 *
 * Цвета: navGray — фон таба; navGrayHover — ховер и активный таб; accentRed — акцент (Download);
 * textWhite — текст; borderGray — рамки и разделители.
 *
 * Таб: height 44px, min-width 136px, gap 8px между иконкой и текстом.
 * Иконка таба: 22×22, белая через filter в IconWrap.
 */
import styled from "styled-components";
import { media } from "../../styles/breakpoints";

const navGray = "#2d2e33";
const navGrayHover = "#3a3b40";
const accentRed = "rgba(215, 0, 34, 1)";
const textWhite = "#f4f7fc";
const borderGray = "#404147";

/** Внешний контейнер меню: фон, скругление, blur, центрирование. */
export const Wrapper = styled.nav`
  // max-width: 1264px;
  width: auto;
  margin: 15px auto 0 auto;
  background: rgba(28, 28, 28, 0.45);
  border: 1px solid rgba(251, 251, 251, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  display: inline-flex;
  justify-content: center;
  padding: 0 9px;
`;

/** Внутренний ряд: табы в ряд, gap 12px, flex-wrap, центрирование. */
export const NavInner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  flex-wrap: wrap;
  justify-content: center;
`;

/**
 * Кнопка/ссылка таба. Может рендериться как <button>, <a> или <Link> (через as).
 * $active — выпадающее подменю открыто; $current — текущий роут; $accent — акцентный стиль (Download).
 * height 44px, min-width 136px, gap 8px между иконкой и текстом.
 */
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
  background: ${({ $accent, $current }) =>
    $accent
      ? accentRed
      : $current
        ? "rgba(36, 36, 36, 1)"
        : "rgba(36, 36, 36, 1)"};
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
  ${({ $current }) => $current && `box-shadow: inset 0 0 0 1px ${accentRed};`}

  &:hover {
    color: ${textWhite};
    background: ${({ $accent }) =>
      $accent ? "#rgba(36, 36, 36, 1)" : "rgba(36, 36, 36, 1)"};
  }

  ${media.max768} {
    min-width: 100px;
    height: 40px;
    padding: 0 10px;
    font-size: 12px;
    gap: 6px;
  }
`;

/**
 * Обёртка иконки таба: 22×22, внутри img с filter brightness(0) invert(1) — белый цвет.
 * Используется только для иконок табов; в подменю иконок нет.
 */
export const IconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  flex-shrink: 0;
`;

/** Обёртка таба с подменю: position relative для выравнивания DropdownPanel. */
export const DropdownWrap = styled.div`
  position: relative;
  display: inline-block;
`;

/**
 * Выпадающая панель подменю. $visible — показ/скрытие; $align — левый или правый край под табом.
 * width 221px, анимация по opacity/transform.
 */
export const DropdownPanel = styled.div<{
  $visible: boolean;
  $align?: "left" | "right";
}>`
  position: absolute;
  top: calc(100% + 20px);
  left: 50%;
  right: auto;
  width: 221px;
  min-height: 0;
  margin-left: -110.5px; /* половина width для центрирования относительно таба */
  background: #242424;
  border-radius: 12px;
  border: 1px solid ${borderGray};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  transform: ${({ $visible }) =>
    $visible ? "translateY(0)" : "translateY(-8px)"};
  transition:
    opacity 0.2s ease,
    visibility 0.2s,
    transform 0.2s ease;
  z-index: 100;
  padding: 12px 0;
  box-sizing: border-box;
`;

/** Одна группа в подменю (например «Poker School»). Между группами — border-top. */
export const DropdownSection = styled.div`
  padding: 0 4px;
  &:not(:first-child) {
    // margin-top: 12px;
    // padding-top: 12px;
    // border-top: 1px solid ${borderGray};
  }
`;

/** Заголовок группы подменю (серый, мелкий шрифт). Для блока Social в табе More. */
export const DropdownSectionTitle = styled.div`
  padding: 4px 12px 8px;
  font-size: 12px;
  font-weight: 600;
  color: #84858a;
`;

/** Секция внизу дропдауна (например Social в More): отступ снизу. */
export const DropdownSectionFooter = styled(DropdownSection)`
  padding-bottom: 4px;
`;

/** Серый цвет текста активного пункта подменю (текущая страница). */
const dropdownLinkCurrentGray = "#84858a";

/** Ссылка в подменю (link/article). $current — текущая страница, текст серый. Рендерится как <a> или через as={Link} с to. */
export const DropdownLink = styled.a<{ $current?: boolean }>`
  display: block;
  padding: 8px 12px;
  border-radius: 6px;
  color: ${({ $current }) => ($current ? dropdownLinkCurrentGray : textWhite)};
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition:
    background 0.2s ease,
    color 0.2s ease;
  cursor: pointer;

  &:hover {
    // background: ${navGrayHover};
    color: ${dropdownLinkCurrentGray};
  }
`;

/** Ряд иконок соцсетей или языков в подменю. */
export const SocialRow = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px 12px 0;
  flex-wrap: wrap;
`;

/** Кастомный тултип над иконкой соцсети: тёмный фон, центрирован. */
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

/** Обёртка иконки соцсети для кастомного тултипа (над иконкой, по центру). */
export const SocialIconWrap = styled.span`
  position: relative;
  display: inline-flex;

  &:hover ${SocialIconTooltip} {
    opacity: 1;
  }
`;

/** Кнопка-иконка соцсети в подменю (30×30, скругление, ховер). Иконки — красные (SVG fill / img filter). */
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

/** Кнопка переключателя языка справа от табов. 44×44, флаг или буквы кода. */
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
