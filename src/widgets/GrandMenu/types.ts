/**
 * Типы главного меню (GrandMenu).
 *
 * Два слоя типов:
 * 1) Внутренние (MainMenuTab, MainMenuSubmenuItem, …) — используются в UI после mapBaseMenuToTabs.
 * 2) Формат base (BaseMenuItem, BaseMenuMenuItem, BaseMenuSubMenu) — сырой формат из baseData.menu.
 *
 * Маппинг base → internal делается в GrandMenu.tsx функцией mapBaseMenuToTabs.
 */

// --- Видимость и типы табов ---

/** Видимость: ON — показывать; Preview — только в режиме превью; OFF — скрыть. */
export type ActiveStatus = "ON" | "Preview" | "OFF";

/** Тип таба: standard/blog/info — с подменю; button — одна ссылка. */
export type TabType = "standard" | "button" | "blog" | "info";

/** Тип пункта подменю: link, article, languages_menu, social_media. */
export type SubmenuItemType =
  | "link"
  | "article"
  | "languages_menu"
  | "social_media";

// --- Элементы подменю (внутренний формат) ---

/** Обычная ссылка в подменю. */
export interface MainMenuLinkItem {
  type: "link";
  id: string;
  active: ActiveStatus;
  label: string;
  href: string;
}

/** Статья в подменю (title + href). */
export interface MainMenuArticleItem {
  type: "article";
  id: string;
  active: ActiveStatus;
  title: string;
  href: string;
}

/** Блок выбора языка: массив языков с code, label, flagUrl. */
export interface MainMenuLanguagesItem {
  type: "languages_menu";
  id: string;
  active: ActiveStatus;
  languages: Array<{ code: string; label: string; flagUrl?: string }>;
}

/** Соцсети (Item type: Social media) */
export interface MainMenuSocialItem {
  type: "social_media";
  id: string;
  active: ActiveStatus;
  items: Array<{
    id: string;
    label: string;
    href: string;
    iconUrl?: string;
    iconKey?: string; // x, vk, tiktok, youtube, telegram и т.д.
  }>;
}

/** Группа в подменю: опциональный title (например «Poker School») и массив items. */
export interface MainMenuSubmenuGroup {
  title?: string;
  items: MainMenuSubmenuItem[];
}

export type MainMenuSubmenuItem =
  | MainMenuLinkItem
  | MainMenuArticleItem
  | MainMenuLanguagesItem
  | MainMenuSocialItem;

// --- Таб главного меню (внутренний формат после маппинга) ---

/**
 * Один таб в шапке меню.
 * type "button" — одна ссылка (href, iconUrl из base menu_item).
 * type "standard"/"blog"/"info" — подменю (submenu), клик ведёт на раздел, ховер открывает выпадашку.
 */
export interface MainMenuTab {
  id: string;
  type: TabType;
  active: ActiveStatus;
  label: string;
  /** Страны, для которых показывается таб (коды или названия). Пустой массив = все страны */
  countries?: string[];
  /** Страны, для которых таб скрыт (формат base: excluded_countries) */
  excludedCountries?: string[];
  /** Иконка: url или ключ для маппинга */
  iconUrl?: string;
  iconKey?: string;
  /** Для type=button — ссылка/действие */
  href?: string;
  /** Для type=standard, blog, info — подменю */
  submenu?: MainMenuSubmenuGroup[] | MainMenuSubmenuItem[];
  /** Выравнивание подменю относительно таба */
  submenuAlign?: "left" | "right";
}

// --- Формат base (baseData.menu) ---

/** Пункт меню из base с type "menu_item": одна ссылка, value.title, value.url, value.icon?.file. */
export interface BaseMenuMenuItem {
  type: "menu_item";
  id: string;
  value: {
    title: string;
    url: string;
    icon?: { file: string };
    excluded_countries?: (string | null)[];
  };
}

/** Пункт меню из base с type "sub_menu": value.title, value.blocks (группы с title и items). */
export interface BaseMenuSubMenu {
  type: "sub_menu";
  id: string;
  value: {
    title: string;
    icon?: { file: string };
    blocks: Array<{
      title: string;
      items: Array<{
        title: string;
        url: string;
        icon?: { file: string };
        excluded_countries?: (string | null)[];
      }>;
    }>;
  };
}

/** Один пункт из baseData.menu: либо menu_item, либо sub_menu. */
export type BaseMenuItem = BaseMenuMenuItem | BaseMenuSubMenu;

/** Ответ API с массивом табов (legacy/mainMenuApi). GrandMenu сейчас берёт табы из baseData.menu. */
export interface MainMenuResponse {
  tabs: MainMenuTab[];
}
