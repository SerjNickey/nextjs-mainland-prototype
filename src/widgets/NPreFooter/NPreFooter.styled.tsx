import styled from "styled-components";
import { media } from "../../styles/breakpoints";

/** Обёртка PreFooter */
export const Wrapper = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto 20px auto;
`;

/** Корневая секция PreFooter: тёмный фон, отступы, колонки + бегущая строка + юридический блок */
export const Container = styled.section`
  width: 100%;
  padding: 40px 0 30px 0;
  font-family: "Montserrat", sans-serif;
  background: rgba(27, 27, 27, 0.7);
  display: flex;
  flex-direction: column;
  gap: 32px;
  border-radius: 12px;

  ${media.max768} {
    padding: 24px 16px;
    gap: 24px;
  }
`;

/** Кнопка скролла вверх: фиксирована в углу экрана, видна при прокрутке ≥20% */
export const ScrollToTopButton = styled.button<{ $visible?: boolean }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 10px;
  position: fixed;
  width: 44px;
  height: 44px;
  bottom: 60px;
  right: 24px;
  border: 2px solid #d70022;
  border-radius: 6px;
  background: transparent;
  color: #d70022;
  cursor: pointer;
  z-index: 1000;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    opacity 0.25s ease,
    visibility 0.25s ease;
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  visibility: ${(p) => (p.$visible ? "visible" : "hidden")};
  pointer-events: ${(p) => (p.$visible ? "auto" : "none")};

  &:hover {
    background: rgba(215, 0, 34, 0.15);
  }

  ${media.max768} {
    bottom: 16px;
    right: 16px;
  }
`;

/** Верхний блок: колонки навигации + одна колонка Contact Us и Join Us */
export const TopSection = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 32px 48px;
  align-items: start;
  padding: 0 30px;

  ${media.max1024} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${media.max600} {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

/** Общая колонка: Contact Us + Join Us */
export const ContactSocialColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

/** Обёртка колонок меню (Menu, More, Poker, Information и т.д.): отступ между колонками 65px */
export const NavColumns = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px 65px;
`;

/** Одна колонка с заголовком и списком ссылок/пунктов; ширина 168px */
export const NavColumn = styled.div`
  width: auto;
  min-width: 109px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  white-space: nowrap;
`;

/** Заголовок колонки навигации (Menu, Information и т.д.): белый, uppercase, жирный */
export const NavColumnTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  // text-transform: uppercase;
`;

/** Список пунктов/ссылок внутри одной колонки (вертикальный, без отступа между строками) */
export const NavColumnList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

/** Строка без ссылки (только данные с API) */
export const NavColumnLine = styled.span`
  display: block;
  padding: 6px 8px;
  margin: 0 -8px;
  font-size: 14px;
  font-weight: 400;
  color: #84858a;
  border-radius: 4px;
`;

/** Строка ссылки: при наведении только цвет текста (без смены фона) */
export const NavLinkRow = styled.span`
  display: inline-block;
  border-radius: 4px;
`;

/** Ссылка в колонке (common — роут/внешняя; как Link или a): 12px, 400, rgba(132,133,138,1), при ховере белый */
export const NavLink = styled.a`
  display: block;
  padding: 6px 8px;
  margin: 0 -8px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(132, 133, 138, 1);
  text-decoration: none;
  transition: color 0.2s ease;
  border-radius: 4px;

  &:hover {
    color: #ffffff;
  }
`;

/** Блок Contact Us */
export const ContactBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

/** Заголовок блока контактов (например "Contact Us"): белый, uppercase */
export const ContactTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  // text-transform: uppercase;
`;

/** Email: при наведении тонкая подчёркивающая линия */
export const ContactLink = styled.a`
  font-size: 14px;
  font-weight: 400;
  color: #d70022;
  text-decoration: underline;
`;

/** Блок Join Us (соцсети) */
export const SocialBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

/** Заголовок блока соцсетей (например "Join Us"): белый, uppercase */
export const SocialTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  // text-transform: uppercase;
`;

/** Контейнер иконок соцсетей: горизонтальный ряд с отступами */
export const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

/** Иконка соцсети: при наведении ярче (filter: brightness) */
export const SocialIconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: rgba(71, 71, 71, 1);
  border-radius: 6px;
  color: #fff;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(132, 133, 138, 1);
  }

  img,
  svg {
    // width: 24px;
    // height: 24px;
    object-fit: contain;
    flex-shrink: 0;
  }

  svg {
    display: block;
  }
