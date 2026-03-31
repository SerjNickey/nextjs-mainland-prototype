import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";
import { useGetBasePageQuery } from "../../store/basePageApi";
import type { RootState } from "../../store";
import { MEDIA_ORIGIN } from "../../config/env";
import { isAppRoutePath } from "../../preloadRoutes";
import InlineSvgFromUrl from "../../components/InlineSvgFromUrl/InlineSvgFromUrl";
import {
  cleanIncludedCountries,
  cleanExcludedCountries,
  isVisibleForCountry,
  type ExcludedCountryEntry,
} from "../../shared/countryVisibility";
import * as S from "./NPreFooter.styled";

/**
 * Превращает href в путь для React Router (как в GrandMenu).
 * home → "/"; остальное — pathname из URL.
 */
function urlToInternalPath(href: string): string {
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

/** Внутренняя ссылка по пути (содержимое после первого слэша), без проверки домена. */
function isInternalAppLink(href: string): boolean {
  try {
    const path = urlToInternalPath(href);
    return isAppRoutePath(path);
  } catch {
    return false;
  }
}

const normalizeUrl = (raw: string) => {
  const t = raw?.trim() || "";
  if (!t) return "";
  if (t.startsWith("http") || t.startsWith("//")) return t;
  return `${MEDIA_ORIGIN}${t.startsWith("/") ? t : `/${t}`}`;
};

const getImageUrl = (obj: { file?: string } | undefined) => {
  if (typeof obj?.file === "string") return normalizeUrl(obj.file);
  return "";
};

const runtimeOrigin = () => {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin.replace(/\/$/, "");
  }
  return MEDIA_ORIGIN;
};

const normalizeDocImageUrl = (raw: string) => {
  const t = raw?.trim() || "";
  if (!t) return "";
  if (t.startsWith("data:") || t.startsWith("blob:")) return t;
  if (t.startsWith("http://") || t.startsWith("https://")) return t;
  if (t.startsWith("//")) {
    const protocol =
      typeof window !== "undefined" ? window.location.protocol : "https:";
    return `${protocol}${t}`;
  }
  const origin = runtimeOrigin();
  return `${origin}${t.startsWith("/") ? t : `/${t}`}`;
};

/** В HTML из API подменяет относительные src у img на полный URL (текущий origin), чтобы картинки отображались */
const normalizeHtmlImageUrls = (html: string): string => {
  if (!html) return html;
  return html.replace(
    /<img([^>]*)\ssrc="([^"]*)"/gi,
    (_, attrs, src) => `<img${attrs} src="${normalizeDocImageUrl(src)}"`
  );
};

/** Блок text в information: paragraph (value=HTML) или table (value={data: string[][]}) */
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

type InformationLineItem = {
  title?: string;
  slug?: string;
  url?: string;
  text?: string | InformationTextBlock[];
};

type InformationDoc = {
  title: string;
  slug: string;
  html: string;
  titleKey: string;
};

/** Преобразует text (строка или массив блоков из API) в HTML для рендера в попапе */
function informationTextToHtml(text: unknown): string {
  if (typeof text === "string") return text;
  if (!Array.isArray(text)) return "";
  return (text as InformationTextBlock[])
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
        let html = "<table>";
        rows.forEach((row, i) => {
          const tag = firstIsHeader && i === 0 ? "th" : "td";
          html +=
            "<tr>" +
            (Array.isArray(row)
              ? row.map((cell) => `<${tag}>${escape(cell)}</${tag}>`).join("")
              : "") +
            "</tr>";
        });
        html += "</table>";
        return html;
      }
      return "";
    })
    .filter(Boolean)
    .join("");
}

function toTitleKey(title: string): string {
  return title.replace(/\s+/g, " ").trim().toLowerCase();
}

function toHashValue(raw: string): string {
  const value = raw.startsWith("#") ? raw.slice(1) : raw;
  try {
    return decodeURIComponent(value).trim().toLowerCase();
  } catch {
    return value.trim().toLowerCase();
  }
}

function toSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toInformationDoc(line: InformationLineItem): InformationDoc | null {
  const title = String(line.title ?? "").trim();
  if (!title) return null;
  const slugRaw = String(line.slug ?? "").trim().toLowerCase();
  const slug = slugRaw || toSlugFromTitle(title);
  if (!slug) return null;
  return {
    title,
    slug,
    html: normalizeHtmlImageUrls(informationTextToHtml(line.text)),
    titleKey: toTitleKey(title),
  };
}

