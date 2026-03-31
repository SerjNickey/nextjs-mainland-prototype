import type { BaseMenuItem, MainMenuSubmenuItem, MainMenuTab } from "./types";
import { getIconUrl } from "./mediaUrl";
import {
  cleanExcludedCountries,
  cleanIncludedCountries,
} from "../countryVisibility";

export function mapBaseMenuToTabs(menu: BaseMenuItem[]): MainMenuTab[] {
  return menu.map((entry) => {
    if (entry.type === "menu_item") {
      const v = entry.value;
      return {
        id: entry.id,
        type: "button" as const,
        active: "ON" as const,
        label: v.title,
        href: v.url,
        iconUrl: getIconUrl(v.icon),
        includedCountries: cleanIncludedCountries(v.included_countries),
        excludedCountries: cleanExcludedCountries(v.excluded_countries),
      };
    }
    const v = entry.value;
    return {
      id: entry.id,
      type: "standard" as const,
      active: "ON" as const,
      label: v.title,
      iconUrl: getIconUrl(v.icon),
      submenu: v.blocks.map((block) => ({
        title: block.title,
        items: block.items.map(
          (it, i): MainMenuSubmenuItem => ({
            type: "link" as const,
            id: it.url || `${block.title}-${i}`,
            active: "ON" as const,
            label: it.title,
            href: it.url,
            includedCountries: cleanIncludedCountries(it.included_countries),
            excludedCountries: cleanExcludedCountries(it.excluded_countries),
          })
        ),
      })),
      submenuAlign: "left" as const,
    };
  });
}
