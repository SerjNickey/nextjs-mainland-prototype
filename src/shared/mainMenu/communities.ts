import { getIconUrl } from "./mediaUrl";
import {
  cleanIncludedCountries,
  cleanExcludedCountries,
  isVisibleForCountry,
  type ExcludedCountryEntry,
} from "../countryVisibility";

export type MoreSocialItem = {
  id: string;
  name: string;
  iconUrl: string;
  width?: number;
  height?: number;
  link: string;
};

export type BaseCommunitiesRaw = Array<{
  name?: string;
  icon?: { file?: string; width?: number; height?: number };
  link?: string;
  included_countries?: ExcludedCountryEntry[];
  excluded_countries?: ExcludedCountryEntry[];
  active?: boolean;
}>;

export function getCommunityItemsFromBase(
  baseData: { communities?: BaseCommunitiesRaw } | undefined,
  countryCode: string,
  countryName: string
): MoreSocialItem[] {
  const raw = baseData?.communities ?? [];
  if (!Array.isArray(raw)) return [];
  const num = (v: unknown): number | undefined =>
    typeof v === "number" && Number.isFinite(v) && v > 0 ? v : undefined;
  return raw
    .filter(
      (item) =>
        item.active !== false &&
        isVisibleForCountry(
          cleanIncludedCountries(item.included_countries),
          cleanExcludedCountries(item.excluded_countries),
          countryCode,
          countryName
        ) &&
        typeof item.name === "string" &&
        item.name.trim() !== "" &&
        typeof item.link === "string" &&
        item.link.trim() !== ""
    )
    .map((item, index) => ({
      id: String(item.name ?? index),
      name: (item.name as string).trim(),
      iconUrl: getIconUrl(item.icon) || "",
      width: num(item.icon?.width),
      height: num(item.icon?.height),
      link: (item.link as string).trim(),
    }));
}
