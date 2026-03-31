/**
 * GrandMenu — главное навигационное меню лендинга.
 *
 * Данные берутся из basePageApi (baseData.menu). Поддерживаются:
 * - Табы-кнопки (menu_item): одна ссылка, иконка из icon.file.
 * - Табы с подменю (sub_menu): при клике — переход на раздел (/poker), при ховере — выпадающее меню.
 *
 * Роутинг: внутренняя ссылка по пути (содержимое после первого слэша), без привязки к домену.
 * home → "/". Подсветка активного таба по текущему pathname.
 */
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetBasePageQuery } from "../../store/basePageApi";
import { useGetHomePageQuery } from "../../store/homePageApi";
import type { RootState } from "../../store";
import {
  getItemsFromData,
  type CommunityItem,
  type HomePageCommunityData,
} from "../../shared/communitiesData";
import type {
  MainMenuTab,
  MainMenuSubmenuItem,
  MainMenuSubmenuGroup,
  ActiveStatus,
  BaseMenuItem,
} from "./types";
import * as S from "./GrandMenu.styled";
import LangSwitcher from "../../components/LangSwitcher/LangSwitcher";
import RegistrationForm from "../../widgets/RegistrationForm/RegistrationForm";
import { preloadRoute, preloadAllRoutes, isAppRoutePath } from "../../preloadRoutes";
import xcomIcon from "../../assets/icons/GrandMenu/xcom.webp";
import vkIcon from "../../assets/icons/GrandMenu/vk.webp";
import tiktokIcon from "../../assets/icons/GrandMenu/tiktok.webp";
import youtubeIcon from "../../assets/icons/GrandMenu/youtube.webp";
import telegramIcon from "../../assets/icons/GrandMenu/tg.webp";

const socialIconsObject = {
  x: xcomIcon,
  vk: vkIcon,
  tiktok: tiktokIcon,
  youtube: youtubeIcon,
  telegram: telegramIcon,
};

// --- Видимость по active ---
const ACTIVE_VISIBLE: ActiveStatus[] = ["ON"];
const PREVIEW_VISIBLE: ActiveStatus[] = ["ON", "Preview"];

/**
 * Показывать ли элемент по полю active.
 * Без showPreview — только ON; с showPreview — ON и Preview.
 */
function isVisibleByActive(
  active: ActiveStatus,
  showPreview: boolean
): boolean {
  const allowed = showPreview ? PREVIEW_VISIBLE : ACTIVE_VISIBLE;
  return allowed.includes(active);
}

// --- Фильтрация по стране ---

/**
 * Показывать таб, если он разрешён для страны пользователя.
 * Пустой/отсутствующий tabCountries = показывать везде.
 */
function isVisibleByCountry(
  tabCountries: string[] | undefined,
  userCountryCode: string,
  userCountryName: string
): boolean {
  if (!tabCountries || tabCountries.length === 0) return true;
  const lower = (s: string) => s.toLowerCase().trim();
  const code = lower(userCountryCode);
  const name = lower(userCountryName);
  return tabCountries.some((c) => lower(c) === code || lower(c) === name);
}

/**
 * Скрывать таб, если страна пользователя в списке excluded_countries из base.
 * Используется для табов из menu_item/sub_menu, у которых в value есть excluded_countries.
 */
function isExcludedByCountry(
  excluded: string[] | undefined,
  userCountryCode: string,
  userCountryName: string
): boolean {
  if (!excluded || excluded.length === 0) return false;
  const lower = (s: string) => s.toLowerCase().trim();
  const code = lower(userCountryCode);
  const name = lower(userCountryName);
  return excluded.some(
    (c) => lower(String(c)) === code || lower(String(c)) === name
  );
}

/** Из excluded_countries убрать null и строки "null"/"undefined". */
function cleanExcludedCountries(raw: (string | null)[] | undefined): string[] {
  if (!raw || !Array.isArray(raw)) return [];
  return raw.map(String).filter((s) => s && s !== "null" && s !== "undefined");
}

