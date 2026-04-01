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
  meta?: { tags?: string[]; robots_txt?: string };
};

/** Текст robots из корня ответа или `meta` (Wagtail / вложенные поля). */
export function extractRobotsTxtFromPayload(
  payload: BasePagePayload | null
): string | null {
  if (!payload) return null;
  const fromRoot =
    typeof payload.robots_txt === "string" ? payload.robots_txt : "";
  const fromMeta =
    typeof payload.meta?.robots_txt === "string"
      ? payload.meta.robots_txt
      : "";
  const raw = (fromRoot.trim() ? fromRoot : fromMeta).trim();
  return raw || null;
}

/**
 * Текст из API → корректный plain-text для ответа /robots.txt:
 * LF, без BOM; если в строке нет настоящих переносов, но есть литеральные `\n` из CMS — раскрываем.
 */
export function normalizeRobotsTxtBody(raw: string): string {
  let s = raw.replace(/^\uFEFF/, "");
  s = s.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  if (s.indexOf("\n") === -1 && /\\n/.test(s)) {
    s = s.replace(/\\n/g, "\n");
  }
  const lines = s.split("\n").map((line) => line.replace(/\s+$/u, ""));
  while (lines.length && lines[0] === "") lines.shift();
  while (lines.length && lines[lines.length - 1] === "") lines.pop();
  let out = lines.join("\n");
  if (out) out += "\n";
  return out;
}

/** Удаляет все строки Sitemap: и добавляет одну (если задан ROBOTS_SITEMAP_URL). */
function applyRobotsSitemapOverride(body: string, sitemapUrl: string): string {
  const url = sitemapUrl.trim();
  if (!url) return body;
  const lines = body.split("\n").filter((l) => !/^\s*Sitemap\s*:/i.test(l));
  while (lines.length && lines[lines.length - 1] === "") lines.pop();
  const base = lines.join("\n");
  const prefix = base ? `${base}\n\n` : "";
  return `${prefix}Sitemap: ${url}\n`;
}

/** Собирает строки `<link ...>` из корня ответа и из `meta.tags` (Wagtail). */
export function collectTagsFromPayload(
  payload: BasePagePayload | null
): string[] {
  if (!payload) return [];
  const fromRoot = Array.isArray(payload.tags) ? payload.tags : [];
  const metaTags = Array.isArray(payload.meta?.tags) ? payload.meta.tags : [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of [...fromRoot, ...metaTags]) {
    if (typeof t !== "string" || !t.trim()) continue;
    if (seen.has(t)) continue;
    seen.add(t);
    out.push(t);
  }
  return out;
}

/** Разбор одной HTML-строки `<link ...>` в пропсы для React `<link />`. */
export function parseLinkTagHtml(html: string): {
  rel?: string;
  href?: string;
  hrefLang?: string;
} | null {
  const trimmed = html.trim();
  if (!/<link\b/i.test(trimmed)) return null;
  const rel = trimmed.match(/rel\s*=\s*["']([^"']+)["']/i)?.[1];
  const href = trimmed.match(/href\s*=\s*["']([^"']+)["']/i)?.[1];
  const hrefLang = trimmed.match(/hreflang\s*=\s*["']([^"']+)["']/i)?.[1];
  if (!href) return null;
  return { rel, href, hrefLang };
}

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

  // canonical / hreflang — в документе через <SeoHeadLinks /> (см. app/layout.tsx)
  return {
    title,
    description,
  };
}

export async function fetchRobotsTxtBody(): Promise<string | null> {
  const data = await fetchBasePageJson("en");
  const raw = extractRobotsTxtFromPayload(data);
  if (!raw) return null;
  let body = normalizeRobotsTxtBody(raw);
  if (!body.trim()) return null;
  const sitemapOverride = process.env.ROBOTS_SITEMAP_URL?.trim();
  if (sitemapOverride) {
    body = applyRobotsSitemapOverride(body, sitemapOverride);
  }
  return body;
}
