import {
  collectTagsFromPayload,
  fetchBasePageJson,
  parseLinkTagHtml,
} from "@/lib/seo";

const defaultLocale =
  process.env.NEXT_PUBLIC_DEFAULT_LOCALE?.trim() || "en";

/**
 * Рендерит в <head> строки `<link ...>` из base API (`tags`), как в CMS.
 */
export async function SeoHeadLinks() {
  const data = await fetchBasePageJson(defaultLocale);
  const tags = collectTagsFromPayload(data);

  return (
    <>
      {tags.map((html, i) => {
        const p = parseLinkTagHtml(html);
        if (!p?.href) return null;
        return (
          <link
            key={`seo-link-${i}-${p.href}`}
            rel={p.rel}
            href={p.href}
            hrefLang={p.hrefLang}
          />
        );
      })}
    </>
  );
}
