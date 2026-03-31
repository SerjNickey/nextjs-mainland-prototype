/**
 * Стили страницы Poker School (Blog).
 * ТЗ: хлебные крошки, поиск (394×44 / 271×44), карточки 344×568 (десктоп) / 164×568 (мобилка),
 * 4 колонки десктоп / 2 мобилка. Модалки: статья, предпросмотр карточки.
 */
import styled from "styled-components";
import { media } from "../../styles/breakpoints";
import closeIcon from "../../assets/images/PreFooter/close_2x.webp";

const CARD_WIDTH_DESKTOP = 344;
const CARD_HEIGHT = 568;
const CARD_WIDTH_MOBILE = 164;
const GRID_GAP = 20;
const accentRed = "#c41e3a";

export const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0 auto;
  max-width: 3840px;
  background: rgba(10, 10, 10, 1);

  ${media.min768} {
    max-width: 1920px;
    zoom: 0.4; /* 768×1024 */
  }
  ${media.min800} {
    zoom: 0.417; /* 800×600 */
  }
  ${media.min960} {
    zoom: 0.5; /* 960×600, 1920×1200 @ 200% */
  }
  ${media.min1024} {
    zoom: 0.533; /* 1024×768 */
  }
  ${media.min1097} {
    zoom: 0.571; /* 1097×617/686, 1920×1080/1200 @ 175% */
  }
  ${media.min1152} {
    zoom: 0.6; /* 1152×864 */
  }
  ${media.min1176} {
    zoom: 0.613; /* 1176×664 */
  }
  ${media.min1280} {
    zoom: 0.667; /* 1280×720/768/800/960/1024, 1920×1200 @ 150% */
  }
  ${media.min1360} {
    zoom: 0.708; /* 1360×768 */
  }
  ${media.min1366} {
    zoom: 0.713; /* 1366×768 */
  }
  ${media.min1440} {
    zoom: 0.75; /* 1440×1080 */
  }
  ${media.min1463} {
    zoom: 0.762; /* 1463×823 */
  }
  ${media.min1536} {
    zoom: 0.8; /* 1536×864/960, 1920×1080/1200 @ 125% */
  }
  ${media.min1600} {
    zoom: 0.833; /* 1600×900/1024/1200 */
  }
  ${media.min1680} {
    zoom: 0.875; /* 1680×1050 */
  }
  ${media.min1707} {
    zoom: 0.889; /* 1707×960 */
  }
  ${media.min1720} {
    zoom: 0.896; /* 1720×720, 3440×1440 @ 200% */
  }
  ${media.min1920} {
    zoom: 1; /* 1920×1080 */
  }
  ${media.min1965} {
    zoom: 1.023; /* 1965×822, 3440×1440 @ 175% */
  }
  ${media.min2048} {
    zoom: 1.067; /* 2048×1280 */
  }
  ${media.min2293} {
    zoom: 1.194; /* 2293×960, 3440×1440 @ 150% */
  }
  ${media.min2560} {
    zoom: 1.333; /* 2560×1600 */
  }
  ${media.min2752} {
    zoom: 1.433; /* 2752×1152, 3440×1440 @ 125% */
  }
  ${media.min3440} {
    zoom: 1.792; /* 3440×1440 @ 100% */
  }
  ${media.min3840} {
    zoom: 2;
  }
  ${media.min5120} {
    zoom: 2.667; /* 21:9, 32:9 */
  }
`;

export const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 24px 60px;
  box-sizing: border-box;

  ${media.max768} {
    padding: 16px 16px 48px;
  }
`;

/** Хлебные крошки: Home > Poker School */
export const Breadcrumbs = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);

  ${media.max600} {
    margin-bottom: 16px;
    font-size: 12px;
  }
`;

export const BreadcrumbLink = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: #fff;
  }
`;

export const BreadcrumbSep = styled.span`
  color: rgba(255, 255, 255, 0.5);
`;

/** Обёртка поиска: по центру под крошками, ширина как у SearchBar */
export const SearchWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
  position: relative;
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  ${media.max600} {
    margin-bottom: 24px;
    max-width: 100%;
  }
`;

/** Строка поиска: слева блок с обводкой (инпут), справа красная кнопка без обводки */
export const SearchBar = styled.div`
  border: 1px solid rgba(251, 251, 251, 0.15);
  border-radius: 8px;
  background: rgba(28, 28, 28, 0.45);
  display: flex;
  align-items: stretch;
  gap: 10px;
  width: 100%;
  max-width: 600px;
  min-height: 48px;
  padding: 10px;
  box-sizing: border-box;

  ${media.max600} {
    max-width: 100%;
  }
