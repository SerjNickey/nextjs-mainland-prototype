import { isAppRoutePath } from "../../preloadRoutes";

export function urlToInternalPath(href: string): string {
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

export function isInternalAppLink(href: string): boolean {
  try {
    const path = urlToInternalPath(href);
    return isAppRoutePath(path);
  } catch {
    return false;
  }
}

export function getTabPath(href: string): string {
  return urlToInternalPath(href);
}

export function isTabCurrentByRoute(tabPath: string, pathname: string): boolean {
  if (tabPath === "/") return pathname === "/";
  return pathname === tabPath || pathname.startsWith(tabPath + "/");
}
