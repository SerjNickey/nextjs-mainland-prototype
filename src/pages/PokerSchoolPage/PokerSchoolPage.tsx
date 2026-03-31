/**
 * Poker School (Blog) — страница статей по ТЗ.
 * Хлебные крошки, поиск (подсказки, Popular Tags, Recent Searches), сетка карточек 4/2 колонки.
 * Карточки Text/Video, модалка статьи, предпросмотр карточки с «Поделиться».
 */
import {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import StickyHeader from "../../widgets/StickyHeader/StickyHeader";
import PreFooter from "../../widgets/NPreFooter/NPreFooter";
import Footer from "../../widgets/Footer/Footer";
import { useGetBasePageQuery } from "../../store/basePageApi";
import { useGetPokerSchoolPageQuery } from "../../store/pokerSchoolPageApi";
import type { RootState } from "../../store";
import { GlobalLoadingContext } from "../../contexts/GlobalLoadingContext";
import {
  getItemsFromData,
  type CommunityItem,
  type HomePageCommunityData,
} from "../../shared/communitiesData";
import { MEDIA_BASE_URL } from "../../config/env";
import * as S from "./PokerSchoolPage.styled";
import shareIcon from "../../assets/images/SharedIcons/share.svg";

const RECENT_STORAGE_KEY = "pokerSchoolRecentSearches";
const RECENT_MAX = 5;
const SUGGESTIONS_MAX = 10;
const SEARCH_DEBOUNCE_MS = 1800;
const MIN_SEARCH_CHARS = 3;
const MAX_SEARCH_CHARS = 200;

/** Карточка статьи после маппинга (Text или Video). */
export type ArticleCard = {
  id: string;
  title: string;
  /** Отображаемые теги через запятую */
  tag: string;
  /** Массив названий тегов для фильтрации (карточка может иметь несколько тегов) */
  tagTitles: string[];
  coverUrl?: string;
  contentType: "text" | "video";
  mainButtonTitle: string;
  showMainButton: boolean;
  /** Подзаголовок (из API subtitle) */
  subtitle?: string;
  /** Slug карточки для глубоких ссылок (card_slug) */
  slug?: string;
  /** Первые предложения для предпросмотра */
  excerpt?: string;
  /** Полный текст статьи (HTML) */
  body?: string;
  /** URL видео в формате embed (для content_type video) */
  videoUrl?: string;
  /** Рекомендуемая (Recommended) для блока «Нет результатов» */
  recommended?: boolean;
  order?: number;
};

const normalizeUrl = (raw?: string) => {
  if (!raw || !raw.trim()) return "";
  const t = raw.trim();
  if (t.startsWith("http")) return t;
  return `${MEDIA_BASE_URL}${t.startsWith("/") ? t : `/${t}`}`;
};

/** Подставляет абсолютные URL для img src в HTML статьи (относительные пути ведут на бэкенд). */
const resolveArticleBodyHtml = (html: string): string => {
  if (!html) return "";
  return html.replace(
    /src=["'](\/[^"']*)["']/g,
    (_, path) => `src="${MEDIA_BASE_URL}${path}"`
  );
};

/** Преобразует YouTube URL (watch, Shorts, youtu.be) в embed URL для iframe с автовоспроизведением. */
const toEmbedVideoUrl = (url: string): string => {
  const trimmed = url.trim();
  if (!trimmed) return "";
  const autoplay = "autoplay=1";
  if (trimmed.includes("/embed/")) {
    return trimmed.includes("?")
      ? `${trimmed}&${autoplay}`
      : `${trimmed}?${autoplay}`;
  }
  const match = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
  );
  if (match) return `https://www.youtube.com/embed/${match[1]}?${autoplay}`;
  return trimmed;
};

/** Проверка, что ссылка ведёт на вертикальное видео (YouTube Shorts). */
const isShortsUrl = (url: string | null | undefined): boolean => {
  if (!url || !url.trim()) return false;
  const lower = url.toLowerCase();
  return lower.includes("/shorts/") || lower.includes("youtube.com/shorts");
};

const getFileUrl = (source?: { file?: unknown }) => {
  if (typeof source?.file === "string") return normalizeUrl(source.file);
  const obj = source?.file as { url?: string } | undefined;
  if (typeof obj?.url === "string") return normalizeUrl(obj.url);
  return "";
};