// --- Маппинг baseData.menu → внутренние табы ---

/**
 * Преобразует массив пунктов из baseData.menu в MainMenuTab[].
 * - menu_item → таб type "button", href из value.url, iconUrl из value.icon?.file.
 * - sub_menu → таб type "standard", подменю из value.blocks (каждый block = группа с title и items).
 */
function mapBaseMenuToTabs(menu: BaseMenuItem[]): MainMenuTab[] {
  return menu.map((entry) => {
    if (entry.type === "menu_item") {
      const v = entry.value;
      return {
        id: entry.id,
        type: "button" as const,
        active: "ON" as const,
        label: v.title,
        href: v.url,
        iconUrl: v.icon?.file,
        excludedCountries: cleanExcludedCountries(v.excluded_countries),
      };
    }
    const v = entry.value;
    return {
      id: entry.id,
      type: "standard" as const,
      active: "ON" as const,
      label: v.title,
      iconUrl: v.icon?.file,
      submenu: v.blocks.map((block) => ({
        title: block.title,
        items: block.items.map(
          (it, i): MainMenuSubmenuItem => ({
            type: "link" as const,
            id: it.url || `${block.title}-${i}`,
            active: "ON" as const,
            label: it.title,
            href: it.url,
          })
        ),
      })),
      submenuAlign: "left" as const,
    };
  });
}

// --- Роутинг и внутренние пути ---

/**
 * Превращает любой href в внутренний путь для React Router.
 * Правила: home → "/"; остальное — pathname из URL.
 */
function urlToInternalPath(href: string): string {
  if (href.startsWith("/")) {
    const norm = href.replace(/\/$/, "") || "/";
    return norm === "/home" ? "/" : norm;
  }
  try {
    const pathname = new URL(href).pathname.replace(/\/$/, "") || "/";
    return pathname === "/home" ? "/" : pathname;
  } catch {
    return "/";
  }
}

/**
 * Является ли href ссылкой на наше приложение.
 * По пути (содержимое после первого слэша), без проверки домена.
 */
function isInternalAppLink(href: string): boolean {
  try {
    const path = urlToInternalPath(href);
    return isAppRoutePath(path);
  } catch {
    return false;
  }
}

/** То же, что urlToInternalPath; имя для семантики «путь таба». */
function getTabPath(href: string): string {
  return urlToInternalPath(href);
}

/**
 * Совпадает ли путь таба с текущим роутом.
 * "/" — только при pathname === "/"; остальные — точное совпадение или pathname.startsWith(tabPath + "/").
 */
function isTabCurrentByRoute(tabPath: string, pathname: string): boolean {
  if (tabPath === "/") return pathname === "/";
  return pathname === tabPath || pathname.startsWith(tabPath + "/");
}

// --- Путь раздела для табов с подменю ---

/** URL первого пункта с href в подменю (нужен для вычисления пути раздела). */
function getFirstSubmenuHref(
  submenu: MainMenuSubmenuGroup[]
): string | undefined {
  for (const gr of submenu) {
    const first = gr.items.find((it) => "href" in it);
    if (first && "href" in first) return first.href;
  }
  return undefined;
}

/**
 * Путь раздела для таба с подменю: только первый сегмент (например /poker).
 * Берётся из первого href в подменю; home → "/". Используется при клике по табу (не по пункту подменю).
 */
function getTabSectionPath(
  submenu: MainMenuSubmenuGroup[]
): string | undefined {
  const firstHref = getFirstSubmenuHref(submenu);
  if (!firstHref) return undefined;
  const path = urlToInternalPath(firstHref);
  if (path === "/" || path === "/home") return "/";
  const segments = path.split("/").filter(Boolean);
  return "/" + (segments[0] ?? "");
}

// --- Подменю ---

/**
 * Приводит submenu к виду MainMenuSubmenuGroup[].
 * Если элементы — группы { title, items }, возвращает как есть; иначе оборачивает в одну группу без title.
 */