`;

/** Обводка только вокруг поля ввода и кнопки «очистить» */
export const SearchInputWrap = styled.div`
  display: flex;
  align-items: stretch;
  flex: 1;
  min-width: 0;
  border: 1px solid transparent;
  border-radius: 8px;
  overflow: hidden;

  &:focus-within {
    border-color: #909090;
  }
`;

/** Внутренняя область: тёмно-серый фон, чипы тегов (скролл) + поле ввода */
export const SearchBarInner = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
  padding: 10px 14px 10px 16px;
  background: #2b2b2b;
`;

/** Обёртка тегов: бесконечная прокрутка, слева фейд */
export const SearchTagsScrollWrap = styled.div`
  position: relative;
  flex: 0 1 auto;
  max-width: 260px;
  min-width: 0;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 16px;
    background: linear-gradient(to right, #2b2b2b 0%, transparent 100%);
    pointer-events: none;
    z-index: 1;
  }
`;

/** Контейнер горизонтального скролла тегов (бесконечная прокрутка) */
export const SearchTagsScroll = styled.div`
  width: 100%;
  min-width: 0;
  padding-left: 4px;
  padding-right: 8px;
  box-sizing: border-box;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x;

  &::-webkit-scrollbar {
    display: none;
  }
`;

/** Дорожка из двух одинаковых наборов тегов для бесконечного цикла */
export const SearchTagsScrollTrack = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: max-content;
`;

/** Один набор тегов (дублируется в Track для зацикливания) */
export const SearchTagsScrollSet = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  padding-right: 12px;
`;

/** Чип выбранного тега внутри строки поиска (с крестиком для удаления) */
export const SearchTagChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px 4px 10px;
  border-radius: 6px;
  background: #383737;
  border: 1px solid rgba(255, 255, 255, 0.15);
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  color: rgba(132, 133, 138, 1);
  flex-shrink: 0;
`;

export const SearchTagChipRemove = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  background: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  border-radius: 2px;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    width: 10px;
    height: 10px;
  }
`;

/** Поле ввода внутри строки поиска (без рамки, фон от SearchBarInner); всегда виден плейсхолдер */
export const SearchInput = styled.input`
  flex: 1;
  min-width: 140px;
  height: 28px;
  padding: 0 8px 0 4px;
  border: none;
  background: transparent;
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  box-sizing: border-box;

  &::placeholder {
    color: #a0a0a0;
  }

  &:focus {
    outline: none;
  }
`;

/** Кнопка «очистить всё» (иконка корзины), визуально в едином блоке с полем */
export const SearchClearBtn = styled.button`
  width: 40px;
  height: 100%;
  min-height: 48px;
  border: none;
  background: #2b2b2b;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    color: #fff;
    background: #333;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

/** Кнопка поиска (лупа): фиксированный размер, не растягивается при множестве тегов; брендовый красный #D70022 */
export const SearchButton = styled.button`
  width: 52px;
  min-width: 52px;
  height: 48px;
  align-self: center;
  border: none;
  border-radius: 8px;
  background: #d70022;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    background: #b8001e;
  }

  svg {
    width: 22px;
    height: 22px;
  }
`;

/** Выпадающая панель под поиском: подсказки / Popular Tags + Recent Searches */
export const SearchDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 10px;
  width: 100%;
  max-width: 600px;
  max-height: 360px;
  overflow-y: auto;
  background: rgba(39, 39, 39, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 18px 20px;
  box-sizing: border-box;
  z-index: 50;
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.5);

  ${media.max600} {
    max-width: 100%;
  }
`;

export const SearchDropdownSection = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SearchDropdownTitle = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const SearchDropdownClear = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  background: #2d2e33;
  color: rgba(255, 255, 255, 0.6);
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
    background: #36373c;
  }
`;

/** Теги (Popular Tags): чипы с тёмным фоном и светлой обводкой */
export const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const TagChip = styled.button`
  padding: 3px 6px;
  border: 1px solid #505050;
  border-radius: 4px;
  background: rgba(39, 39, 39, 0.8);
  color: #fff;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    border-color: rgba(255, 255, 255, 0.5);
    background: #36373c;
  }
`;

/** Список недавних поисков */
export const RecentList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const RecentItem = styled.li`
  padding: 2px 0;
`;

export const RecentItemButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  cursor: pointer;
  padding: 4px 0;

  &:hover {
    color: #fff;
  }
`;

