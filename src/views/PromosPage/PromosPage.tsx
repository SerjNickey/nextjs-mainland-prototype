"use client";

/**
 * PromosPage — страница промо-акций.
 *
 * Структура страницы:
 * - Шапка (Header + GrandMenu), контент (заголовок, табы категорий, сетка карточек), PreFooter, Footer.
 * - Данные: promosPageApi (promos_title, promo_categories, promos) и basePageApi (лого для Header).
 *
 * Категории (табы): фиксированный порядок 1–6 (All, Poker, Casino, Sports, Cybersports, Special).
 * Названия и иконки подставляются из API (promo_categories), при отсутствии — из CATEGORY_FALLBACKS и SVG.
 *
 * Карточки промо: фильтруются по выбранной категории и по датам (start_date/end_date).
 * Действие по кнопке: если extra[0].type === "link" — переход по ссылке; если "popup" — открытие модалки с T&C.
 * Кнопка показывается только при наличии валидного extra (link или popup).
 */
import { useMemo, useState, useCallback, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import HeaderMobile from "../../widgets/HeaderMobile/HeaderMobile";
import StickyHeader from "../../widgets/StickyHeader/StickyHeader";
import SEO from "../../components/SEO/SEO";
import PreFooter from "../../widgets/NPreFooter/NPreFooter";
import PreFooterMobile from "../../widgets/PreFooterMobile/PreFooterMobile";
import Footer from "../../widgets/Footer/Footer";
import { useGetBasePageQuery } from "../../store/basePageApi";
import { useGetPromosPageQuery } from "../../store/promosPageApi";
import type { RootState } from "../../store";
import { MEDIA_ORIGIN } from "../../config/env";
import { GlobalLoadingContext } from "../../contexts/GlobalLoadingContext";
import * as S from "./PromosPage.styled";

/**
 * Нормализует URL: протокол, относительные пути, принудительный https при необходимости.
 * Используется для ссылок и картинок из API.
 */
const normalizeUrl = (rawUrl: string) => {
  const trimmed = rawUrl.trim();
  if (!trimmed) return "";
  const protocol =
    typeof window !== "undefined" ? window.location.protocol : "https:";
  if (trimmed.startsWith("//")) return `${protocol}${trimmed}`;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    if (protocol === "https:" && trimmed.startsWith("http://"))
      return trimmed.replace("http://", "https://");
    return trimmed;
  }
  if (trimmed.startsWith("/")) return `${MEDIA_ORIGIN}${trimmed}`;
  return `${MEDIA_ORIGIN}/${trimmed}`;
};

/**
 * Достаёт URL файла из объекта API (image/icon).
 * Поддерживает value.file как строку или как объект с полем url.
 */
const getFileUrl = (source?: { file?: unknown }) => {
  if (typeof source?.file === "string") return normalizeUrl(source.file);
  const fileObject = source?.file as { url?: unknown } | undefined;
  if (typeof fileObject?.url === "string") return normalizeUrl(fileObject.url);
  return "";
};

const hasRichTextContent = (raw?: string) => {
  if (typeof raw !== "string") return false;
  const plainText = raw
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return plainText.length > 0;
};

/**
 * Подписи категорий по умолчанию (ТЗ: порядок 1–6).
 * Используются, если в API нет promo_categories или для категории нет записи.
 */
const CATEGORY_FALLBACKS: Record<number, string> = {
  1: "All promos",
  2: "Poker",
  3: "Casino",
  4: "Sports",
  5: "Cybersports",
  6: "Special",
};

/** Один таб фильтра категорий: id (1–6), подпись, опционально URL иконки из API. */
export type CategoryTab = {
  id: number;
  label: string;
  iconUrl?: string;
};

/**
 * SVG-иконка категории по id. Используется, когда в API нет iconUrl для этой категории.
 * Цвет наследуется от родителя (currentColor) — в табах отображается белым.
 */