/** Достаёт массив карточек/статей из ответа API (school.PokerSchoolPage: cards, articles, items, blocks). */
function getArticlesArray(data: any): any[] {
  if (!data || typeof data !== "object") return [];
  const cards = data.cards;
  if (Array.isArray(cards) && cards.length > 0) return cards;
  const direct = data.articles ?? data.items ?? data.results;
  if (Array.isArray(direct) && direct.length > 0) return direct;
  const blocks = data.blocks;
  if (Array.isArray(blocks)) {
    return blocks.filter(
      (b: any) =>
        b?.type === "article" ||
        b?.type === "blog_article" ||
        b?.type === "blog" ||
        b?.type === "text" ||
        b?.type === "video"
    );
  }
  return [];
}

/** Строит map tag_id → title из data.tags. Поддержка: { value: { tag, title } } и { tag, title }. */
function getTagIdToTitle(data: any): Record<number, string> {
  const map: Record<number, string> = {};
  const list = data?.tags;
  if (!Array.isArray(list)) return map;
  for (const item of list) {
    const v = item?.value ?? item;
    if (v == null) continue;
    const id = typeof v.tag === "number" ? v.tag : undefined;
    const title =
      typeof v.title === "string" && v.title.trim() ? v.title.trim() : "";
    if (id != null && title) map[id] = title;
  }
  return map;
}

/** Маппинг cards из pokerSchoolPageApi (type text/video, value: tags[], cover, title, subtitle, text, video_url, card_slug) в ArticleCard[]. */
function mapArticlesFromApi(data: any): ArticleCard[] {
  const raw = getArticlesArray(data);
  if (raw.length === 0) return [];
  const tagIdToTitle = getTagIdToTitle(data);
  const rootButtonText =
    typeof data?.button_text === "string" && data.button_text.trim()
      ? data.button_text.trim().toUpperCase()
      : "READ ARTICLE";
  const result: ArticleCard[] = [];
  raw.forEach((item: any, index: number) => {
    const v = item.value ?? item;
    const contentType = item.type === "video" ? "video" : "text";
    const rawTags = Array.isArray(v?.tags) ? v.tags : [];
    const tagTitles: string[] = rawTags
      .map((t: unknown) => {
        if (
          t != null &&
          typeof t === "object" &&
          "title" in t &&
          typeof (t as { title: unknown }).title === "string"
        ) {
          const title = (t as { title: string }).title.trim();
          return title || null;
        }
        const id = typeof t === "number" ? t : undefined;
        return id != null ? (tagIdToTitle[id] ?? null) : null;
      })
      .filter(Boolean);
    const directTag =
      typeof v?.tag === "string" && v.tag.trim()
        ? v.tag.trim()
        : typeof v?.tag_title === "string" && v.tag_title.trim()
          ? v.tag_title.trim()
          : "";
    const tag = tagTitles.length > 0 ? tagTitles.join(", ") : directTag || "";
    const title = typeof v?.title === "string" ? v.title : "";
    const videoUrlRaw =
      contentType === "video" && typeof v?.video_url === "string"
        ? v.video_url
        : "";
    result.push({
      id: String(item.id ?? v?.id ?? `card-${index}`),
      title,
      tag,
      tagTitles,
      coverUrl:
        getFileUrl(v?.cover ?? v?.article_cover ?? v?.image) || undefined,
      contentType,
      mainButtonTitle: rootButtonText,
      showMainButton: true,
      subtitle:
        typeof v?.subtitle === "string" && v.subtitle.trim()
          ? v.subtitle.trim()
          : undefined,
      slug:
        typeof v?.card_slug === "string" && v.card_slug.trim()
          ? v.card_slug.trim()
          : undefined,
      excerpt:
        typeof v?.text === "string"
          ? v.text
              .replace(/<[^>]+>/g, " ")
              .replace(/\s+/g, " ")
              .trim()
              .slice(0, 200)
          : undefined,
      body: typeof v?.text === "string" ? v.text : undefined,
      /** Оригинальный URL видео (для Shorts-детекции); в iframe подставляется через toEmbedVideoUrl */
      videoUrl: videoUrlRaw ? normalizeUrl(videoUrlRaw) : undefined,
      recommended: Boolean(v?.recommended),
      order:
        typeof v?.order === "number" && Number.isFinite(v.order)
          ? v.order
          : index,
    });
  });
  return result;
}

function getRecentSearches(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, RECENT_MAX) : [];
  } catch {
    return [];
  }
}

function saveRecentSearch(query: string) {
  if (!query.trim()) return;
  const recent = getRecentSearches().filter(
    (q) => q.toLowerCase() !== query.trim().toLowerCase()
  );
  recent.unshift(query.trim());
  localStorage.setItem(
    RECENT_STORAGE_KEY,
    JSON.stringify(recent.slice(0, RECENT_MAX))
  );
}

function clearRecentSearches() {
  localStorage.removeItem(RECENT_STORAGE_KEY);
}

type PokerSchoolPageProps = {
  previewData?: any;
};

