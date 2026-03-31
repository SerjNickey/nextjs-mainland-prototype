import type { Metadata } from "next";

const DEFAULT_TITLE = "PokerPlanets";
const DEFAULT_DESCRIPTION = "PokerPlanets";

function apiOrigin(): string {
  return (
    process.env.API_ORIGIN ??
    process.env.NEXT_PUBLIC_API_ORIGIN ??
    process.env.NEXT_PUBLIC_MEDIA_ORIGIN ??
    "https://pokerplanets.pavva.org"
  ).replace(/\/$/, "");
}

export type BasePagePayload = Record<string, unknown> & {
  title?: string;
  meta_title?: string;
  description?: string;
  meta_description?: string;
  tags?: string[];
  robots_txt?: string;
};

export async function fetchBasePageJson(
  locale: string
): Promise<BasePagePayload | null> {
  const url = `${apiOrigin()}/api/v2/${locale || "en"}/base`;
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return (await res.json()) as BasePagePayload;
  } catch {
    return null;
  }
}

/** Парсинг `<link rel="canonical"` и `alternate` + hreflang из массива HTML-строк. */
function parseTagsForAlternates(tags: string[] | undefined): {
  canonical?: string;
  languages: Record<string, string>;
} {
  const languages: Record<string, string> = {};
  let canonical: string | undefined;

  if (!Array.isArray(tags)) return { languages: {} };

  for (const raw of tags) {
    const tag = raw.trim();
    if (!tag) continue;

    if (/rel\s*=\s*["']canonical["']/i.test(tag)) {
      const m = tag.match(/href\s*=\s*["']([^"']+)["']/i);
      if (m?.[1]) canonical = m[1];
      continue;
    }
    if (/rel\s*=\s*["']alternate["']/i.test(tag) && /hreflang/i.test(tag)) {
      const langM = tag.match(/hreflang\s*=\s*["']([^"']+)["']/i);
      const hrefM = tag.match(/href\s*=\s*["']([^"']+)["']/i);
      if (langM?.[1] && hrefM?.[1]) {
        languages[langM[1]] = hrefM[1];
      }
    }
  }

  return { canonical, languages };
}

export async function buildMetadataForLocale(
  locale: string
): Promise<Metadata> {
  const data = await fetchBasePageJson(locale);
  if (!data) {
    return {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
    };
  }

  const title =
    (typeof data.title === "string" && data.title) ||
    (typeof data.meta_title === "string" && data.meta_title) ||
    DEFAULT_TITLE;
  const description =
    (typeof data.description === "string" && data.description) ||
    (typeof data.meta_description === "string" && data.meta_description) ||
    DEFAULT_DESCRIPTION;

  const tags = Array.isArray(data.tags)
    ? data.tags.filter((t): t is string => typeof t === "string")
    : [];
  const { canonical, languages } = parseTagsForAlternates(tags);

  return {
    title,
    description,
    alternates: {
      ...(canonical ? { canonical } : {}),
      ...(Object.keys(languages).length > 0 ? { languages } : {}),
    },
  };
}

export async function fetchRobotsTxtBody(): Promise<string | null> {
  const data = await fetchBasePageJson("en");
  const raw = data?.robots_txt;
  return typeof raw === "string" && raw.trim() ? raw : null;
}
