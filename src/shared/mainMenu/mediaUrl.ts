import { MEDIA_ORIGIN } from "../../config/env";

export function normalizeMediaUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return "";
  const protocol =
    typeof window !== "undefined" ? window.location.protocol : "https:";
  if (trimmed.startsWith("//")) return `${protocol}${trimmed}`;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://"))
    return trimmed;
  if (trimmed.startsWith("/")) return `${MEDIA_ORIGIN}${trimmed}`;
  return `${MEDIA_ORIGIN}/${trimmed}`;
}

export function getIconUrl(icon?: { file?: string }): string {
  if (typeof icon?.file === "string") return normalizeMediaUrl(icon.file);
  return "";
}