function replaceHash(slug?: string): void {
  const encoded = slug ? `#${encodeURIComponent(slug)}` : "";
  const { pathname, search } = window.location;
  window.history.replaceState(null, "", `${pathname}${search}${encoded}`);
}

function extractDocHashFromHref(href: string): string | null {
  const trimmed = href.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("#")) return toHashValue(trimmed);
  return null;
}

/** Формат элемента footer_blocks из REST: type, value.title, value.lines[] с title, url, text */
type FooterBlockItem = {
  type: string;
  id?: string;
  value: {
    title?: string;
    lines?: InformationLineItem[];
  };
};

type RunningLineItem =
  | { type: "running_line_image"; value: { file?: string }; id: string }
  | { type: "running_line_text"; value: string; id: string };

type LegalImageItem = {
  type: "legal_image";
  value: {
    image?: { file?: string };
    url?: string;
    included_countries?: ExcludedCountryEntry[];
    excluded_countries?: ExcludedCountryEntry[];
  };
  id: string;
};

type FooterCommunityItem = {
  name?: string;
  icon?: { file?: string; color?: string };
  link?: string;
  color?: string;
  included_countries?: ExcludedCountryEntry[];
  excluded_countries?: ExcludedCountryEntry[];
  active?: boolean;
};

const PreFooter = () => {
  const { yourLang } = useSelector((state: RootState) => state.registration);
  const countryCodeReg = useSelector(
    (state: RootState) => state.registration?.countryCodeReg ?? ""
  );
  const countryNameReg = useSelector(
    (state: RootState) => state.registration?.countryReg ?? ""
  );
  const pathname = usePathname();
  const { data } = useGetBasePageQuery(yourLang);

  /** Как в GrandMenu: страна из base, иначе из регистрации */
  const countryCode =
    (data as { user_country?: { code?: string } } | undefined)?.user_country
      ?.code ?? countryCodeReg;
  const countryName =
    (data as { user_country?: { name?: string } } | undefined)?.user_country
      ?.name ?? countryNameReg;

  /** Колонки — строго из data.footer_blocks (REST: массив { type, value: { title, lines: [{ title, url }] } }) */
  const footerBlocks: FooterBlockItem[] = Array.isArray(
    (data as { footer_blocks?: unknown })?.footer_blocks
  )
    ? (data as { footer_blocks: FooterBlockItem[] }).footer_blocks
    : [];
  const contactTitle = (data as { footer_contact_title?: string })
    ?.footer_contact_title;
  const contactLink = (data as { footer_contact_link?: string })
    ?.footer_contact_link;
  const socialTitle = (data as { footer_social_media_title?: string })
    ?.footer_social_media_title;
  const communities =
    (data as { communities?: FooterCommunityItem[] } | undefined)
      ?.communities ?? [];

  /** Как communityItems в GrandMenu (More): active, excluded_countries, name+link */
  const visibleFooterCommunities = useMemo(() => {
    return communities.filter((item) => {
      if (item.active === false) return false;
      if (
        !isVisibleForCountry(
          cleanIncludedCountries(item.included_countries),
          cleanExcludedCountries(item.excluded_countries),
          countryCode,
          countryName
        )
      ) {
        return false;
      }
      const name = item.name?.trim() ?? "";
      const link = item.link?.trim() ?? "";
      return name !== "" && link !== "";
    });
  }, [communities, countryCode, countryName]);

  /** В dev: полный срез полей футера в консоль — можно скопировать JSON и прислать как пример */
  useEffect(() => {
    if (process.env.NODE_ENV !== "development" || !data) return;
    const d = data as Record<string, unknown>;
    const sample = {
      footer_social_media_title: d.footer_social_media_title,
      communities: d.communities,
      footer_contact_title: d.footer_contact_title,
      footer_contact_link: d.footer_contact_link,
      footer_blocks: d.footer_blocks,
      footer_running_line: d.footer_running_line,
      footer_legal_text: d.footer_legal_text,
      footer_legal_images: d.footer_legal_images,
    };
    console.log("[NPreFooter] пример данных basePage (футер):", sample);
    try {
      console.log(
        "[NPreFooter] JSON для копирования ↓\n" +
          JSON.stringify(sample, null, 2)
      );
    } catch (e) {
      console.warn("[NPreFooter] JSON.stringify не удался", e);
    }
  }, [data]);

  /** Соцсети: порядок и состав как в ответе API (`communities`) */
  const runningLine =
    (data as { footer_running_line?: RunningLineItem[] })
      ?.footer_running_line ?? [];

  /** Бегущая строка: каждый текст разделён изображением; изображения 125×125 */
  const runningLineDisplay = useMemo(() => {
    const items: Array<RunningLineItem & { _displayKey?: string }> = [];
    const images = runningLine.filter(
      (
        i
      ): i is RunningLineItem & {
        type: "running_line_image";
        value: { file?: string };
      } => i.type === "running_line_image" && !!i.value?.file
    );
    const separatorImage = images[0];
    runningLine.forEach((item, i) => {
      items.push(item);
      const next = runningLine[i + 1];
      if (
        item.type === "running_line_text" &&
        next?.type === "running_line_text" &&
        separatorImage
      ) {
        items.push({ ...separatorImage, _displayKey: `sep-${i}` });
      }
    });
    return items;
  }, [runningLine]);

  const legalText = (data as { footer_legal_text?: string })?.footer_legal_text;
  const legalImages =
    (data as { footer_legal_images?: LegalImageItem[] })?.footer_legal_images ??
    [];

  const MAX_LEGAL_IMAGES = 5;
  const filteredLegalImages = legalImages
    .filter((item) => {
      if (item.type !== "legal_image") return false;
      const included = cleanIncludedCountries(item.value.included_countries);
      const excluded = cleanExcludedCountries(item.value.excluded_countries);
      return isVisibleForCountry(included, excluded, countryCode, countryName);
    })
    .slice(0, MAX_LEGAL_IMAGES);

  /** Попап для блоков type=information. Title и Full text в БО: footer_blocks, type=information, value.lines[].title и value.lines[].text */
  const [docModal, setDocModal] = useState<{
    open: boolean;
    title: string;
    html: string;
    slug: string;
  }>({
    open: false,
    title: "",
    html: "",
    slug: "",
  });
  const docModalBodyRef = useRef<HTMLDivElement>(null);
  const [hashValue, setHashValue] = useState<string>(() =>
    toHashValue(window.location.hash)
  );

  /** Список документов из блоков information для перехода по ссылке внутри попапа (мемо, чтобы не снимать обработчик клика при каждом рендере) */
  const informationDocs = useMemo(
    () =>
      footerBlocks
        .filter((b) => b.type === "information")
        .flatMap((b) => b.value?.lines ?? [])
        .map(toInformationDoc)
        .filter((doc): doc is InformationDoc => doc != null),
    [footerBlocks]
  );
  const docsBySlug = useMemo(
    () => new Map(informationDocs.map((doc) => [doc.slug, doc])),
    [informationDocs]
  );
  const docsByTitle = useMemo(
    () => new Map(informationDocs.map((doc) => [doc.titleKey, doc])),
    [informationDocs]
  );

  const openDocModal = useCallback(
    (doc: InformationDoc, options?: { syncHash?: "push" | "replace" | "none" }) => {
      setDocModal({
        open: true,
        title: doc.title,
        html: doc.html,
        slug: doc.slug,
      });
      if (options?.syncHash === "replace") {
        replaceHash(doc.slug);
        setHashValue(doc.slug);
      } else if (options?.syncHash !== "none") {
        if (toHashValue(window.location.hash) !== doc.slug) {
          window.location.hash = doc.slug;
        }
      }
    },
    []
  );

  const closeDocModal = useCallback(() => {
    setDocModal((prev) => {
      if (!prev.open) return prev;
      if (prev.slug && toHashValue(window.location.hash) === prev.slug) {
        replaceHash();
        setHashValue("");
      }
      return { open: false, title: "", html: "", slug: "" };
    });
  }, []);

  useEffect(() => {
    const onHashChange = () => setHashValue(toHashValue(window.location.hash));
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onHashChange);
    };
  }, []);

  useEffect(() => {
    if (!hashValue) {
      setDocModal((prev) =>
        prev.open ? { open: false, title: "", html: "", slug: "" } : prev
      );
      return;
    }
    const docByHash = docsBySlug.get(hashValue);
    if (!docByHash) {
      setDocModal((prev) =>
        prev.open ? { open: false, title: "", html: "", slug: "" } : prev
      );
      return;
    }
    setDocModal((prev) =>
      prev.open && prev.slug === docByHash.slug
        ? prev
        : {
          open: true,
          title: docByHash.title,
          html: docByHash.html,
          slug: docByHash.slug,
        }
    );
  }, [docsBySlug, hashValue]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDocModal();
    };
    if (docModal.open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onEsc);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [closeDocModal, docModal.open]);

  /** Клик по ссылке внутри попапа: контент обновляется без закрытия (переход между документами) */
  useEffect(() => {
    const el = docModalBodyRef.current;
    if (!el || !docModal.open || informationDocs.length === 0) return;
    const onLinkClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const docHash = extractDocHashFromHref(href);
      if (docHash) {
        const docByHash = docsBySlug.get(docHash);
        if (docByHash) {
          e.preventDefault();
          e.stopPropagation();
          openDocModal(docByHash, { syncHash: "push" });
          return;
        }
      }
      const linkText = (a.textContent ?? "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
      const doc = docsByTitle.get(linkText);
      if (doc) {
        e.preventDefault();
        e.stopPropagation();
        openDocModal(doc, { syncHash: "push" });
      } else {
        // Внешняя ссылка — открываем в новой вкладке
        e.preventDefault();
        const externalHref = (a as HTMLAnchorElement).href;
        if (externalHref)
          window.open(externalHref, "_blank", "noopener,noreferrer");
      }
    };
    el.addEventListener("click", onLinkClick);
    return () => el.removeEventListener("click", onLinkClick);
  }, [docModal.open, docsBySlug, docsByTitle, informationDocs.length, openDocModal]);

  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const SCROLL_THRESHOLD_PERCENT = 0.15;

    const updateVisibility = () => {
      const scrollTop =
        window.pageYOffset ?? document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const maxScroll = scrollHeight - clientHeight;

      const hasVerticalScroll = maxScroll > 0;
      const pastThreshold =
        hasVerticalScroll && scrollTop >= maxScroll * SCROLL_THRESHOLD_PERCENT;

      setShowScrollToTop(hasVerticalScroll && pastThreshold);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  const scrollToTop = () => {
    const start = window.pageYOffset ?? document.documentElement.scrollTop;
    if (start <= 0) return;
    const startTime = performance.now();
    const duration = 1200;

    const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const y = start * (1 - easeOutCubic(progress));
      window.scrollTo(0, y);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  return (
    <S.Wrapper>
      <S.ScrollToTopButton
        type="button"
        $visible={showScrollToTop}
        onClick={scrollToTop}
        aria-label={yourLang === "ru" ? "Наверх" : "Scroll to top"}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </S.ScrollToTopButton>
      <S.Container>
        {/* Верх: колонки меню + Contact Us + Join Us */}
        <S.TopSection>
          <S.NavColumns>
            {footerBlocks.slice(0, 5).map((block, blockIndex) => {
              const lines = block.value?.lines ?? [];
              return (
                <S.NavColumn
                  key={
                    block.id ??
                    block.value?.title ??
                    `footer-block-${blockIndex}`
                  }
                >
                  {block.value?.title && (
                    <S.NavColumnTitle>{block.value.title}</S.NavColumnTitle>
                  )}
                  <S.NavColumnList>
                    {lines.map((line, i) => {
                      const url = line.url?.trim();
                      const title = line.title ?? "";
                      if (block.type === "common") {
                        if (url) {
                          const internal = isInternalAppLink(url);
                          const to = urlToInternalPath(url);
                          return (
                            <S.NavLinkRow key={i}>
                              {internal ? (
                                <S.NavLink
                                  as={Link}
                                  href={to}
                                  onClick={() => {
                                    if (pathname === to) window.scrollTo(0, 0);
                                  }}
                                >
                                  {title}
                                </S.NavLink>
                              ) : (
                                <S.NavLink
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {title}
                                </S.NavLink>
                              )}
                            </S.NavLinkRow>
                          );
                        }
                        return (
                          <S.NavColumnLine key={i}>{title}</S.NavColumnLine>
                        );
                      }
                      if (block.type === "information") {
                        const doc = toInformationDoc(line);
                        return (
                          <S.NavLinkRow key={i}>
                            <S.NavDocButton
                              type="button"
                              onClick={() =>
                                doc ? openDocModal(doc, { syncHash: "push" }) : null
                              }
                            >
                              {title}
                            </S.NavDocButton>
                          </S.NavLinkRow>
                        );
                      }
                      return <S.NavColumnLine key={i}>{title}</S.NavColumnLine>;
                    })}
                  </S.NavColumnList>
                </S.NavColumn>
              );
            })}
          </S.NavColumns>

          <S.ContactSocialColumn>
            {contactTitle && (
              <S.ContactBlock>
                <S.ContactTitle>{contactTitle}</S.ContactTitle>
                {contactLink && (
                  <S.ContactLink href={`mailto:${contactLink}`}>
                    {contactLink}
                  </S.ContactLink>
                )}
              </S.ContactBlock>
            )}
            {socialTitle && visibleFooterCommunities.length > 0 && (
              <S.SocialBlock>
                <S.SocialTitle>{socialTitle}</S.SocialTitle>
                <S.SocialIcons>
                  {visibleFooterCommunities.map((item, index) => {
                    const iconUrl = getImageUrl(item.icon);
                    const link = item.link?.trim() || "#";
                    const key = `${item.name ?? "social"}-${item.link ?? ""}-${index}`;
                    const svgColor =
                      item.icon?.color ?? item.color ?? undefined;
                    return (
                      <S.SocialIconLink
                        key={key}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={item.name}
                      >
                        {iconUrl ? (
                          <InlineSvgFromUrl
                            src={iconUrl}
                            title={item.name}
                            width={24}
                            height={24}
                            color={svgColor}
                            forceColor={!!svgColor}
                            fallback={
                              <img
                                src={iconUrl}
                                alt=""
                                width={24}
                                height={24}
                                loading="lazy"
                              />
                            }
                          />
                        ) : (
                          <span>{item.name?.charAt(0) ?? ""}</span>
                        )}
                      </S.SocialIconLink>
                    );
                  })}
                </S.SocialIcons>
              </S.SocialBlock>
            )}
          </S.ContactSocialColumn>
        </S.TopSection>

        {/* Бегущая строка */}
        {runningLineDisplay.length > 0 && (
          <S.RunningLineSection>
            <Marquee speed={80} gradient={false} pauseOnHover={false}>
              <S.RunningLineContent>
                {runningLineDisplay.map((item) => (
                  <span
                    key={
                      "_displayKey" in item && item._displayKey
                        ? item._displayKey
                        : item.id
                    }
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {item.type === "running_line_image" && item.value?.file && (
                      <S.RunningLineImage
                        src={normalizeUrl(item.value.file)}
                        alt=""
                      />
                    )}
                    {item.type === "running_line_text" && (
                      <S.RunningLineText>
                        {String(item.value)}
                      </S.RunningLineText>
                    )}
                  </span>
                ))}
              </S.RunningLineContent>
            </Marquee>
          </S.RunningLineSection>
        )}

        {/* Низ: юридический текст + сертификаты */}
        <S.BottomSection>
          {legalText && (
            <S.LegalBlock dangerouslySetInnerHTML={{ __html: legalText }} />
          )}
          {filteredLegalImages.length > 0 && (
            <S.CertificatesRow>
              {filteredLegalImages.map((item) => {
                const imgUrl = getImageUrl(item.value.image);
                const url = item.value.url?.trim() || "#";
                if (!imgUrl) return null;
                return (
                  <S.CertificateLink
                    key={item.id}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={imgUrl} alt="" />
                  </S.CertificateLink>
                );
              })}
            </S.CertificatesRow>
          )}
        </S.BottomSection>

        {/* Попап документа для блоков type=information */}
        <S.DocModalOverlay
          $open={docModal.open}
          onClick={(e) => e.target === e.currentTarget && closeDocModal()}
        >
          <S.DocModalBox onClick={(e) => e.stopPropagation()}>
            <S.DocModalHeader>
              <S.DocModalTitle>{docModal.title}</S.DocModalTitle>
              <S.DocModalHeaderLine />
              <S.DocModalClose
                type="button"
                aria-label="Закрыть"
                onClick={closeDocModal}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M15 5L5 15M5 5l10 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </S.DocModalClose>
            </S.DocModalHeader>
            <S.DocModalBody
              ref={docModalBodyRef}
              dangerouslySetInnerHTML={{ __html: docModal.html }}
            />
          </S.DocModalBox>
        </S.DocModalOverlay>
      </S.Container>
    </S.Wrapper>
  );
};

export default PreFooter;