function normalizeSubmenu(
  submenu: MainMenuTab["submenu"]
): MainMenuSubmenuGroup[] {
  if (!submenu) return [];
  if (Array.isArray(submenu) && submenu.length > 0) {
    const first = submenu[0];
    if ("title" in first && "items" in first) {
      return submenu as MainMenuSubmenuGroup[];
    }
    return [{ items: submenu as MainMenuSubmenuItem[] }];
  }
  return [];
}

// --- Рендер пунктов подменю ---

/**
 * Рендер одного пункта подменю по type: link/article — ссылка (внутренний роут через Link, если isInternalAppLink);
 * languages_menu — кнопки языков; social_media — иконки соцсетей. В подменю иконки у пунктов не показываются.
 * Активный пункт (текущая страница) рисуется серым текстом через $current у DropdownLink.
 */
function SubmenuItemRender({
  item,
  showPreview,
  pathname,
}: {
  item: MainMenuSubmenuItem;
  showPreview: boolean;
  pathname: string;
}) {
  if (!isVisibleByActive(item.active, showPreview)) return null;

  switch (item.type) {
    case "link": {
      const href = item.href;
      const internal = isInternalAppLink(href);
      const isCurrent =
        internal && isTabCurrentByRoute(getTabPath(href), pathname);
      const path = urlToInternalPath(href);
      return internal ? (
        <S.DropdownLink
          key={item.id}
          as={
            Link as React.ComponentType<{
              to: string;
              children?: React.ReactNode;
            }>
          }
          to={path}
          onMouseEnter={() => preloadRoute(path)}
          $current={isCurrent}
        >
          {item.label}
        </S.DropdownLink>
      ) : (
        <S.DropdownLink key={item.id} href={href} $current={false}>
          {item.label}
        </S.DropdownLink>
      );
    }
    case "article": {
      const href = item.href;
      const internal = isInternalAppLink(href);
      const isCurrent =
        internal && isTabCurrentByRoute(getTabPath(href), pathname);
      const path = urlToInternalPath(href);
      return internal ? (
        <S.DropdownLink
          key={item.id}
          as={
            Link as React.ComponentType<{
              to: string;
              children?: React.ReactNode;
            }>
          }
          to={path}
          onMouseEnter={() => preloadRoute(path)}
          $current={isCurrent}
        >
          {item.title}
        </S.DropdownLink>
      ) : (
        <S.DropdownLink key={item.id} href={href} $current={false}>
          {item.title}
        </S.DropdownLink>
      );
    }
    case "languages_menu":
      return (
        <S.SocialRow key={item.id} style={{ padding: "8px 12px" }}>
          {item.languages.map((lang) => (
            <S.LangButton
              key={lang.code}
              type="button"
              title={lang.label}
              as="a"
              href="#"
              style={{ marginRight: 4 }}
            >
              {lang.flagUrl ? (
                <img src={lang.flagUrl} alt={lang.label} />
              ) : (
                lang.code.toUpperCase()
              )}
            </S.LangButton>
          ))}
        </S.SocialRow>
      );
    case "social_media":
      return (
        <S.SocialRow key={item.id}>
          {item.items.map((social) => (
            <S.SocialIconButton
              key={social.id}
              href={social.href}
              title={social.label}
            >
              {social.iconUrl ? (
                <img src={social.iconUrl} alt="" width={20} height={20} />
              ) : (
                social.label.charAt(0)
              )}
            </S.SocialIconButton>
          ))}
        </S.SocialRow>
      );
    default:
      return null;
  }
}

/** Порядок и допустимые названия соцсетей в More: только эти 5, в таком порядке. */
const MORE_SOCIAL_ORDER: Array<{ key: string; names: string[] }> = [
  { key: "x", names: ["x", "x.com", "twitter"] },
  { key: "vk", names: ["vk", "vkontakte", "вконтакте", "v k"] },
  { key: "tiktok", names: ["tiktok"] },
  { key: "youtube", names: ["youtube", "ютуб", "you tube"] },
  { key: "telegram", names: ["telegram", "телеграм", "tg"] },
];

