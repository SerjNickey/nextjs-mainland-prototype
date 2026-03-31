# Next.js SSR SEO Technical Template

This template focuses on domain-aware SEO in Next.js:
- server-generated metadata per request
- API-driven SEO fields
- dynamic `robots.txt`

## 1) Expected API Contract

`GET /seo?domain={domain}&path={path}&locale={locale}`

Example response:

```json
{
  "title": "PokerPlanets - Bonuses",
  "description": "Claim welcome bonuses and promo offers.",
  "canonical": "https://pokerplanets.com/promos",
  "hreflang": [
    { "lang": "en", "url": "https://pokerplanets.com/promos" },
    { "lang": "ru", "url": "https://pokerplanets.ru/promos" },
    { "lang": "x-default", "url": "https://pokerplanets.com/promos" }
  ],
  "robots": {
    "index": true,
    "follow": true
  },
  "seoContent": {
    "title": "SEO Text Title",
    "body": "<p>SEO text block html</p>"
  }
}
```

---

## 2) `app/lib/seo.ts`

```ts
import { headers } from "next/headers";

export type SeoPayload = {
  title?: string;
  description?: string;
  canonical?: string;
  hreflang?: Array<{ lang: string; url: string }>;
  robots?: { index?: boolean; follow?: boolean };
  seoContent?: { title?: string; body?: string };
};

function getRequestHost(): string {
  const h = headers();
  const host = h.get("x-forwarded-host") || h.get("host") || "pokerplanets.com";
  return host.toLowerCase();
}

export function getCurrentDomain(): string {
  // Add normalization rules if needed (remove ports, map aliases, etc.)
  return getRequestHost().split(":")[0];
}

export async function fetchSeo(params: {
  path: string;
  locale?: string;
}): Promise<SeoPayload> {
  const domain = getCurrentDomain();
  const locale = params.locale || "en";
  const apiBase = process.env.SEO_API_BASE_URL;

  if (!apiBase) {
    throw new Error("SEO_API_BASE_URL is not set");
  }

  const url = new URL("/seo", apiBase);
  url.searchParams.set("domain", domain);
  url.searchParams.set("path", params.path);
  url.searchParams.set("locale", locale);

  const res = await fetch(url.toString(), {
    // Revalidate can be tuned later
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    // Fail soft for SEO safety
    return {};
  }

  return res.json();
}
```

---

## 3) Per-page metadata (`app/promos/page.tsx`)

```ts
import type { Metadata } from "next";
import { fetchSeo } from "../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeo({ path: "/promos", locale: "en" });

  const languages =
    seo.hreflang?.reduce<Record<string, string>>((acc, item) => {
      acc[item.lang] = item.url;
      return acc;
    }, {}) || {};

  return {
    title: seo.title || "PokerPlanets",
    description: seo.description || "PokerPlanets",
    alternates: {
      canonical: seo.canonical,
      languages
    },
    robots: {
      index: seo.robots?.index ?? true,
      follow: seo.robots?.follow ?? true
    }
  };
}

export default async function PromosPage() {
  const seo = await fetchSeo({ path: "/promos", locale: "en" });

  return (
    <main>
      {/* existing page UI */}
      {seo.seoContent?.title ? <h2>{seo.seoContent.title}</h2> : null}
      {seo.seoContent?.body ? (
        <section dangerouslySetInnerHTML={{ __html: seo.seoContent.body }} />
      ) : null}
    </main>
  );
}
```

---

## 4) Dynamic robots by domain (`app/robots.txt/route.ts`)

```ts
import { NextResponse } from "next/server";
import { headers } from "next/headers";

function host() {
  const h = headers();
  return (h.get("x-forwarded-host") || h.get("host") || "").toLowerCase();
}

function buildRobotsForDomain(domain: string): string {
  const isProdDomain =
    domain.includes("pokerplanets.com") || domain.includes("pokerplanets.ru");

  if (!isProdDomain) {
    return [
      "User-agent: *",
      "Disallow: /",
      ""
    ].join("\n");
  }

  const sitemap = domain.includes("pokerplanets.ru")
    ? "https://pokerplanets.ru/sitemap.xml"
    : "https://pokerplanets.com/sitemap.xml";

  return [
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    `Sitemap: ${sitemap}`,
    ""
  ].join("\n");
}

export async function GET() {
  const txt = buildRobotsForDomain(host());
  return new NextResponse(txt, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
```

---

## 5) Optional domain config map (`app/lib/domain-config.ts`)

```ts
export type DomainConfig = {
  defaultLocale: "en" | "ru";
  baseUrl: string;
};

export const DOMAIN_CONFIG: Record<string, DomainConfig> = {
  "pokerplanets.com": { defaultLocale: "en", baseUrl: "https://pokerplanets.com" },
  "www.pokerplanets.com": { defaultLocale: "en", baseUrl: "https://pokerplanets.com" },
  "pokerplanets.ru": { defaultLocale: "ru", baseUrl: "https://pokerplanets.ru" },
  "www.pokerplanets.ru": { defaultLocale: "ru", baseUrl: "https://pokerplanets.ru" }
};
```

---

## 6) SEO QA Checklist

- `curl -I https://domain/page` returns `200`.
- `view-source` contains final `<title>` and `<meta name="description">`.
- Canonical points to same-content preferred URL.
- `hreflang` includes `x-default` where required.
- `robots.txt` differs correctly per domain/environment.
- Search Console validates canonical and alternate pages.

---

## 7) Minimal migration order (SEO first)

1. Add Next.js app with one route (home or promos).
2. Implement `fetchSeo()` + `generateMetadata()`.
3. Add dynamic `robots.txt`.
4. Verify domain switching logic via host header.
5. Expand to remaining routes.
