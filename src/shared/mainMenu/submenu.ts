import type { MainMenuSubmenuGroup, MainMenuSubmenuItem, MainMenuTab } from "./types";
import { urlToInternalPath } from "./routing";

export function getFirstSubmenuHref(
  submenu: MainMenuSubmenuGroup[]
): string | undefined {
  for (const gr of submenu) {
    const first = gr.items.find((it) => "href" in it);
    if (first && "href" in first) return first.href;
  }
  return undefined;
}

export function getTabSectionPath(
  submenu: MainMenuSubmenuGroup[]
): string | undefined {
  const firstHref = getFirstSubmenuHref(submenu);
  if (!firstHref) return undefined;
  const path = urlToInternalPath(firstHref);
  if (path === "/" || path === "/home") return "/";
  const segments = path.split("/").filter(Boolean);
  return "/" + (segments[0] ?? "");
}

export function normalizeSubmenu(
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
