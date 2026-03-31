import type { ActiveStatus } from "./types";

export const ACTIVE_VISIBLE: ActiveStatus[] = ["ON"];
export const PREVIEW_VISIBLE: ActiveStatus[] = ["ON", "Preview"];

export function isVisibleByActive(
  active: ActiveStatus,
  showPreview: boolean
): boolean {
  const allowed = showPreview ? PREVIEW_VISIBLE : ACTIVE_VISIBLE;
  return allowed.includes(active);
}

export function isVisibleByCountry(
  tabCountries: string[] | undefined,
  userCountryCode: string,
  userCountryName: string
): boolean {
  if (!tabCountries || tabCountries.length === 0) return true;
  const lower = (s: string) => s.toLowerCase().trim();
  const code = lower(userCountryCode);
  const name = lower(userCountryName);
  return tabCountries.some((c) => lower(c) === code || lower(c) === name);
}