export const RecentItemIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.5);
`;

/** Подсказки при вводе (статьи/теги), макс 10 — с иконкой лупы слева */
export const SuggestionsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const SuggestionItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
  }
`;

export const SuggestionIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.5);
`;

/** Сетка карточек: 4 колонки десктоп, 2 мобилка */
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, ${CARD_WIDTH_DESKTOP}px);
  grid-auto-rows: ${CARD_HEIGHT}px;
  gap: ${GRID_GAP}px;
  justify-content: center;
  width: 100%;

  ${media.max1024} {
    grid-template-columns: repeat(2, minmax(0, ${CARD_WIDTH_DESKTOP}px));
  }

  ${media.max600} {
    grid-template-columns: repeat(2, ${CARD_WIDTH_MOBILE}px);
    grid-auto-rows: ${CARD_HEIGHT}px;
    gap: 12px;
  }
`;

/** Одна карточка статьи: 344×568 десктоп, 164×568 мобилка. Инфо внизу показывается при наведении. */
export const Card = styled.article`
  position: relative;
  width: 100%;
  height: ${CARD_HEIGHT}px;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  cursor: pointer;
  border: 2px solid transparent;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    border-color: #d70022;
  }
`;

export const CardImage = styled.div<{ $imageUrl?: string }>`
  position: absolute;
  inset: 0;
  background-image: ${({ $imageUrl }) =>
    $imageUrl ? `url(${$imageUrl})` : "none"};
  background-size: cover;
  background-position: center;
  pointer-events: none;
`;

/** Контейнер встроенного вертикального видео (Shorts) в карточке */
export const CardVideoEmbed = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
`;

/** Обёртка iframe: вертикальный формат 9:16 */
export const CardVideoIframeWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 100%;
  aspect-ratio: 9 / 16;
  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

/** Кнопка закрытия плеера в карточке — возврат к обложке */
export const CardVideoClose = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 3;
  width: 36px;
  height: 36px;
  background-color: rgba(0, 0, 0, 0.65);
  background-image: url(${closeIcon.src});
  background-size: 20px;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.85);
  }
`;

export const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    transparent 100%
  );
  pointer-events: none;
`;

/** Тег сверху карточки (левый верхний угол) */
export const CardTag = styled.span`
  height: 32px;
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3px 6px;
  gap: 6px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 4px;
  font-weight: 400;
  font-size: 12px;
  color: #fff;
  pointer-events: none;
`;

export const CardContent = styled.div`
  position: relative;
  z-index: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: auto;
`;

/** Обёртка оверлея и контента внизу карточки — всегда видима */
export const CardInfoWrap = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  pointer-events: none;
  opacity: 1;
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.3;
  color: #fff;
  text-transform: uppercase;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${media.max600} {
    font-size: 12px;
    -webkit-line-clamp: 2;
  }
`;

export const CardSubtitle = styled.p`
  margin: 0;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 13px;
  line-height: 1.35;
  color: rgba(255, 255, 255, 0.85);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${media.max600} {
    font-size: 11px;
  }
`;

export const CardButton = styled.button`
  align-self: flex-start;
  margin-top: 4px;
  padding: 10px 20px;
  min-width: 140px;
  height: 40px;
  background: #d70022;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #b8001c;
  }
`;

/** Иконка воспроизведения для видео-карточки (декоративная) */
export const CardPlayIcon = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  svg {
    width: 28px;
    height: 28px;
    margin-left: 4px;
    fill: #fff;
  }
`;

/** Кнопка Play — по клику открывает видео в модалке */
export const CardPlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  svg {
    width: 28px;
    height: 28px;
    margin-left: 4px;
    fill: #fff;
  }
`;

/** Блок "Нет результатов" + рекомендуемые карточки */
export const NoResultsBlock = styled.div`
  text-align: center;
  padding: 32px 24px;
  margin-bottom: 24px;
`;

export const NoResultsText = styled.p`
  margin: 0 0 16px;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
`;

export const RecommendedTitle = styled.h3`
  margin: 0 0 20px;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #fff;
  text-align: center;
`;

/** ---------- Модалка статьи (полный контент) ---------- */
export const ArticleOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
`;

export const ArticleBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 630px;
  /* Только max-height: иначе при короткой статье пустота на весь экран */
  max-height: 90vh;
  overflow: hidden;
  background: #181818;
  border-radius: 16px;
  padding: 24px;
  box-sizing: border-box;

  ${media.max600} {
    max-width: 343px;
    padding: 16px;
  }
`;

export const ArticleClose = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 44px;
  height: 44px;
  background: url(${closeIcon.src}) center / contain no-repeat;
  border: none;
  cursor: pointer;
  z-index: 2;

  ${media.max600} {
    width: 27px;
    height: 27px;
    top: 12px;
    right: 12px;
  }