const PokerSchoolPage = ({ previewData }: PokerSchoolPageProps) => {
  const { t } = useTranslation();
  const isPreviewMode = previewData != null;
  const yourLang = useSelector(
    (s: RootState) => s.registration?.yourLang ?? "en"
  );
  const {
    data: baseData,
    isLoading: isLoadingBase,
    isFetching: isFetchingBase,
  } = useGetBasePageQuery(yourLang);
  const {
    data: apiData,
    isLoading: isLoadingPoker,
    isFetching: isFetchingPoker,
  } = useGetPokerSchoolPageQuery(yourLang, { skip: isPreviewMode });
  const pageData = previewData ?? apiData;
  const logoSrc = baseData?.logo?.file ?? "";
  const countryCode = useSelector(
    (s: RootState) => s.registration?.countryCodeReg ?? ""
  );
  const countryName = useSelector(
    (s: RootState) => s.registration?.countryReg ?? ""
  );
  const communityItems = useMemo(
    () =>
      baseData
        ? getItemsFromData(
            baseData as HomePageCommunityData,
            countryCode,
            countryName
          )
        : [],
    [baseData, countryCode, countryName]
  );

  /** Только Telegram, Instagram, Facebook, X.com — в таком порядке для блока «Поделиться» в превью видео */
  const videoPreviewShareItems = useMemo(() => {
    const match = (item: CommunityItem, key: string) => {
      const n = item.name.toLowerCase();
      if (key === "telegram") return n.includes("telegram");
      if (key === "instagram") return n.includes("instagram");
      if (key === "facebook") return n.includes("facebook");
      if (key === "x") return n === "x" || n.includes("x.com");
      return false;
    };
    return ["telegram", "instagram", "facebook", "x"]
      .map((key) => communityItems.find((item) => match(item, key)))
      .filter((item): item is CommunityItem => item != null);
  }, [communityItems]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<ArticleCard | null>(
    null
  );
  const [videoUrlOpen, setVideoUrlOpen] = useState<string | null>(null);
  const [videoPreviewCard, setVideoPreviewCard] = useState<ArticleCard | null>(
    null
  );
  const [videoPreviewShareOpen, setVideoPreviewShareOpen] = useState(false);
  const [previewCard, setPreviewCard] = useState<ArticleCard | null>(null);
  const [, setShareOpen] = useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const tagsScrollRef = useRef<HTMLDivElement>(null);
  const scrollJumpRef = useRef(false);
  const prevTagsCountRef = useRef(0);

  /** Статьи только из API */
  const articles = useMemo(() => {
    if (pageData == null) return [];
    return mapArticlesFromApi(pageData);
  }, [pageData]);

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  /** Поиск: при 2+ словах — точное совпадение фразы (без учёта регистра); при одном слове — по словам. Ранжирование: точный тег > точный заголовок > фраза/слово в теге > в заголовке. */
  const filteredBySearch = useMemo(() => {
    let list = articles;
    if (selectedTags.length > 0) {
      const tagSet = new Set(selectedTags.map((t) => t.toLowerCase()));
      list = list.filter((a) =>
        a.tagTitles.some((t) => tagSet.has(t.toLowerCase()))
      );
    }
    const q = debouncedSearchQuery.trim().toLowerCase();
    if (q.length >= MIN_SEARCH_CHARS) {
      const words = q.split(/\s+/).filter(Boolean);
      const isPhraseSearch = words.length >= 2;

      list = list.filter((a) => {
        const titleLower = a.title.toLowerCase();
        const tagTitlesLower = a.tagTitles.map((t) => t.toLowerCase());
        const tagLower = a.tag.toLowerCase();

        if (isPhraseSearch) {
          return (
            tagTitlesLower.some((t) => t.includes(q)) ||
            titleLower.includes(q) ||
            tagLower.includes(q)
          );
        }

        const matchExactTag = tagTitlesLower.some((t) => t === q);
        const matchExactTitle = titleLower === q;
        const matchWordInTag = words.some((w) =>
          tagTitlesLower.some((t) => t === w || t.includes(w))
        );
        const matchWordInTitle = words.some((w) => titleLower.includes(w));
        return (
          matchExactTag || matchExactTitle || matchWordInTag || matchWordInTitle
        );
      });

      list = [...list].sort((a, b) => {
        const rank = (card: ArticleCard) => {
          const titleLower = card.title.toLowerCase();
          const tagTitlesLower = card.tagTitles.map((t) => t.toLowerCase());
          if (isPhraseSearch) {
            if (tagTitlesLower.some((t) => t === q)) return 3;
            if (titleLower === q) return 2;
            if (tagTitlesLower.some((t) => t.includes(q))) return 1;
            if (titleLower.includes(q)) return 0;
            return -1;
          }
          if (tagTitlesLower.some((t) => t === q)) return 3;
          if (titleLower === q) return 2;
          if (
            words.some((w) =>
              tagTitlesLower.some((t) => t === w || t.includes(w))
            )
          )
            return 1;
          if (words.some((w) => titleLower.includes(w))) return 0;
          return -1;
        };
        return rank(b) - rank(a);
      });
    }
    return list;
  }, [articles, debouncedSearchQuery, selectedTags]);

  const suggestions = useMemo(() => {
    const q = debouncedSearchQuery.trim().toLowerCase();
    if (q.length < MIN_SEARCH_CHARS) return [];
    const byTitle = articles.filter((a) => a.title.toLowerCase().includes(q));
    const byTag = articles.filter(
      (a) =>
        a.tagTitles.some(
          (t) => t.toLowerCase() === q || t.toLowerCase().includes(q)
        ) && !byTitle.includes(a)
    );
    const combined = [...byTitle, ...byTag].slice(0, SUGGESTIONS_MAX);
    return combined;
  }, [articles, debouncedSearchQuery]);

  /** Популярные теги: из API (tags) или уникальные теги из статей */
  const popularTags = useMemo(() => {
    const fromApi = pageData?.popular_tags ?? pageData?.tags;
    if (Array.isArray(fromApi) && fromApi.length > 0) {
      return fromApi
        .slice(0, 8)
        .map((x: any) =>
          typeof x === "string"
            ? x
            : String(x?.value?.title ?? x?.title ?? x?.name ?? "")
        )
        .filter(Boolean);
    }
    const fromArticles = articles.flatMap((a) => a.tagTitles).filter(Boolean);
    return [...new Set(fromArticles)].slice(0, 8);
  }, [pageData, articles]);

  const showDropdown =
    searchFocused &&
    (suggestions.length > 0 ||
      debouncedSearchQuery.trim().length < MIN_SEARCH_CHARS);
  const showPopularAndRecent =
    searchFocused && debouncedSearchQuery.trim().length < MIN_SEARCH_CHARS;

  const handleSearchSubmit = useCallback(() => {
    const q = searchQuery.trim();
    if (q) {
      saveRecentSearch(q);
      setRecentSearches(getRecentSearches());
    }
  }, [searchQuery]);

  const handleSuggestionClick = useCallback((article: ArticleCard) => {
    setSearchQuery(article.title);
    saveRecentSearch(article.title);
    setRecentSearches(getRecentSearches());
    setSearchFocused(false);
  }, []);

  const handleTagClick = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.some((t) => t.toLowerCase() === tag.toLowerCase())
        ? prev
        : [...prev, tag]
    );
  }, []);

  /** Удалить один тег по клику на крестик */
  const removeTag = useCallback((tagToRemove: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tagToRemove));
  }, []);

  const handleClearInput = useCallback(() => {
    setSearchQuery("");
    setSelectedTags([]);
  }, []);

  const handleClearHistory = useCallback(() => {
    clearRecentSearches();
    setRecentSearches([]);
  }, []);

  /** Блокировка скролла страницы при колёсике над поиском: passive: false, иначе preventDefault не работает */
  useEffect(() => {
    const wrap = dropdownRef.current;
    if (!wrap) return;
    const onWheel = (e: WheelEvent) => e.preventDefault();
    wrap.addEventListener("wheel", onWheel, { passive: false });
    return () => wrap.removeEventListener("wheel", onWheel);
  }, []);

  /** При добавлении тега — прокрутить вправо, чтобы новый тег был виден */
  useEffect(() => {
    const count = selectedTags.length;
    if (count > prevTagsCountRef.current && count > 0) {
      const el = tagsScrollRef.current;
      if (el) {
        requestAnimationFrame(() => {
          const maxScroll =
            count >= 2
              ? el.scrollWidth / 2 - el.clientWidth
              : el.scrollWidth - el.clientWidth;
          el.scrollLeft = Math.max(0, maxScroll);
        });
      }
    }
    prevTagsCountRef.current = count;
  }, [selectedTags.length]);

  /** Бесконечная прокрутка тегов (только при 2+ тегах): при достижении границы — перенос позиции */
  useEffect(() => {
    if (selectedTags.length < 2) return;
    const el = tagsScrollRef.current;
    if (!el) return;
    const half = () => el.scrollWidth / 2;
    const onScroll = () => {
      if (scrollJumpRef.current) return;
      const h = half();
      if (el.scrollLeft >= h - 1) {
        scrollJumpRef.current = true;
        el.scrollLeft -= h;
        requestAnimationFrame(() => {
          scrollJumpRef.current = false;
        });
      } else if (el.scrollLeft <= 0 && el.scrollWidth > el.clientWidth) {
        scrollJumpRef.current = true;
        el.scrollLeft += h;
        requestAnimationFrame(() => {
          scrollJumpRef.current = false;
        });
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [selectedTags.length]);

  /** Колёсико над тегами — горизонтальный скролл; при 2+ тегах — бесконечный цикл (прыжок влево с начала) */
  useEffect(() => {
    const el = tagsScrollRef.current;
    if (!el) return;
    const half = () => el.scrollWidth / 2;
    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return;
      if (selectedTags.length >= 2 && e.deltaY < 0 && el.scrollLeft <= 0) {
        el.scrollLeft = half();
      }
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [selectedTags.length]);

  /** Дебаунс 1,5–2 сек: применение поиска после паузы ввода. */
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      debounceRef.current = null;
    }, SEARCH_DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery]);

  /** Блокировка прокрутки страницы при открытом модальном окне */
  const isModalOpen = Boolean(
    selectedArticle || videoUrlOpen || videoPreviewCard || previewCard
  );
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isModalOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isModalOpen]);

  // const recommendedArticles = useMemo(
  //   () =>
  //     articles
  //       .filter((a) => a.recommended)
  //       .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
  //   [articles]
  // );

  const displayArticles = filteredBySearch.length > 0 ? filteredBySearch : [];
  const hasActiveFilter =
    debouncedSearchQuery.trim().length >= MIN_SEARCH_CHARS ||
    selectedTags.length > 0;
  const noResults = hasActiveFilter && filteredBySearch.length === 0;

  const openArticle = useCallback((article: ArticleCard) => {
    setPreviewCard(null);
    setSelectedArticle(article);
  }, []);

  const copyLink = useCallback(() => {
    if (typeof navigator?.clipboard?.writeText === "function") {
      navigator.clipboard.writeText(window.location.href);
    }
    setShareOpen(true);
    setTimeout(() => setShareOpen(false), 2000);
  }, []);

  /** При клике «Поделиться» в модалке превью видео: копируем ссылку на видео в буфер и показываем блок с соцсетями */
  const handleVideoPreviewShare = useCallback(
    (videoUrl: string | undefined) => {
      const textToCopy = videoUrl?.trim() || window.location.href;
      if (typeof navigator?.clipboard?.writeText === "function" && textToCopy) {
        navigator.clipboard.writeText(textToCopy);
      }
      setVideoPreviewShareOpen(true);
      setTimeout(() => setVideoPreviewShareOpen(false), 5000);
    },
    []
  );

  /** URL для шаринга в соцсеть по имени (Telegram, Facebook, Twitter и т.д.) */
  const getShareUrlForCommunityItem = useCallback(
    (item: CommunityItem, title?: string) => {
      const url =
        typeof window !== "undefined"
          ? encodeURIComponent(window.location.href)
          : "";
      const text = encodeURIComponent(title ?? "");
      const n = item.name.toLowerCase();
      if (n.includes("telegram"))
        return `https://t.me/share/url?url=${url}&text=${text}`;
      if (n.includes("facebook"))
        return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      if (n.includes("twitter") || n === "x")
        return `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
      return item.link;
    },
    []
  );

  const setPageLoading = useContext(GlobalLoadingContext)?.setPageLoading;
  const isLoading =
    !isPreviewMode &&
    (isLoadingBase || isLoadingPoker || isFetchingBase || isFetchingPoker);

  useEffect(() => {
    setPageLoading?.(isLoading);
    return () => setPageLoading?.(false);
  }, [isLoading, setPageLoading]);

  if (isLoading || !pageData) return null;

  return (
    <S.PageLayout>
      <StickyHeader logoSrc={logoSrc} />
      <S.Wrapper>
        <S.Breadcrumbs>
          <S.BreadcrumbLink as={Link} to="/">
            {t("pokerSchoolBreadcrumbHome")}
          </S.BreadcrumbLink>
          <S.BreadcrumbSep>›</S.BreadcrumbSep>
          <span>{t("pokerSchoolBreadcrumbPokerSchool")}</span>
        </S.Breadcrumbs>

        <S.SearchWrap ref={dropdownRef}>
          <S.SearchBar>
            <S.SearchInputWrap>
              <S.SearchBarInner>
                {selectedTags.length > 0 && (
                  <S.SearchTagsScrollWrap>
                    <S.SearchTagsScroll ref={tagsScrollRef}>
                      {selectedTags.length >= 2 ? (
                        <S.SearchTagsScrollTrack>
                          <S.SearchTagsScrollSet>
                            {selectedTags.map((tag) => (
                              <S.SearchTagChip key={`a-${tag}`}>
                                {tag}
                                <S.SearchTagChipRemove
                                  type="button"
                                  onClick={() => removeTag(tag)}
                                  aria-label={`Remove ${tag}`}
                                >
                                  <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                  </svg>
                                </S.SearchTagChipRemove>
                              </S.SearchTagChip>
                            ))}
                          </S.SearchTagsScrollSet>
                          <S.SearchTagsScrollSet>
                            {selectedTags.map((tag) => (
                              <S.SearchTagChip key={`b-${tag}`}>
                                {tag}
                                <S.SearchTagChipRemove
                                  type="button"
                                  onClick={() => removeTag(tag)}
                                  aria-label={`Remove ${tag}`}
                                >
                                  <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                  </svg>
                                </S.SearchTagChipRemove>
                              </S.SearchTagChip>
                            ))}
                          </S.SearchTagsScrollSet>
                        </S.SearchTagsScrollTrack>
                      ) : (
                        <S.SearchTagsScrollSet>
                          {selectedTags.map((tag) => (
                            <S.SearchTagChip key={tag}>
                              {tag}
                              <S.SearchTagChipRemove
                                type="button"
                                onClick={() => removeTag(tag)}
                                aria-label={`Remove ${tag}`}
                              >
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                </svg>
                              </S.SearchTagChipRemove>
                            </S.SearchTagChip>
                          ))}
                        </S.SearchTagsScrollSet>
                      )}
                    </S.SearchTagsScroll>
                  </S.SearchTagsScrollWrap>
                )}
                <S.SearchInput
                  type="text"
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value.slice(0, MAX_SEARCH_CHARS))
                  }
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  placeholder={t("pokerSchoolSearchPlaceholder")}
                  aria-label={t("pokerSchoolSearchPlaceholder")}
                  maxLength={MAX_SEARCH_CHARS}
                />
              </S.SearchBarInner>
              <S.SearchClearBtn
                type="button"
                onClick={handleClearInput}
                aria-label="Clear"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
              </S.SearchClearBtn>
            </S.SearchInputWrap>
            <S.SearchButton
              type="button"
              onClick={handleSearchSubmit}
              aria-label="Search"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </S.SearchButton>
          </S.SearchBar>

          {showDropdown && (
            <S.SearchDropdown>
              {suggestions.length > 0 && (
                <S.SearchDropdownSection>
                  <S.SuggestionsList>
                    {suggestions.map((a) => (
                      <S.SuggestionItem
                        key={a.id}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSuggestionClick(a);
                        }}
                      >
                        <S.SuggestionIcon>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                          </svg>
                        </S.SuggestionIcon>
                        <span>{a.title}</span>
                      </S.SuggestionItem>
                    ))}
                  </S.SuggestionsList>
                </S.SearchDropdownSection>
              )}
              {showPopularAndRecent && (
                <>
                  {popularTags.length > 0 && (
                    <S.SearchDropdownSection>
                      <S.SearchDropdownTitle>
                        {t("pokerSchoolPopularTags")}:
                      </S.SearchDropdownTitle>
                      <S.TagsRow>
                        {popularTags.map((tag) => (
                          <S.TagChip
                            key={tag}
                            type="button"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              handleTagClick(tag);
                            }}
                          >
                            {tag}
                          </S.TagChip>
                        ))}
                      </S.TagsRow>
                    </S.SearchDropdownSection>
                  )}
                  {recentSearches.length > 0 && (
                    <S.SearchDropdownSection>
                      <S.SearchDropdownTitle>
                        <span>{t("pokerSchoolRecentSearches")}:</span>
                        <S.SearchDropdownClear
                          type="button"
                          onClick={handleClearHistory}
                        >
                          {t("pokerSchoolClearHistory")}
                        </S.SearchDropdownClear>
                      </S.SearchDropdownTitle>
                      <S.RecentList>
                        {recentSearches.map((q) => (
                          <S.RecentItem key={q}>
                            <S.RecentItemButton
                              type="button"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                setSearchQuery(q);
                                setSearchFocused(false);
                              }}
                            >
                              <S.RecentItemIcon>
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <circle cx="11" cy="11" r="8" />
                                  <path d="m21 21-4.35-4.35" />
                                </svg>
                              </S.RecentItemIcon>
                              <span>{q}</span>
                            </S.RecentItemButton>
                          </S.RecentItem>
                        ))}
                      </S.RecentList>
                    </S.SearchDropdownSection>
                  )}
                </>
              )}
            </S.SearchDropdown>
          )}
        </S.SearchWrap>

        {noResults && (
          <S.NoResultsBlock>
            <S.NoResultsText>{t("pokerSchoolNoResults")}</S.NoResultsText>
            {/* You may find these articles useful — пока закомментировано
            <S.RecommendedTitle>
              {t("pokerSchoolRecommended")}
            </S.RecommendedTitle>
            <S.CardGrid>
              {recommendedArticles.slice(0, 4).map((card) => (
                <S.Card
                  key={card.id}
                  onClick={() => {
                    if (card.contentType === "video" && card.videoUrl) {
                      setVideoPreviewCard(card);
                    }
                  }}
                >
                  <S.CardImage $imageUrl={card.coverUrl} />
                  {card.contentType !== "video" && (
                    <S.CardInfoWrap>
                      <S.CardOverlay />
                      <S.CardContent>
                        <S.CardTitle>{card.title}</S.CardTitle>
                        {card.subtitle && (
                          <S.CardSubtitle>{card.subtitle}</S.CardSubtitle>
                        )}
                        {card.showMainButton && (
                          <S.CardButton
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (
                                card.contentType === "video" &&
                                card.videoUrl
                              ) {
                                setVideoUrlOpen(card.videoUrl);
                              } else {
                                openArticle(card);
                              }
                            }}
                          >
                            {card.mainButtonTitle}
                          </S.CardButton>
                        )}
                      </S.CardContent>
                    </S.CardInfoWrap>
                  )}
                </S.Card>
              ))}
            </S.CardGrid>
            */}
          </S.NoResultsBlock>
        )}

        {displayArticles.length > 0 && !noResults && (
          <S.CardGrid>
            {displayArticles.map((card) => (
              <S.Card
                key={card.id}
                onClick={() => {
                  if (card.contentType === "video" && card.videoUrl) {
                    setVideoPreviewCard(card);
                  }
                }}
              >
                <S.CardImage $imageUrl={card.coverUrl} />
                {(card.tagTitles[0] ?? card.tag) && (
                  <S.CardTag>{card.tagTitles[0] ?? card.tag}</S.CardTag>
                )}
                {card.contentType !== "video" && (
                  <S.CardInfoWrap>
                    <S.CardOverlay />
                    <S.CardContent>
                      <S.CardTitle>{card.title}</S.CardTitle>
                      {card.subtitle && (
                        <S.CardSubtitle>{card.subtitle}</S.CardSubtitle>
                      )}
                      {card.showMainButton && (
                        <S.CardButton
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (card.contentType === "video" && card.videoUrl) {
                              setVideoPreviewCard(card);
                            } else {
                              openArticle(card);
                            }
                          }}
                        >
                          {card.mainButtonTitle}
                        </S.CardButton>
                      )}
                    </S.CardContent>
                  </S.CardInfoWrap>
                )}
              </S.Card>
            ))}
          </S.CardGrid>
        )}
      </S.Wrapper>

      {videoUrlOpen && (
        <S.VideoOverlay onClick={() => setVideoUrlOpen(null)}>
          <S.VideoBox
            $isShorts={isShortsUrl(videoUrlOpen)}
            onClick={(e) => e.stopPropagation()}
          >
            <S.VideoClose
              type="button"
              onClick={() => setVideoUrlOpen(null)}
              aria-label="Close"
            />
            <S.VideoIframe
              src={toEmbedVideoUrl(videoUrlOpen)}
              title="Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </S.VideoBox>
        </S.VideoOverlay>
      )}

      {videoPreviewCard && !videoUrlOpen && (
        <S.VideoPreviewOverlay onClick={() => setVideoPreviewCard(null)}>
          <S.VideoPreviewBox onClick={(e) => e.stopPropagation()}>
            <S.VideoPreviewBoxInner>
              <S.CardImage $imageUrl={videoPreviewCard.coverUrl} />
              <S.VideoPreviewPlayHitarea
                onClick={() => {
                  if (videoPreviewCard.videoUrl) {
                    setVideoUrlOpen(videoPreviewCard.videoUrl);
                  }
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (
                    videoPreviewCard.videoUrl &&
                    (e.key === "Enter" || e.key === " ")
                  ) {
                    e.preventDefault();
                    setVideoUrlOpen(videoPreviewCard.videoUrl);
                  }
                }}
                aria-label="Play video"
              />
              <S.CardOverlay />
              <S.CardInfoWrap>
                <S.CardContent>
                  <S.CardTitle>{videoPreviewCard.title}</S.CardTitle>
                  {videoPreviewCard.excerpt && (
                    <S.VideoPreviewExcerpt>
                      {videoPreviewCard.excerpt}
                    </S.VideoPreviewExcerpt>
                  )}
                  {(videoPreviewCard.tagTitles[0] ?? videoPreviewCard.tag) && (
                    <S.VideoPreviewTag>
                      {videoPreviewCard.tagTitles[0] ?? videoPreviewCard.tag}
                    </S.VideoPreviewTag>
                  )}
                </S.CardContent>
              </S.CardInfoWrap>
            </S.VideoPreviewBoxInner>
            <S.VideoPreviewShareTrigger
              type="button"
              onClick={() =>
                handleVideoPreviewShare(videoPreviewCard?.videoUrl)
              }
              aria-label="Share"
            >
              <img src={shareIcon} alt="" width={20} height={20} />
            </S.VideoPreviewShareTrigger>
            {videoPreviewShareOpen && (
              <S.VideoPreviewShareBlock onClick={(e) => e.stopPropagation()}>
                <S.VideoPreviewShareCopied>
                  ✔ {t("pokerSchoolLinkCopied")}
                </S.VideoPreviewShareCopied>
                <S.VideoPreviewShareIcons>
                  {videoPreviewShareItems.map((item) => (
                    <S.VideoPreviewShareLink
                      key={item.id}
                      href={getShareUrlForCommunityItem(
                        item,
                        videoPreviewCard?.title
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                    >
                      {item.iconUrl ? (
                        <img src={item.iconUrl} alt="" />
                      ) : (
                        <span aria-hidden>{item.name.charAt(0)}</span>
                      )}
                      {item.name}
                    </S.VideoPreviewShareLink>
                  ))}
                </S.VideoPreviewShareIcons>
              </S.VideoPreviewShareBlock>
            )}
          </S.VideoPreviewBox>
        </S.VideoPreviewOverlay>
      )}

      {selectedArticle && (
        <S.ArticleOverlay onClick={() => setSelectedArticle(null)}>
          <S.ArticleBox onClick={(e) => e.stopPropagation()}>
            <S.ArticleClose
              type="button"
              onClick={() => setSelectedArticle(null)}
              aria-label="Close"
            />
            <S.ArticleTitleSmall>{selectedArticle.title}</S.ArticleTitleSmall>
            <S.ArticleTitle>
              {selectedArticle.subtitle ?? selectedArticle.title}
            </S.ArticleTitle>
            {(() => {
              const tagsList =
                selectedArticle.tagTitles.length > 0
                  ? selectedArticle.tagTitles
                  : selectedArticle.tag
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean);
              const firstTag = tagsList[0];
              if (!firstTag) return null;
              return (
                <S.ArticleTagsWrap>
                  <S.ArticleTag key={firstTag}>{firstTag}</S.ArticleTag>
                </S.ArticleTagsWrap>
              );
            })()}
            {selectedArticle.body && (
              <S.ArticleBody
                dangerouslySetInnerHTML={{
                  __html: resolveArticleBodyHtml(selectedArticle.body),
                }}
              />
            )}
          </S.ArticleBox>
        </S.ArticleOverlay>
      )}

      {previewCard && (
        <S.PreviewOverlay onClick={() => setPreviewCard(null)}>
          <S.PreviewBox onClick={(e) => e.stopPropagation()}>
            <S.PreviewImage $imageUrl={previewCard.coverUrl} />
            <S.PreviewOverlayGradient />
            <S.PreviewContent>
              <S.PreviewTitle>{previewCard.title}</S.PreviewTitle>
              {previewCard.excerpt && (
                <S.PreviewText>{previewCard.excerpt}</S.PreviewText>
              )}
              <S.PreviewCtaButton
                type="button"
                onClick={() => {
                  setPreviewCard(null);
                  openArticle(previewCard);
                }}
              >
                {previewCard.mainButtonTitle}
              </S.PreviewCtaButton>
            </S.PreviewContent>
            <S.ShareTrigger type="button" onClick={copyLink} aria-label="Share">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </S.ShareTrigger>
            {true && (
              <S.ShareBlock>
                <S.ShareCopied>✔ {t("pokerSchoolLinkCopied")}</S.ShareCopied>
                <S.ShareIcons>
                  <S.ShareLink
                    href={`https://t.me/share/url?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}&text=${encodeURIComponent(previewCard?.title ?? "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.69 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                    </svg>
                    Telegram
                  </S.ShareLink>
                  <S.ShareLink
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </S.ShareLink>
                  <S.ShareLink
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}&text=${encodeURIComponent(previewCard?.title ?? "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    X (Twitter)
                  </S.ShareLink>
                  <S.ShareLink
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                    Instagram
                  </S.ShareLink>
                </S.ShareIcons>
              </S.ShareBlock>
            )}
          </S.PreviewBox>
        </S.PreviewOverlay>
      )}

      <PreFooter />
      <Footer />
    </S.PageLayout>
  );
};

export default PokerSchoolPage;
