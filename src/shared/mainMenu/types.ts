export type ActiveStatus = "ON" | "Preview" | "OFF";

export type TabType = "standard" | "button" | "blog" | "info";

export type SubmenuItemType =
  | "link"
  | "article"
  | "languages_menu"
  | "social_media";

export interface MainMenuLinkItem {
  type: "link";
  id: string;
  active: ActiveStatus;
  label: string;
  href: string;
  includedCountries?: string[];
  excludedCountries?: string[];
}

export interface MainMenuArticleItem {
  type: "article";
  id: string;
  active: ActiveStatus;
  title: string;
  href: string;
  includedCountries?: string[];
  excludedCountries?: string[];
}

export interface MainMenuLanguagesItem {
  type: "languages_menu";
  id: string;
  active: ActiveStatus;
  languages: Array<{ code: string; label: string; flagUrl?: string }>;
}

export interface MainMenuSocialItem {
  type: "social_media";
  id: string;
  active: ActiveStatus;
  items: Array<{
    id: string;
    label: string;
    href: string;
    iconUrl?: string;
    iconKey?: string;
  }>;
}

export interface MainMenuSubmenuGroup {
  title?: string;
  items: MainMenuSubmenuItem[];
}

export type MainMenuSubmenuItem =
  | MainMenuLinkItem
  | MainMenuArticleItem
  | MainMenuLanguagesItem
  | MainMenuSocialItem;

export interface MainMenuTab {
  id: string;
  type: TabType;
  active: ActiveStatus;
  label: string;
  countries?: string[];
  includedCountries?: string[];
  excludedCountries?: string[];
  iconUrl?: string;
  iconKey?: string;
  href?: string;
  submenu?: MainMenuSubmenuGroup[] | MainMenuSubmenuItem[];
  submenuAlign?: "left" | "right";
}

export interface BaseMenuMenuItem {
  type: "menu_item";
  id: string;
  value: {
    title: string;
    url: string;
    icon?: { file: string };
    included_countries?: (string | null | { name?: string; code?: string })[];
    excluded_countries?: (string | null | { name?: string; code?: string })[];
  };
}

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
        included_countries?: (string | null | { name?: string; code?: string })[];
        excluded_countries?: (string | null | { name?: string; code?: string })[];
      }>;
    }>;
  };
}

export type BaseMenuItem = BaseMenuMenuItem | BaseMenuSubMenu;

export interface MainMenuResponse {
  tabs: MainMenuTab[];
}
