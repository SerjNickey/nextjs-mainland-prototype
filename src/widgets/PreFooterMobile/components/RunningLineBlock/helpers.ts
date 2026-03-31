import { MEDIA_ORIGIN } from "../../../../config/env";

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
