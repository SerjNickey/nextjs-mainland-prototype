/**
 * Общие типы и логика для данных communities (homePageApi).
 * Используется блоком Community, меню More в GrandMenu и др., без зависимости виджетов друг от друга.
 */
import { MEDIA_ORIGIN } from "../config/env";

const normalizeUrl = (rawUrl: string) => {
  const trimmed = rawUrl.trim();
  if (!trimmed) return "";
  const protocol =
    typeof window !== "undefined" ? window.location.protocol : "https:";
  if (trimmed.startsWith("//")) return `${protocol}${trimmed}`;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    if (protocol === "https:" && trimmed.startsWith("http://"))
      return trimmed.replace("http://", "https://");
    return trimmed;
  }
  if (trimmed.startsWith("/")) return `${MEDIA_ORIGIN}${trimmed}`;
  return `${MEDIA_ORIGIN}/${trimmed}`;
};

const getFileUrl = (source?: { file?: unknown }) => {
  if (typeof source?.file === "string") return normalizeUrl(source.file);
  const fileObject = source?.file as { url?: unknown } | undefined;
  if (typeof fileObject?.url === "string") return normalizeUrl(fileObject.url);
  return "";
};

/** Одна соцсеть после нормализации (для отображения) */
export type CommunityItem = {
  id: string;
  name: string;
  iconUrl: string;
  link: string;
};

/** Данные секции communities из homePageApi */
export type HomePageCommunityData = {
  communities_title?: string;
  communities_subtitle?: string;
  communities?: Array<{
    name?: string;
    icon?: { file?: string };
    link?: string;
    excluded_countries?: (string | null)[];
    locale?: string;
    active?: boolean;
  }>;
  communities_active?: boolean;
} | null;

function cleanExcludedCountries(raw: (string | null)[] | undefined): string[] {
  if (!raw || !Array.isArray(raw)) return [];
  return raw.map(String).filter((s) => s && s !== "null" && s !== "undefined");
}

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

/**
 * Преобразует данные communities из homePageApi в массив CommunityItem с учётом страны.
 * @param maxItems — не передавать = вернуть все; передать 5 = только первые 5 (для блока Community).
 */
export function getItemsFromData(
  data: HomePageCommunityData,
  countryCode: string,
  countryName: string,
  maxItems?: number
): CommunityItem[] {
  const raw = data?.communities ?? [];
  if (!Array.isArray(raw)) return [];
  const excludedList = raw.map((item) => ({
    item,
    excluded: cleanExcludedCountries(item.excluded_countries),
  }));
  let filtered = excludedList.filter(
    ({ item, excluded }) =>
      item.active !== false &&
      !isExcludedByCountry(excluded, countryCode, countryName) &&
      typeof item.name === "string" &&
      item.name.trim() !== "" &&
      typeof item.link === "string" &&
      item.link.trim() !== ""
  );
  if (typeof maxItems === "number") filtered = filtered.slice(0, maxItems);
  return filtered.map(({ item }, index) => ({
    id: String(item.name ?? index),
    name: (item.name as string).trim(),
    iconUrl: getFileUrl(item.icon) || "",
    link: (item.link as string).trim(),
  }));
}
