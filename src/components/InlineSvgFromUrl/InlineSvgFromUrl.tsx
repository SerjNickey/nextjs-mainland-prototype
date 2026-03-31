import { useEffect, useState } from "react";
import type React from "react";

type SizeValue = number | string;

export interface InlineSvgFromUrlProps {
  src: string;
  className?: string;
  title?: string;
  size?: SizeValue;
  width?: SizeValue;
  height?: SizeValue;
  color?: string;
  /** Принудительно красит контуры/заливки через currentColor. */
  forceColor?: boolean;
  /** Что показать, если загрузка SVG невозможна. */
  fallback?: React.ReactNode;
}

type ParsedSvg = {
  attrs: Record<string, string>;
  inner: string;
};

const svgCache = new Map<string, ParsedSvg>();

/**
 * Уникальные id внутри одного SVG, чтобы на странице с несколькими инлайн-SVG
 * ссылки url(#…) не цеплялись к чужим <defs> (часто ломает градиенты Instagram и др.).
 */
function namespaceSvgLocalIds(svg: Element): void {
  const nodes = svg.querySelectorAll("[id]");
  if (nodes.length === 0) return;

  const prefix = `i${Math.random().toString(36).slice(2, 11)}`;
  const pairs: { old: string; new: string }[] = [];

  nodes.forEach((el) => {
    const oldId = el.getAttribute("id");
    if (!oldId) return;
    const newId = `${prefix}-${oldId}`;
    pairs.push({ old: oldId, new: newId });
    el.setAttribute("id", newId);
  });

  const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  let html = svg.innerHTML;
  pairs.sort((a, b) => b.old.length - a.old.length);

  for (const { old, new: newId } of pairs) {
    const o = escapeRe(old);
    html = html.replace(new RegExp(`url\\(#${o}\\)`, "gi"), `url(#${newId})`);
    html = html.replace(new RegExp(`url\\(['"]#${o}['"]\\)`, "gi"), `url(#${newId})`);
    html = html.replace(new RegExp(`="#${o}"`, "g"), `="#${newId}"`);
    html = html.replace(new RegExp(`='#${o}'`, "g"), `='#${newId}'`);
  }

  svg.innerHTML = html;
}

