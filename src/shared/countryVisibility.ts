export type ExcludedCountryEntry =
  | string
  | null
  | { name?: string; code?: string };
export type IncludedCountryEntry = ExcludedCountryEntry;

export function cleanExcludedCountries(
  raw: ExcludedCountryEntry[] | undefined
): string[] {
  if (!raw || !Array.isArray(raw)) return [];
  const result: string[] = [];
  for (const entry of raw) {
    if (entry == null) continue;
    if (typeof entry === "string") {
      const s = entry.trim();
      if (s && s !== "null" && s !== "undefined") result.push(s);
    } else if (typeof entry === "object") {
      if (typeof entry.code === "string" && entry.code.trim()) {
        result.push(entry.code.trim());
      }
      if (typeof entry.name === "string" && entry.name.trim()) {
        result.push(entry.name.trim());
      }
    }
  }
  return result;
}

export function cleanIncludedCountries(
  raw: IncludedCountryEntry[] | undefined
): string[] {
  return cleanExcludedCountries(raw);
}

export function isIncludedByCountry(
  included: string[] | undefined,
  userCountryCode: string,
  userCountryName: string
): boolean {
  if (!included || included.length === 0) return true;
  const lower = (s: string) => s.toLowerCase().trim();
  const code = lower(userCountryCode);
  const name = lower(userCountryName);
  return included.some(
    (c) => lower(String(c)) === code || lower(String(c)) === name
  );
}

export function isExcludedByCountry(
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

export function isVisibleForCountry(
  included: string[] | undefined,
  excluded: string[] | undefined,
  userCountryCode: string,
  userCountryName: string
): boolean {
  return (
    isIncludedByCountry(included, userCountryCode, userCountryName) &&
    !isExcludedByCountry(excluded, userCountryCode, userCountryName)
  );
}