type SocialIconKey = keyof typeof socialIconsObject;

/** Оставить только X.com, VK, TikTok, YouTube, Telegram и выстроить в порядке MORE_SOCIAL_ORDER. Возвращает пары { key, item } для подстановки иконок из socialIconsObject. */
function filterAndOrderMoreSocials(
  items: CommunityItem[]
): Array<{ key: SocialIconKey; item: CommunityItem }> {
  const norm = (s: string) => s.toLowerCase().trim().replace(/\./g, "");
  const result: Array<{ key: SocialIconKey; item: CommunityItem }> = [];
  const used = new Set<string>();
  for (const { key, names } of MORE_SOCIAL_ORDER) {
    const normNames = names.map((n) => n.replace(/\./g, ""));
    const found = items.find(
      (item) =>
        !used.has(item.id) && normNames.some((n) => norm(item.name) === n)
    );
    if (found) {
      result.push({ key: key as SocialIconKey, item: found });
      used.add(found.id);
    }
  }
  return result;
}

/** Ряд иконок соцсетей внизу дропдауна More: только X.com, VK, TikTok, YouTube, Telegram (в таком порядке). Иконки из socialIconsObject. */
function MoreSocialBlock({ items }: { items: CommunityItem[] }) {
  const ordered = React.useMemo(
    () => filterAndOrderMoreSocials(items),
    [items]
  );
  if (!ordered.length) return null;
  return (
    <S.DropdownSectionFooter>
      <S.SocialRow>
        {ordered.map(({ key, item }) => (
          <S.SocialIconWrap key={item.id}>
            <S.SocialIconTooltip>{item.name}</S.SocialIconTooltip>
            <S.SocialIconButton
              href={item.link}
              title={item.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={socialIconsObject[key]} alt="" width={20} height={20} />
            </S.SocialIconButton>
          </S.SocialIconWrap>
        ))}
      </S.SocialRow>
    </S.DropdownSectionFooter>
  );
}

/** Рендер всех групп подменю: заголовок группы (title) + список пунктов через SubmenuItemRender. */
function SubmenuContent({
  submenu,
  showPreview,
  pathname,
  excludeSocialSection = false,
}: {
  submenu: MainMenuSubmenuGroup[];
  showPreview: boolean;
  pathname: string;
  /** Для таба More: не рендерить группы, состоящие только из social_media (блок Social выводится отдельно внизу). */
  excludeSocialSection?: boolean;
}) {
  const groupsToRender = excludeSocialSection
    ? submenu.filter(
        (group) => !group.items.every((item) => item.type === "social_media")
      )
    : submenu;

  return (
    <>
      {groupsToRender.map((group, idx) => (
        <S.DropdownSection key={group.title ?? idx}>
          {group.title && (
            <S.DropdownSectionTitle>{group.title}</S.DropdownSectionTitle>
          )}
          {group.items
            .filter(
              (item) => !excludeSocialSection || item.type !== "social_media"
            )
            .map((item) => (
              <SubmenuItemRender
                key={item.id}
                item={item}
                showPreview={showPreview}
                pathname={pathname}
              />
            ))}
        </S.DropdownSection>
      ))}
    </>
  );
}

// --- Основной компонент GrandMenu ---

interface GrandMenuProps {
  /** true — показывать табы и пункты с active = "Preview" (для превью в БО). */
  showPreview?: boolean;
}

/**
 * GrandMenu: верхнее меню из baseData.menu.
 * - Данные: basePageApi → baseData.menu → mapBaseMenuToTabs → фильтр по стране и active.
 * - Табы: кнопка (одна ссылка), таб с подменю (клик → раздел, ховер → выпадашка), иначе ссылка.
 * - Иконки табов 22×22, цвет белый (filter в IconWrap). Подменю без иконок у пунктов.
 */
const GrandMenu = ({ showPreview = false }: GrandMenuProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const yourLang = useSelector(
    (s: RootState) => s.registration?.yourLang ?? "en"
  );
  const { data: baseData } = useGetBasePageQuery(yourLang);
  const { data: homeData } = useGetHomePageQuery(yourLang);
  const countryCode = useSelector(
    (s: RootState) => s.registration?.countryCodeReg ?? ""
  );
  const countryName = useSelector(
    (s: RootState) => s.registration?.countryReg ?? ""
  );

  // Без лимита (4-й аргумент не передаём) — все соцсети из API, затем filterAndOrderMoreSocials выберет X, VK, TikTok, YouTube, Telegram
  const communityItems = React.useMemo(
    () =>
      getItemsFromData(
        (homeData as HomePageCommunityData) ?? null,
        countryCode,
        countryName
      ),
    [homeData, countryCode, countryName]
  );

  const [openId, setOpenId] = useState<string | null>(null);
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Меню из base: один источник правды — baseData.menu
  const baseMenu = (baseData as { menu?: BaseMenuItem[] } | undefined)?.menu;
  const tabs: MainMenuTab[] =
    baseMenu && baseMenu.length > 0 ? mapBaseMenuToTabs(baseMenu) : [];

  // Показываем только табы, разрешённые по active, countries и excluded_countries
  const visibleTabs = tabs.filter(
    (tab) =>
      isVisibleByActive(tab.active, showPreview) &&
      isVisibleByCountry(tab.countries, countryCode, countryName) &&
      !isExcludedByCountry(tab.excludedCountries, countryCode, countryName)
  );

  // Ховер по табу с подменю: открыть выпадашку с небольшой задержкой закрытия при уходе
  const handleDropdownEnter = (tabId: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenId(tabId);
  };

  const handleDropdownLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setOpenId(null);
      closeTimerRef.current = null;
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // Сброс индикатора перехода при смене страницы
  useEffect(() => {
    setNavigatingTo(null);
  }, [pathname]);

  // Фоновая подгрузка чанков разделов через 2 с после mount (на slow 4G не мешает первой загрузке)
  useEffect(() => {
    const t = setTimeout(preloadAllRoutes, 2000);
    return () => clearTimeout(t);
  }, []);

  // Таб «More» / «Еще»: кастомный дропдаун с блоком Social внизу (без перехода по маршруту)
  const MORE_TAB_LABELS = ["more", "еще", "ещё"];
  const isMoreTab = (tab: MainMenuTab) =>
    tab.id === "more" ||
    (!!tab.label && MORE_TAB_LABELS.includes(tab.label.toLowerCase().trim()));

  // Таб считается «с подменю», если type standard/blog/info и есть непустое submenu
  const hasSubmenu = (tab: MainMenuTab) =>
    (tab.type === "standard" || tab.type === "blog" || tab.type === "info") &&
    tab.submenu &&
    normalizeSubmenu(tab.submenu).length > 0;

  return (
    <S.Wrapper>
      <S.NavInner>
        {visibleTabs.map((tab) => {
          // 1) Таб-кнопка: одна ссылка, внутренний роут через Link при isInternalAppLink
          if (tab.type === "button") {
            const href = tab.href ?? "#";
            const internal = isInternalAppLink(href);
            const to = internal ? urlToInternalPath(href) : href;
            const isCurrent = internal && isTabCurrentByRoute(to, pathname);
            const handleClick = internal
              ? (e: React.MouseEvent) => {
                  e.preventDefault();
                  setNavigatingTo(to);
                  navigate(to);
                }
              : undefined;
            return (
              <S.TabButton
                key={tab.id}
                as={internal ? Link : "a"}
                {...(internal ? { to, onClick: handleClick } : { href })}
                onMouseEnter={() => internal && preloadRoute(to)}
                onMouseDown={() => internal && preloadRoute(to)}
                $accent={tab.iconKey === "download_app"}
                $current={isCurrent}
                $navigating={internal && navigatingTo === to}
              >
                {tab.iconUrl && (
                  <S.IconWrap>
                    <img src={tab.iconUrl} alt="" width={22} height={22} />
                  </S.IconWrap>
                )}
                {tab.label}
              </S.TabButton>
            );
          }

          // 2) Таб с подменю: клик ведёт на раздел (getTabSectionPath), ховер открывает DropdownPanel
          if (hasSubmenu(tab)) {
            const submenuGroups = normalizeSubmenu(tab.submenu);
            const isOpen = openId === tab.id;
            const tabSectionPath = getTabSectionPath(submenuGroups);
            const isCurrent =
              (tabSectionPath != null &&
                isTabCurrentByRoute(tabSectionPath, pathname)) ||
              submenuGroups.some((gr) =>
                gr.items.some(
                  (it) =>
                    "href" in it &&
                    isTabCurrentByRoute(getTabPath(it.href), pathname)
                )
              );
            const handleTabClick = (e: React.MouseEvent) => {
              if (tabSectionPath != null && !isMoreTab(tab)) {
                e.preventDefault();
                setOpenId(null);
                setNavigatingTo(tabSectionPath);
                navigate(tabSectionPath);
              }
            };
            const isLinkTab =
              tabSectionPath != null && !isMoreTab(tab);
            return (
              <S.DropdownWrap
                key={tab.id}
                onMouseEnter={() => handleDropdownEnter(tab.id)}
                onMouseLeave={handleDropdownLeave}
              >
                <S.TabButton
                  $active={isOpen}
                  $current={isCurrent}
                  $navigating={
                    isLinkTab && navigatingTo === tabSectionPath
                  }
                  as={isLinkTab ? Link : "button"}
                  {...(isLinkTab
                    ? {
                        to: tabSectionPath!,
                        onMouseEnter: () => preloadRoute(tabSectionPath!),
                        onMouseDown: () => preloadRoute(tabSectionPath!),
                        onClick: handleTabClick,
                      }
                    : { type: "button" })}
                >
                  {tab.iconUrl && (
                    <S.IconWrap>
                      <img src={tab.iconUrl} alt="" width={22} height={22} />
                    </S.IconWrap>
                  )}
                  {tab.label}
                </S.TabButton>
                <S.DropdownPanel
                  $visible={isOpen}
                  $align={
                    tab.submenuAlign ?? (tab.id === "more" ? "right" : "left")
                  }
                >
                  <SubmenuContent
                    submenu={submenuGroups}
                    showPreview={showPreview}
                    pathname={pathname}
                    excludeSocialSection={isMoreTab(tab)}
                  />
                  {isMoreTab(tab) && <MoreSocialBlock items={communityItems} />}
                </S.DropdownPanel>
              </S.DropdownWrap>
            );
          }

          // 3) Обычная ссылка (fallback для остальных type)
          const href = tab.href ?? "#";
          const internal = isInternalAppLink(href);
          const to = internal ? urlToInternalPath(href) : href;
          const isCurrent = internal && isTabCurrentByRoute(to, pathname);
          const handleFallbackClick = internal
            ? (e: React.MouseEvent) => {
                e.preventDefault();
                setNavigatingTo(to);
                navigate(to);
              }
            : undefined;
          return (
            <S.TabButton
              key={tab.id}
              as={internal ? Link : "a"}
              {...(internal ? { to, onClick: handleFallbackClick } : { href })}
              onMouseEnter={() => internal && preloadRoute(to)}
              onMouseDown={() => internal && preloadRoute(to)}
              $current={isCurrent}
              $navigating={internal && navigatingTo === to}
            >
              {tab.iconUrl && (
                <S.IconWrap>
                  <img src={tab.iconUrl} alt="" width={22} height={22} />
                </S.IconWrap>
              )}
              {tab.label}
            </S.TabButton>
          );
        })}

        <RegistrationForm
          btnText={yourLang === "ru" ? "Скачать и играть" : "Download app"}
        />
        <LangSwitcher />
      </S.NavInner>
    </S.Wrapper>
  );
};

export default GrandMenu;
