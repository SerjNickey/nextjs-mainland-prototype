import { isAppRoutePath } from "../../../../preloadRoutes";
import type { FooterBlock } from "../../types";
import { MEDIA_ORIGIN } from "../../../../config/env";

export const getBlockKey = (block: FooterBlock, index: number): string =>
  block.id ?? block.value?.title ?? `${block.type ?? "block"}-${index}`;

export function urlToInternalPath(href: string): string {
  if (href.startsWith("/")) {
    const norm = href.replace(/\/$/, "") || "/";
    return norm === "/home" ? "/" : norm;
  }
  try {
    const pathname = new URL(href).pathname.replace(/\/$/, "") || "/";
    return pathname === "/home" ? "/" : pathname;
  } catch {
    return "/";
  }
}

export function isInternalAppLink(href: string): boolean {
  try {
    return isAppRoutePath(urlToInternalPath(href));
  } catch {
    return false;
  }
}

type InformationTextBlock =
  | { type: "paragraph"; value: string; id?: string }
  | {
      type: "table";
      value: {
        data?: unknown[][];
        first_row_is_table_header?: boolean;
      };
      id?: string;
    };

function normalizeDocImageUrl(raw: string): string {
  const t = raw?.trim() || "";
  if (!t) return "";
  if (t.startsWith("data:") || t.startsWith("blob:")) return t;
  if (t.startsWith("http://") || t.startsWith("https://")) return t;
  if (t.startsWith("//")) {
    const protocol =
      typeof window !== "undefined" ? window.location.protocol : "https:";
    return `${protocol}${t}`;
  }
  return `${MEDIA_ORIGIN}${t.startsWith("/") ? t : `/${t}`}`;
}

function normalizeHtmlImageUrls(html: string): string {
  if (!html) return html;
  return html.replace(
    /<img([^>]*)\ssrc="([^"]*)"/gi,
    (_, attrs, src) => `<img${attrs} src="${normalizeDocImageUrl(src)}"`
  );
}

export function informationTextToHtml(text: unknown): string {
  if (typeof text === "string") return normalizeHtmlImageUrls(text);
  if (!Array.isArray(text)) return "";
  const html = (text as InformationTextBlock[])
    .map((block) => {
      if (block?.type === "paragraph" && typeof block.value === "string") {
        return block.value;
      }
      if (block?.type === "table" && block.value?.data) {
        const rows = block.value.data as unknown[][];
        const firstIsHeader = block.value.first_row_is_table_header !== false;
        const escape = (s: unknown) =>
          String(s ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
        let tableHtml = "<table>";
        rows.forEach((row, i) => {
          const tag = firstIsHeader && i === 0 ? "th" : "td";
          tableHtml +=
            "<tr>" +
            (Array.isArray(row)
              ? row.map((cell) => `<${tag}>${escape(cell)}</${tag}>`).join("")
              : "") +
            "</tr>";
        });
        tableHtml += "</table>";
        return tableHtml;
      }
      return "";
    })
    .filter(Boolean)
    .join("");
  return normalizeHtmlImageUrls(html);
}