const CategoryIcon = ({ categoryId }: { categoryId: number }) => {
  const size = 20;
  const common = { width: size, height: size, fill: "currentColor" };
  switch (categoryId) {
    case 1:
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M12 2l3 7h7l-5.5 5 2 7-6.5-4-6.5 4 2-7L2 9h7z" />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle
            cx="12"
            cy="12"
            r="8"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <circle
            cx="12"
            cy="12"
            r="4"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      );
    case 3:
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M4 8h4V4H4v4zm6 0h4V4h-4v4zm6 0h4V4h-4v4zM4 14h4v-4H4v4zm6 0h4v-4h-4v4zm6 0h4v-4h-4v4zM4 20h4v-4H4v4zm6 0h4v-4h-4v4zm6 0h4v-4h-4v4z" />
        </svg>
      );
    case 4:
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle
            cx="12"
            cy="12"
            r="6"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M12 6v6l4 2"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      );
    case 5:
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M8 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        </svg>
      );
    case 6:
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
  }
};

/**
 * Элемент карточки промо после маппинга из API.
 * showButton: false — кнопку не рендерим (extra пустой или без link/popup).
 * action: при клике — переход по url (link) или открытие модалки (popup).
 */
export type PromoCardItem = {
  id: string;
  categories: number[];
  title: string;
  subtitle: string;
  imageUrl?: string;
  buttonText: string;
  showButton: boolean;
  action:
  | { type: "link"; url: string; external: boolean }
  | { type: "popup"; content: PopupContent };
};

/** Контент модального окна при action.type === "popup" (заголовок, описание, T&C, CTA-кнопка). */
export type PopupContent = {
  title?: string;
  subtitle?: string;
  note?: string;
  buttonText?: string;
  buttonLink?: string;
  imageUrl?: string;
  description?: string;
  termsTitle?: string;
  termsBody?: string;
};

/**
 * Формат ответа API страницы промо (promosPageApi).
 * promo_categories — массив для табов; promos — массив промо-карточек с extra (link/popup).
 */
type PromosPageData = {
  title?: string;
  promos_title?: string;
  terms_and_conditions_title?: string;
  promo_categories?: Array<{
    type?: string;
    id?: string;
    value?: {
      category?: number;
      title?: string;
      icon?: { file?: string };
    };
  }>;
  promos?: Array<{
    type?: string;
    id?: string;
    value?: {
      category?: number;
      categories?: number[] | null;
      title?: string;
      subtitle?: string;
      image?: { file?: string };
      start_date?: string | null;
      end_date?: string | null;
      active?: boolean;
      extra?: Array<{
        type?: string;
        value?: {
          extra_button_text?: string;
          link?: string;
          note?: string;
          button_text?: string;
          button_link?: string;
          description?: string;
          terms_and_conditions?: string;
        };
      }>;
    };
  }>;
} | null;

/**
 * Промо считается активным, если текущая дата в диапазоне [start_date, end_date].
 * Если start/end null — считаем активным.
 */
function isPromoActive(start?: string | null, end?: string | null): boolean {
  const now = new Date().toISOString().slice(0, 10);
  if (start && now < start) return false;
  if (end && now > end) return false;
  return true;
}

function normalizeCategoryIds(
  categoriesRaw: unknown,
  legacyCategoryRaw: unknown
): number[] {
  if (Array.isArray(categoriesRaw)) {
    return categoriesRaw
      .filter((x): x is number => typeof x === "number")
      .filter((x, i, arr) => arr.indexOf(x) === i);
  }
  if (typeof legacyCategoryRaw === "number") return [legacyCategoryRaw];
  return [];
}

/**
 * Преобразует data.promos из API в массив PromoCardItem.
 * - Пропускает записи без value, с active === false, без title, вне дат.
 * - Берёт первый элемент extra: link (с url) → action link; popup (с value) → action popup; иначе showButton = false.
 */