`;

export const ArticleSubmenuName = styled.p`
  margin: 0 0 8px;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
`;

/** Малый заголовок (название карточки) — серый, фиксирован вверху модалки */
export const ArticleTitleSmall = styled.p`
  flex-shrink: 0;
  margin: 0 0 8px;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  line-height: 1.3;
`;

/** Главный заголовок статьи в модалке (subtitle карточки) — крупный белый, фиксирован вверху */
export const ArticleTitle = styled.h1`
  flex-shrink: 0;
  margin: 0 0 12px;
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  font-size: 24px;
  color: #fff;
  line-height: 1.3;

  ${media.max600} {
    font-size: 20px;
  }
`;

/** Тег статьи, фиксирован вверху модалки */
export const ArticleTag = styled.span`
  flex-shrink: 0;
  display: inline-block;
  padding: 4px 10px;
  background: #2d2e33;
  border-radius: 6px;
  font-size: 12px;
  color: #fff;
`;

/** Обёртка для нескольких тегов в модалке (каждый тег отдельно) */
export const ArticleTagsWrap = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

export const ArticleBody = styled.div`
  /* 1 1 0 + родитель без фикс. height → basis 0, блок схлопывается, контент режется overflow:hidden */
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding-right: 16px;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);

  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.35) transparent;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-button {
    display: none !important;
    height: 0 !important;
    width: 0 !important;
    min-height: 0 !important;
    min-width: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
    border: none !important;
    background: transparent !important;
    visibility: hidden !important;
  }
  &::-webkit-scrollbar-button:vertical:start,
  &::-webkit-scrollbar-button:vertical:end,
  &::-webkit-scrollbar-button:horizontal:start,
  &::-webkit-scrollbar-button:horizontal:end {
    height: 0 !important;
    width: 0 !important;
    display: none !important;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.35);
    border-radius: 2px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  p {
    margin: 0 0 1em;
  }
  img {
    max-width: 100%;
    height: auto;
    margin: 16px 0;
    border-radius: 8px;
  }

  ol,
  ul {
    margin: 0 0 1em;
    padding-left: 1.5em;
    list-style-position: outside;
  }
  ol {
    list-style-type: decimal;
  }
  ul {
    list-style-type: disc;
  }
  li {
    margin: 0.25em 0;
  }
`;

export const ArticleImageWrap = styled.div`
  width: 630px;
  max-width: 100%;
  height: 300px;
  margin: 16px 0;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${media.max600} {
    width: 311px;
    height: 200px;
  }
`;

export const ArticleInlineButton = styled.a`
  display: inline-block;
  padding: 10px 24px;
  max-width: 294px;
  height: 37px;
  box-sizing: border-box;
  background: ${accentRed};
  border-radius: 6px;
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  margin: 8px 0;
  line-height: 17px;

  &:hover {
    background: #a0182f;
  }

  ${media.max600} {
    max-width: 311px;
  }
`;

/** ---------- Модалка видео (воспроизведение в этом же окне) ---------- */
export const VideoOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
`;

export const VideoBox = styled.div<{ $isShorts?: boolean }>`
  position: relative;
  width: ${({ $isShorts }) => ($isShorts ? "360px" : "100%")};
  max-width: ${({ $isShorts }) => ($isShorts ? "360px" : "900px")};
  aspect-ratio: ${({ $isShorts }) => ($isShorts ? "9 / 16" : "16 / 9")};
  border-radius: 12px;
  overflow: hidden;
  background: #000;
  flex-shrink: 0;

  ${media.max600} {
    width: ${({ $isShorts }) => ($isShorts ? "min(360px, 100%)" : "100%")};
    max-width: 100%;
  }
`;

export const VideoClose = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 44px;
  height: 44px;
  background: rgba(0, 0, 0, 0.6) url(${closeIcon.src}) center / 20px no-repeat;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;

  &:hover {
    background-color: rgba(0, 0, 0, 0.85);
  }

  ${media.max600} {
    top: 8px;
    right: 8px;
    width: 36px;
    height: 36px;
    background-size: 16px;
  }
`;

export const VideoIframe = styled.iframe`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

