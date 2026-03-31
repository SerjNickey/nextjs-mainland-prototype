import { MEDIA_ORIGIN } from "../../config/env";
import { isAppRoutePath } from "../../preloadRoutes";
import type { FooterBlock, RunningLineItem } from "./types";

export const normalizeUrl = (raw: string): string => {
  const t = raw?.trim() || "";
  if (!t) return "";
  if (t.startsWith("http://") || t.startsWith("https://")) return t;
  if (t.startsWith("//")) {
    const protocol =
      typeof window !== "undefined" ? window.location.protocol : "https:";
    return `${protocol}${t}`;
  }
  return `${MEDIA_ORIGIN}${t.startsWith("/") ? t : `/${t}`}`;
};

export const getImageUrl = (obj: { file?: string } | undefined): string => {
  if (typeof obj?.file === "string") return normalizeUrl(obj.file);
  return "";
};

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
    return isAppRoutePath(urlToInternalPath(href));
  } catch {
    return false;
  }
}

export const getBlockKey = (block: FooterBlock, index: number): string =>
  block.id ?? block.value?.title ?? `${block.type ?? "block"}-${index}`;

export function buildRunningLineDisplay(
  runningLine: RunningLineItem[]
): Array<RunningLineItem & { _displayKey?: string }> {
  const items: Array<RunningLineItem & { _displayKey?: string }> = [];
  const separatorImage = runningLine.find(
    (i): i is Extract<RunningLineItem, { type: "running_line_image" }> =>
      i.type === "running_line_image" && !!i.value?.file
  );
  runningLine.forEach((item, i) => {
    items.push(item);
    const next = runningLine[i + 1];
    if (
      item.type === "running_line_text" &&
      next?.type === "running_line_text" &&
      separatorImage
    ) {
      items.push({ ...separatorImage, _displayKey: `sep-${i}` });
    }
  });
  return items;
}
