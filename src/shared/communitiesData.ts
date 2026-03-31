/**
 * Общие типы и логика для данных communities (homePageApi).
 * Используется блоком Community, меню More в GrandMenu и др., без зависимости виджетов друг от друга.
 */
import { MEDIA_ORIGIN } from "../config/env";
import {
  cleanIncludedCountries,
  cleanExcludedCountries,
  isVisibleForCountry,
  type ExcludedCountryEntry,
} from "./countryVisibility";

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
    included_countries?: ExcludedCountryEntry[];
    excluded_countries?: ExcludedCountryEntry[];
    locale?: string;
    active?: boolean;
  }>;
  communities_active?: boolean;
} | null;

export type { ExcludedCountryEntry };

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
  const countryRules = raw.map((item) => ({
    item,
    included: cleanIncludedCountries(item.included_countries),
    excluded: cleanExcludedCountries(item.excluded_countries),
  }));
  let filtered = countryRules.filter(
    ({ item, included, excluded }) =>
      item.active !== false &&
      isVisibleForCountry(included, excluded, countryCode, countryName) &&
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