/** ---------- Модалка превью видео: в стиле карточки (обложка, градиент, тег/title/text), клик по обложке → видео ---------- */
export const VideoPreviewOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
`;

/** Та же форма и стиль, что у Card: 344×568, border-radius 16px. overflow: visible, чтобы кнопка «Поделиться» (right: -48px) не обрезалась. */
export const VideoPreviewBox = styled.div`
  position: relative;
  width: ${CARD_WIDTH_DESKTOP}px;
  height: ${CARD_HEIGHT}px;
  border-radius: 16px;
  overflow: visible;
  flex-shrink: 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);

  ${media.max600} {
    width: min(90vw, ${CARD_WIDTH_DESKTOP}px);
    height: ${CARD_HEIGHT}px;
  }
`;

/** Внутренняя обёртка карточки: скругление и обрезка контента (изображение, оверлей, текст). */
export const VideoPreviewBoxInner = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 16px;
  overflow: hidden;
`;

/** Тег в превью видео — внизу блока контента (как на референсе: тёмный фон, обводка, белый текст) */
export const VideoPreviewTag = styled.span`
  width: fit-content;
  align-self: flex-start;
  height: 32px;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3px 6px;
  gap: 6px;
  margin-top: 12px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 4px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #fff;
`;

/** Кликабельная область по обложке для запуска видео */
export const VideoPreviewPlayHitarea = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/** Текст под заголовком в превью — 3 строки, как CardSubtitle */
export const VideoPreviewExcerpt = styled.p`
  margin: 0;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 13px;
  line-height: 1.35;
  color: rgba(255, 255, 255, 0.85);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

/** Кнопка «Поделиться»: квадратная с сильным скруглением, тёмно-серая, иконка — изогнутая стрелка */
export const VideoPreviewShareTrigger = styled.button`
  position: absolute;
  bottom: 24px;
  right: -58px;
  width: 44px;
  height: 44px;
  border: none;
  background: #474747;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;

  &:hover {
    background: #36373c;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

/** Попап «Поделиться»: тёмно-серый прямоугольник со скруглёнными углами, непрозрачный фон */
export const VideoPreviewShareBlock = styled.div`
  position: absolute;
  bottom: 76px;
  right: -234px;
  padding: 0;
  background: #2d2e33;
  border-radius: 6px;
  min-width: 224px;
  overflow: hidden;
  z-index: 6;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
`;

/** Строка «Ссылка скопирована»: светлее фон строки, белый текст и галочка */
export const VideoPreviewShareCopied = styled.p`
  margin: 0;
  padding: 12px 14px;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  color: #fff;
  background: #36373c;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const VideoPreviewShareIcons = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  gap: 2px;
`;

export const VideoPreviewShareLink = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  color: #fff;
  text-decoration: none;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
    flex-shrink: 0;
    filter: brightness(0) invert(1);
  }

  span[aria-hidden] {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #fff;
  }
`;

/** ---------- Модалка предпросмотра карточки 770×466 ---------- */
export const PreviewOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
`;

export const PreviewBox = styled.div`
  position: relative;
  width: 466px;
  height: 770px;
  border-radius: 12px;
  overflow: hidden;
  background: #181818;
  border: 2px solid ${accentRed};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);

  ${media.max600} {
    width: 90vw;
    max-width: 360px;
    height: auto;
    min-height: 400px;
  }
`;

export const PreviewImage = styled.div<{ $imageUrl?: string }>`
  position: absolute;
  inset: 0;
  background-image: ${({ $imageUrl }) =>
    $imageUrl ? `url(${$imageUrl})` : "none"};
  background-size: cover;
  background-position: center;
`;

export const PreviewOverlayGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 50%);
`;

export const PreviewContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
`;

export const PreviewTitle = styled.h3`
  margin: 0 0 8px;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #fff;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const PreviewText = styled.p`
  margin: 0 0 16px;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const PreviewCtaButton = styled.button`
  padding: 10px 20px;
  background: ${accentRed};
  border: none;
  border-radius: 6px;
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  cursor: pointer;
`;

/** Кнопка "Поделиться" справа внизу за карточкой */
export const ShareTrigger = styled.button`
  position: absolute;
  bottom: 24px;
  right: -48px;
  width: 40px;
  height: 40px;
  border: none;
  background: #2d2e33;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${accentRed};
  }
`;

/** Блок "Поделиться": ссылка скопирована + соцсети */
export const ShareBlock = styled.div`
  position: absolute;
  bottom: 24px;
  right: -48px;
  padding: 12px;
  background: #242424;
  border-radius: 8px;
  border: 1px solid #404147;
  min-width: 160px;
`;

export const ShareCopied = styled.p`
  margin: 0 0 10px;
  font-size: 13px;
  color: #4ade80;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ShareIcons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ShareLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${accentRed};
  }

  svg {
    flex-shrink: 0;
  }
`;