`;

/** Секция бегущей строки: одинаковые отступы слева и справа */
export const RunningLineSection = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 16px 0;
`;

/** Внутренний контент бегущей строки: текст и картинки в один ряд; отступ слева и справа как между элементами */
export const RunningLineContent = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 24px;

  ${media.max600} {
    gap: 16px;
    padding: 0 16px;
  }
`;

/** Текст в бегущей строке: Montserrat 700, 73px, uppercase, #474747 */
export const RunningLineText = styled.span`
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 73px;
  line-height: 89px;
  text-align: center;
  text-transform: uppercase;
  color: #474747;

  ${media.max1024} {
    font-size: 52px;
    line-height: 64px;
  }
  ${media.max768} {
    font-size: 36px;
    line-height: 44px;
  }
  ${media.max600} {
    font-size: 28px;
    line-height: 34px;
  }
`;

/** Картинка в бегущей строке: фиксированный размер 125×125, между текстами */
export const RunningLineImage = styled.img`
  width: 125px;
  height: 125px;
  object-fit: contain;
  flex-shrink: 0;
`;

/** Нижний блок: юридический текст слева, сертификаты справа */
export const BottomSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  padding: 0 30px;

  ${media.max768} {
    flex-direction: column;
    align-items: stretch;
  }
`;

/** Блок юридического текста (footer_legal_text): параграфы и ссылки, серый мелкий шрифт */
export const LegalBlock = styled.div`
  max-width: 934px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;

  & p {
    margin: 0 0 6px 0;
    font-size: 12px;
    font-weight: 400;
    color: #84858a;
    line-height: 1.4;
  }
  & a {
    color: #d70022;
    text-decoration: none;
  }
  & a:hover {
    text-decoration: underline;
  }

  ${media.max540} {
    & p {
      font-size: 10px;
    }
  }
`;

/** Ряд сертификатов/иконок (18+, лицензии и т.д.) справа от юридического текста */
export const CertificatesRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 17px;
  flex-shrink: 0;

  ${media.max768} {
    justify-content: center;
  }
`;

/** Ссылка-обёртка для одного сертификата (картинка с опциональным url из БО) */
export const CertificateLink = styled.a`
  display: block;
  line-height: 0;

  img {
    height: 37px;
    width: auto;
    object-fit: contain;
  }
`;

/** Строка-кнопка для type=information: по клику открывается попап (стиль как у ссылки — 12px, 400, rgba(132,133,138,1)) */
export const NavDocButton = styled.button`
  display: block;
  width: 100%;
  padding: 6px 8px;
  margin: 0 -8px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(132, 133, 138, 1);
  text-align: left;
  text-decoration: none;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 4px;
  transition: color 0.2s ease;
  font-family: inherit;

  &:hover {
    color: #ffffff;
  }
`;

/**
 * Попап документа (блоки type=information).
 * По макету: не более 1276×625px; при зуме/малом экране сжимается, скролл внутри окна.
 */
export const DocModalOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  opacity: ${(p) => (p.$open ? 1 : 0)};
  visibility: ${(p) => (p.$open ? "visible" : "hidden")};
  transition:
    opacity 0.25s ease,
    visibility 0.25s ease;
  overflow: hidden;
  pointer-events: ${(p) => (p.$open ? "auto" : "none")};

  & > div {
    width: 100%;
    max-width: min(1276px, calc(100vw - 48px));
    max-height: min(625px, calc(100vh - 48px));
    min-width: 0;
    min-height: 0;
    transform: ${(p) => (p.$open ? "scale(1)" : "scale(0.98)")};
    opacity: ${(p) => (p.$open ? 1 : 0)};
    transition:
      transform 0.25s ease,
      opacity 0.25s ease;
    pointer-events: auto;
  }
`;

