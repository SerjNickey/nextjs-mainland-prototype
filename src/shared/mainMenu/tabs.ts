import type { MainMenuTab } from "./types";
import { normalizeSubmenu } from "./submenu";

export const MORE_TAB_LABELS = ["more", "еще", "ещё"];

export function isMoreTab(tab: MainMenuTab): boolean {
  const idLc = (tab.id ?? "").toLowerCase();
  if (idLc === "more" || idLc.endsWith("_more") || idLc.startsWith("more_")) {
    return true;
  }
  const label = tab.label?.toLowerCase().trim() ?? "";
  if (!label) return false;
  if (MORE_TAB_LABELS.includes(label)) return true;
  if (/^more\b/.test(label)) return true;
  return false;
}

export function hasSubmenu(tab: MainMenuTab): boolean {
  return (
    (tab.type === "standard" || tab.type === "blog" || tab.type === "info") &&
    !!tab.submenu &&
    normalizeSubmenu(tab.submenu).length > 0
  );
}