function getCardsFromData(
  data: PromosPageData,
  globalTermsTitle?: string
): PromoCardItem[] {
  const raw = data?.promos ?? [];
  if (!Array.isArray(raw)) return [];
  const result: PromoCardItem[] = [];
  for (const item of raw) {
    const v = item.value;
    if (!v || v.active === false) continue;
    const categories = normalizeCategoryIds(v.categories, v.category);
    const title = typeof v.title === "string" && v.title.trim() ? v.title : "";
    if (!title) continue;
    if (!isPromoActive(v.start_date, v.end_date)) continue;
    const extra = v.extra?.[0];
    const buttonText =
      (extra?.value?.extra_button_text ?? "DETAILS").trim() || "DETAILS";
    let action: PromoCardItem["action"];
    let showButton = false;
    if (
      extra?.type === "link" &&
      typeof extra.value?.link === "string" &&
      extra.value.link.trim()
    ) {
      const url = extra.value.link.trim();
      action = {
        type: "link",
        url: normalizeUrl(url),
        external: url.startsWith("http://") || url.startsWith("https://"),
      };
      showButton = true;
    } else if (extra?.type === "popup" && extra.value) {
      const x = extra.value;
      const termsBody =
        typeof x.terms_and_conditions === "string"
          ? x.terms_and_conditions
          : undefined;
      const hasTerms = hasRichTextContent(termsBody);
      action = {
        type: "popup",
        content: {
          title,
          subtitle: typeof v.subtitle === "string" ? v.subtitle : "",
          note: x.note,
          buttonText: x.button_text,
          buttonLink: x.button_link ? normalizeUrl(x.button_link) : undefined,
          imageUrl: getFileUrl(v.image) || undefined,
          description: x.description,
          termsTitle: hasTerms ? globalTermsTitle : undefined,
          termsBody: hasTerms ? termsBody : undefined,
        },
      };
      showButton = true;
    } else {
      action = { type: "link", url: "#", external: false };
    }
    result.push({
      id: String(item.id ?? Math.random().toString(36).slice(2)),
      categories,
      title,
      subtitle: typeof v.subtitle === "string" ? v.subtitle : "",
      imageUrl: getFileUrl(v.image) || undefined,
      buttonText,
      showButton,
      action,
    });
  }
  return result;
}

/**
 * Строит список табов категорий в фиксированном порядке 1–6.
 * Для каждого id подставляет title и iconUrl из API (promo_categories); при отсутствии — из CATEGORY_FALLBACKS.
 */
function getCategoriesFromData(data: PromosPageData): CategoryTab[] {
  const order = [1, 2, 3, 4, 5, 6] as const;
  const raw = data?.promo_categories ?? [];
  const byId = new Map<number, { title: string; iconUrl?: string }>();
  for (const item of raw) {
    const v = item.value;
    if (v && typeof v.category === "number") {
      const title =
        typeof v.title === "string" && v.title.trim() ? v.title.trim() : "";
      byId.set(v.category, {
        title:
          (title || CATEGORY_FALLBACKS[v.category]) ?? `Category ${v.category}`,
        iconUrl: getFileUrl(v.icon) || undefined,
      });
    }
  }
  return order.map((id) => {
    const fromApi = byId.get(id);
    return {
      id,
      label: fromApi?.title ?? CATEGORY_FALLBACKS[id] ?? `Category ${id}`,
      iconUrl: fromApi?.iconUrl,
    };
  });
}

type PromosPageProps = {
  previewData?: any;
};