/** Окно попапа документа: по макету до 1276×625px, скролл внутри */
export const DocModalBox = styled.div`
  position: relative;
  width: 100%;
  max-width: 1276px;
  height: auto;
  max-height: min(625px, calc(100vh - 48px));
  min-width: 0;
  min-height: 0;
  background: rgba(24, 24, 24, 1);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

/** Шапка попапа: заголовок документа и место под кнопку закрытия */
export const DocModalHeader = styled.div`
  position: relative;
  flex-shrink: 0;
  padding: 20px 56px 16px 24px;
  margin-bottom: 32px;
`;

/** Красная градиентная линия под шапкой попапа (не задаём width, чтобы не вызывать overflow) */
export const DocModalHeaderLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -12px;
  height: 2px;
  background: linear-gradient(90deg, #181818 0%, #d70022 50%, #181818 100%);
`;

/** Заголовок документа в попапе (value.lines[].title из блока information) */
export const DocModalTitle = styled.h2`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  text-align: center;
`;

/** Кнопка закрытия попапа (крестик) в правом верхнем углу */
export const DocModalClose = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid rgba(132, 133, 138, 1);
  background: transparent;
  color: #84858a;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/** Область контента: внутренний скролл, не растягивает модалку по ширине */
export const DocModalBody = styled.div`
  flex: 1;
  min-height: 0;
  min-width: 0;
  max-width: 100%;
  overflow-y: auto;
  overflow-x: auto;
  padding: 20px 24px 24px;
  margin-bottom: 25px;
  font-size: 14px;
  color: #84858a;
  line-height: 1.5;

  /* Как в CustomScrollbar.styled.tsx — WebKit */
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-track {
    background: ${({
  theme,
}: {
  theme?: { scrollbar?: { scrollbarTrack?: string } };
}) => theme?.scrollbar?.scrollbarTrack ?? "#f1f1f1"};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({
  theme,
}: {
  theme?: {
    scrollbar?: { scrollbarThumb?: string; scrollbarTrack?: string };
  };
}) => theme?.scrollbar?.scrollbarThumb ?? "#888"};
    border-radius: 10px;
    border: 3px solid
      ${({ theme }: { theme?: { scrollbar?: { scrollbarTrack?: string } } }) =>
    theme?.scrollbar?.scrollbarTrack ?? "#f1f1f1"};
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${({
      theme,
    }: {
      theme?: { scrollbar?: { scrollbarThumbHover?: string } };
    }) => theme?.scrollbar?.scrollbarThumbHover ?? "#555"};
  }
  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: ${({
      theme,
    }: {
      theme?: {
        scrollbar?: { scrollbarThumb?: string; scrollbarTrack?: string };
      };
    }) =>
    theme?.scrollbar
      ? `${theme.scrollbar.scrollbarThumb ?? "#888"} ${theme.scrollbar.scrollbarTrack ?? "#f1f1f1"}`
      : "#888 #f1f1f1"};

  & p {
    margin: 0 0 12px 0;
  }
  & a {
    color: #d70022;
    text-decoration: none;
  }
  & a:hover {
    text-decoration: underline;
  }

  /* Изображения из HTML контента */
  & img {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 12px 0;
  }

  /* Списки: маркеры и отступы */
  & ul,
  & ol {
    margin: 12px 0;
    padding-left: 24px;
  }
  & ul {
    list-style-type: disc;
  }
  & ol {
    list-style-type: decimal;
  }
  & li {
    margin: 4px 0;
  }

  /* Таблицы — как в SEO (AboutTableWrapper) */
  & table {
    width: 100%;
    border-collapse: collapse;
    font-size: inherit;
    color: inherit;
    margin: 12px 0;
  }
  & th,
  & td {
    border: 1px solid #5b5b5b;
    padding: 8px 12px;
    text-align: left;
    vertical-align: top;
  }
  & th {
    font-weight: 700;
  }
  & thead th,
  & tr:first-child th {
    background: rgba(36, 36, 36, 0.8);
  }
`;