function toCssSize(value: SizeValue | undefined): string | undefined {
  if (value == null) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

function getDevProxyUrl(src: string): string | null {
  if (!import.meta.env.DEV) return null;

  const mediaOriginRaw = (import.meta.env.VITE_MEDIA_ORIGIN as string | undefined) ?? "";
  const mediaOrigin = mediaOriginRaw.replace(/\/$/, "");

  try {
    // Абсолютный URL -> /api + pathname, если это тот же media-origin.
    const u = new URL(src);
    if (mediaOrigin && u.origin !== mediaOrigin) return null;
    return `/api${u.pathname}${u.search}`;
  } catch {
    // Относительный путь -> тоже проксируем через /api.
    if (src.startsWith("/")) return `/api${src}`;
    return null;
  }
}

function getDevSvgInlineProxyUrl(src: string): string | null {
  if (!import.meta.env.DEV) return null;
  if (!src) return null;
  return `/api/svg-inline-proxy?url=${encodeURIComponent(src)}`;
}

function prepareInlineSvg(
  rawSvg: string,
  options: { title?: string; forceColor: boolean }
): ParsedSvg | null {
  if (typeof window === "undefined") return null;
  const parser = new DOMParser();
  const doc = parser.parseFromString(rawSvg, "image/svg+xml");
  const svg = doc.querySelector("svg");
  if (!svg) return null;

  // Безопасность: удаляем script и inline-обработчики событий.
  doc.querySelectorAll("script").forEach((node) => node.remove());
  doc.querySelectorAll("*").forEach((el) => {
    Array.from(el.attributes).forEach((attr) => {
      if (attr.name.toLowerCase().startsWith("on")) {
        el.removeAttribute(attr.name);
      }
    });
  });

  namespaceSvgLocalIds(svg);

  svg.removeAttribute("width");
  svg.removeAttribute("height");
  svg.setAttribute("focusable", "false");
  svg.setAttribute("aria-hidden", options.title ? "false" : "true");

  if (options.title) {
    const oldTitle = svg.querySelector("title");
    oldTitle?.remove();
    const titleNode = doc.createElementNS("http://www.w3.org/2000/svg", "title");
    titleNode.textContent = options.title;
    svg.prepend(titleNode);
  }

  if (options.forceColor) {
    // Удаляем встроенные CSS-правила внутри SVG, которые часто перебивают currentColor.
    doc.querySelectorAll("style").forEach((node) => node.remove());

    doc.querySelectorAll("[fill]").forEach((el) => {
      const fill = (el.getAttribute("fill") ?? "").trim().toLowerCase();
      if (
        fill &&
        fill !== "none" &&
        fill !== "currentcolor" &&
        !fill.startsWith("url(")
      ) {
        el.setAttribute("fill", "currentColor");
      }
    });
    doc.querySelectorAll("[stroke]").forEach((el) => {
      const stroke = (el.getAttribute("stroke") ?? "").trim().toLowerCase();
      if (
        stroke &&
        stroke !== "none" &&
        stroke !== "currentcolor" &&
        !stroke.startsWith("url(")
      ) {
        el.setAttribute("stroke", "currentColor");
      }
    });

    // Если цвет зашит в style="fill:...;stroke:...;", тоже переопределяем.
    doc.querySelectorAll("[style]").forEach((el) => {
      const style = el.getAttribute("style") ?? "";
      if (!style) return;
      let next = style;
      next = next.replace(
        /fill\s*:\s*(?!none\b|currentColor\b)[^;]+/gi,
        "fill: currentColor"
      );
      next = next.replace(
        /stroke\s*:\s*(?!none\b|currentColor\b)[^;]+/gi,
        "stroke: currentColor"
      );
      el.setAttribute("style", next);
    });

    // Для SVG без fill/stroke атрибутов (частый случай) задаем цвет на корне.
    if (!svg.getAttribute("fill")) {
      svg.setAttribute("fill", "currentColor");
    }
  }

  const attrs: Record<string, string> = {};
  Array.from(svg.attributes).forEach((attr) => {
    attrs[attr.name] = attr.value;
  });

  return { attrs, inner: svg.innerHTML };
}

export default function InlineSvgFromUrl({
  src,
  className,
  title,
  size = 20,
  width,
  height,
  color,
  forceColor = true,
  fallback = null,
}: InlineSvgFromUrlProps) {
  const [parsedSvg, setParsedSvg] = useState<ParsedSvg | null>(null);
  const [failed, setFailed] = useState(false);

  const cssWidth = toCssSize(width ?? size);
  const cssHeight = toCssSize(height ?? size);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function run() {
      if (!src) {
        setFailed(true);
        setParsedSvg(null);
        return;
      }

      const cacheKey = `${src}|${title ?? ""}|${forceColor ? "1" : "0"}`;
      const cached = svgCache.get(cacheKey);
      if (cached) {
        if (!mounted) return;
        setParsedSvg(cached);
        setFailed(false);
        return;
      }

      try {
        const tryLoad = async (url: string): Promise<ParsedSvg> => {
          const response = await fetch(url, { signal: controller.signal });
          if (!response.ok) throw new Error(`Failed to fetch svg: ${response.status}`);
          const text = await response.text();
          const prepared = prepareInlineSvg(text, { title, forceColor });
          if (!prepared) throw new Error("Invalid SVG markup");
          return prepared;
        };

        let prepared: ParsedSvg;
        try {
          prepared = await tryLoad(src);
        } catch {
          // 1) Пробуем существующий /api proxy (если URL совпадает с media-origin)
          const proxiedByApi = getDevProxyUrl(src);
          if (proxiedByApi) {
            try {
              prepared = await tryLoad(proxiedByApi);
              svgCache.set(cacheKey, prepared);
              if (!mounted) return;
              setParsedSvg(prepared);
              setFailed(false);
              return;
            } catch {
              // fallback ниже
            }
          }

          // 2) Универсальный dev-proxy через middleware (обходит browser CORS)
          const proxiedInline = getDevSvgInlineProxyUrl(src);
          if (!proxiedInline) throw new Error("Direct load failed and no proxy url");
          prepared = await tryLoad(proxiedInline);
        }

        svgCache.set(cacheKey, prepared);
        if (!mounted) return;
        setParsedSvg(prepared);
        setFailed(false);
      } catch {
        if (!mounted) return;
        setFailed(true);
        setParsedSvg(null);
      }
    }

    run();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, [src, title, forceColor]);

  if (failed || !parsedSvg) {
    return <span className={className}>{fallback}</span>;
  }

  const svgProps: React.SVGProps<SVGSVGElement> = {
    ...(parsedSvg.attrs as unknown as React.SVGProps<SVGSVGElement>),
    className,
    style: {
      width: cssWidth,
      height: cssHeight,
      color,
      display: "inline-block",
      verticalAlign: "middle",
    },
    role: title ? "img" : undefined,
    "aria-hidden": title ? undefined : true,
  };

  return (
    <svg {...svgProps} dangerouslySetInnerHTML={{ __html: parsedSvg.inner }} />
  );
}