const PromosPage = ({ previewData }: PromosPageProps) => {
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
    data: promosData,
    isLoading: isLoadingPromos,
    isFetching: isFetchingPromos,
  } = useGetPromosPageQuery(yourLang, { skip: isPreviewMode });
  const pageData = previewData ?? promosData;
  const logoSrc = baseData?.logo?.file || "";

  /** Выбранная категория (1 = All). */
  const [selectedCategory, setSelectedCategory] = useState(1);
  /** Контент модалки при клике на карточку с popup. */
  const [modalContent, setModalContent] = useState<PopupContent | null>(null);
  /** Раскрыт ли блок Terms & Conditions в модалке. */
  const [termsOpen, setTermsOpen] = useState(false);

  /** Табы категорий (всегда 6, данные из API или fallback). */
  const categories = useMemo(
    () => getCategoriesFromData(pageData as PromosPageData),
    [pageData]
  );

  /** Все карточки после фильтра по датам и active. */
  const allCards = useMemo(
    () =>
      getCardsFromData(
        pageData as PromosPageData,
        (pageData as PromosPageData)?.terms_and_conditions_title
      ),
    [pageData]
  );

  /** Табы только для категорий, у которых есть карточки. */
  const visibleCategories = useMemo(() => {
    return categories.filter((cat) => {
      if (cat.id === 1) return allCards.length > 0;
      return allCards.some((c) => c.categories.includes(cat.id));
    });
  }, [categories, allCards]);

  /** Карточки для текущей категории: 1 = все, иначе по полю category. */
  const visibleCards = useMemo(() => {
    if (selectedCategory === 1) return allCards;
    return allCards.filter((c) => c.categories.includes(selectedCategory));
  }, [allCards, selectedCategory]);

  /** Если выбранная категория скрыта (нет карточек), переключаем на первую доступную. */
  useEffect(() => {
    const hasSelected = visibleCategories.some(
      (c) => c.id === selectedCategory
    );
    if (!hasSelected && visibleCategories.length > 0) {
      setSelectedCategory(visibleCategories[0].id);
    }
  }, [visibleCategories, selectedCategory]);

  /** Клик по кнопке карточки: link — открыть url (внешний в новой вкладке); popup — открыть модалку. */
  const handleCardAction = useCallback((card: PromoCardItem) => {
    if (card.action.type === "link") {
      if (card.action.external) {
        window.open(card.action.url, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = card.action.url;
      }
    } else {
      setModalContent(card.action.content);
      setTermsOpen(true);
    }
  }, []);

  const closeModal = useCallback(() => setModalContent(null), []);
  const toggleTerms = useCallback(() => setTermsOpen((prev) => !prev), []);

  /** Жёсткая блокировка скролла при открытой модалке: body в position:fixed, после закрытия восстанавливаем scroll. */
  useEffect(() => {
    if (modalContent) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      return () => {
        document.body.style.position = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [modalContent]);

  const setPageLoading = useContext(GlobalLoadingContext)?.setPageLoading;
  const isLoading =
    !isPreviewMode &&
    (isLoadingBase || isLoadingPromos || isFetchingBase || isFetchingPromos);

  useEffect(() => {
    setPageLoading?.(isLoading);
    return () => setPageLoading?.(false);
  }, [isLoading, setPageLoading]);

  if (isLoading || !pageData) return null;

  return (
    <S.Wrapper>
      <HeaderMobile logoSrc={logoSrc} />
      <StickyHeader logoSrc={logoSrc} />
      <S.Content>
        {/* Табы категорий: только те, для которых есть карточки */}
        <S.TabsRow>
          {visibleCategories.map((cat) => (
            <S.Tab
              key={cat.id}
              type="button"
              $active={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              aria-pressed={selectedCategory === cat.id}
            >
              <S.TabIcon aria-hidden>
                {cat.iconUrl ? (
                  <S.TabIconImg
                    src={cat.iconUrl}
                    alt=""
                    width={20}
                    height={20}
                  />
                ) : (
                  <CategoryIcon categoryId={cat.id} />
                )}
              </S.TabIcon>
              {cat.label}
            </S.Tab>
          ))}
        </S.TabsRow>

        {/* Название активной категории под табами */}
        <S.CategoryTitle>
          {visibleCategories.find((c) => c.id === selectedCategory)?.label ??
            ""}
        </S.CategoryTitle>

        {/* Сетка карточек: изображение, заголовок, подзаголовок; кнопка только при card.showButton */}
        {visibleCards.length > 0 && (
          <S.CardGrid>
            {visibleCards.map((card) => (
              <S.Card key={card.id}>
                <S.CardImage $imageUrl={card.imageUrl} aria-hidden />
                <S.CardContent>
                  <S.CardTitle>{card.title}</S.CardTitle>
                  <S.CardTextWrap>
                    {card.subtitle ? (
                      <S.CardSubtitle>{card.subtitle}</S.CardSubtitle>
                    ) : null}
                  </S.CardTextWrap>
                  {card.showButton && (
                    <S.CardButton
                      type="button"
                      onClick={() => handleCardAction(card)}
                    >
                      {card.buttonText}
                    </S.CardButton>
                  )}
                </S.CardContent>
              </S.Card>
            ))}
          </S.CardGrid>
        )}
      </S.Content>

      {/* Модалка popup: баннер, заголовок/подзаголовок/note, CTA-кнопка, описание, раскрывающийся блок T&C */}
      {modalContent && (
        <S.ModalOverlay onClick={closeModal} role="dialog" aria-modal="true">
          <S.ModalBox onClick={(e) => e.stopPropagation()}>
            <S.ModalClose
              type="button"
              onClick={closeModal}
              aria-label="Закрыть"
            />
            {modalContent.imageUrl ? (
              <S.ModalImageWrap>
                <S.ModalImage $imageUrl={modalContent.imageUrl} />
                <S.ModalImageOverlay>
                  {modalContent.title && (
                    <S.ModalTitle>{modalContent.title}</S.ModalTitle>
                  )}
                  {modalContent.subtitle && (
                    <S.ModalSubtitle>{modalContent.subtitle}</S.ModalSubtitle>
                  )}
                  {modalContent.note && (
                    <S.ModalNote>{modalContent.note}</S.ModalNote>
                  )}
                  {modalContent.buttonText && modalContent.buttonLink && (
                    <S.ModalButton
                      href={modalContent.buttonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {modalContent.buttonText}
                    </S.ModalButton>
                  )}
                </S.ModalImageOverlay>
              </S.ModalImageWrap>
            ) : null}
            <S.ModalBody>
              {!modalContent.imageUrl && (
                <>
                  {modalContent.title && (
                    <S.ModalTitle>{modalContent.title}</S.ModalTitle>
                  )}
                  {modalContent.subtitle && (
                    <S.ModalSubtitle>{modalContent.subtitle}</S.ModalSubtitle>
                  )}
                  {modalContent.note && (
                    <S.ModalNote>{modalContent.note}</S.ModalNote>
                  )}
                  {modalContent.buttonText && modalContent.buttonLink && (
                    <S.ModalButton
                      href={modalContent.buttonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {modalContent.buttonText}
                    </S.ModalButton>
                  )}
                </>
              )}
              {modalContent.description && (
                <S.ModalDescription
                  dangerouslySetInnerHTML={{
                    __html: modalContent.description,
                  }}
                />
              )}
              {hasRichTextContent(modalContent.termsBody) && (
                <S.ToggleBlock>
                  <S.ToggleHeader
                    type="button"
                    onClick={toggleTerms}
                    $open={termsOpen}
                    aria-expanded={termsOpen}
                  >
                    <span>
                      {modalContent.termsTitle?.trim() || "Terms & Conditions"}
                    </span>
                    <svg
                      className="chevron"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </S.ToggleHeader>
                  <S.ToggleContent $open={termsOpen}>
                    <S.ToggleInner
                      dangerouslySetInnerHTML={{
                        __html: modalContent.termsBody ?? "",
                      }}
                    />
                  </S.ToggleContent>
                </S.ToggleBlock>
              )}
            </S.ModalBody>
          </S.ModalBox>
        </S.ModalOverlay>
      )}

      <S.DesktopWrapper>
        <SEO lang={yourLang} data={pageData} />
        <PreFooter />
        <Footer />
      </S.DesktopWrapper>
      <S.MobileWrapper>
        <S.LocalWrapper><SEO lang={yourLang} data={pageData} /></S.LocalWrapper>
        <PreFooterMobile />
      </S.MobileWrapper>
    </S.Wrapper>
  );
};

export default PromosPage;
