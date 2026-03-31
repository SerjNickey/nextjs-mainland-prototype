/**
 * BenefitCards — секция «Почему выбрать PokerPlanets» с переворачивающимися карточками.
 *
 * Данные берутся из homePageApi (проп data) или из дефолтных констант.
 * Первая карточка — крупная (2 строки сетки), остальные — обычные.
 * Лицевая сторона: изображение на весь фон + заголовок + кнопка переворота.
 * Обратная сторона: чёрный фон + заголовок + описание (HTML) + кнопка «Подробнее» (кроме 1-й) + кнопка переворота.
 */
import { useMemo, useState } from "react";
import { MEDIA_ORIGIN } from "../../../../config/env";
import * as S from "./BenefitCards.styled";

/**
 * Нормализует URL картинки: протокол, относительные пути, http→https при необходимости.
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
 * Достаёт URL файла из объекта API (file как строка или объект с url).
 */
const getFileUrl = (source?: { file?: unknown }) => {
  if (typeof source?.file === "string") return normalizeUrl(source.file);
  const fileObject = source?.file as { url?: unknown } | undefined;
  if (typeof fileObject?.url === "string") return normalizeUrl(fileObject.url);
  return "";
};

/** Одна карточка преимущества (уже нормализованная для UI) */
export type BenefitCardItem = {
  id: string;
  title: string;
  /** HTML-описание, рендерится через dangerouslySetInnerHTML на обороте */
  description?: string;
  /** URL картинки на лицевой стороне (на весь фон) */
  imageUrl?: string;
  imageUrlBack?: string;
  /** Ссылка для кнопки на обратной стороне (карточки 2–5) */
  detailsUrl?: string;
  /** Текст кнопки (если не задан — «MORE DETAILS») */
  buttonText?: string;
  /** В БО: карточка включена (ON/OFF); false — не показывать */
  active?: boolean;
  /** true = benefit_card_primary (большая карточка, 2 строки), false = benefit_card_secondary */
  isPrimary?: boolean;
};

/**
 * Формат ответа API для секции benefit_cards (поля home-страницы).
 * Передаётся как data из useGetHomePageQuery().
 */
export type HomePageBenefitData = {
  benefit_cards_title?: string;
  benefit_cards?: Array<{
    type?: string;
    id?: string;
    value?: {
      title?: string;
      subtitle?: string;
      description?: string;
      image?: { file?: string };
      button_text?: string;
      button_url?: string;
    };
  }>;
} | null;

/**
 * Преобразует сырые данные API в массив BenefitCardItem.
 * Пропускает элементы без value или без title.
 */
const getCardsFromData = (data: HomePageBenefitData): BenefitCardItem[] => {
  const raw = data?.benefit_cards ?? [];
  if (!Array.isArray(raw) || raw.length === 0) return [];
  const mapped = raw.map((item): BenefitCardItem | null => {
    const v = item.value;
    if (!v) return null;
    const title = typeof v.title === "string" && v.title.trim() ? v.title : "";
    if (!title) return null;
    return {
      id: String(item.id ?? Math.random().toString(36).slice(2)),
      title,
      description:
        typeof v.description === "string" && v.description.trim()
          ? v.description
          : undefined,
      imageUrl: getFileUrl(v.image) || undefined,
      imageUrlBack: undefined,
      detailsUrl:
        typeof v.button_url === "string" && v.button_url.trim()
          ? v.button_url
          : undefined,
      buttonText:
        typeof v.button_text === "string" && v.button_text.trim()
          ? v.button_text
          : undefined,
      active: true,
      isPrimary: item.type === "benefit_card_primary",
    };
  });
  return mapped.filter((c): c is BenefitCardItem => c !== null);
};

/** Иконка переворота карточки (стрелка по кругу), внутри FlipButton крутится при hover */
const FlipIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

/** Пропсы компонента BenefitCards */
interface BenefitCardsProps {
  /** Данные из useGetHomePageQuery(); секция показывается только при непустом benefit_cards */
  data?: HomePageBenefitData;
}

const BenefitCards = ({ data }: BenefitCardsProps) => {
  /** Индекс перевёрнутой карточки (null — все лицом вверх) */
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  /** Карточки и заголовок только из API */
  const { title: resolvedTitle, cards: resolvedCards } = useMemo(() => {
    const fromApi = data ? getCardsFromData(data) : [];
    const title =
      typeof data?.benefit_cards_title === "string" &&
      data.benefit_cards_title.trim()
        ? data.benefit_cards_title.trim()
        : "";
    return { title, cards: fromApi };
  }, [data]);

  /** Скрываем карточки с active === false (настройка в БО) */
  const visibleCards = resolvedCards.filter((c) => c.active !== false);
  if (visibleCards.length === 0) return null;

  /** Клик по кнопке переворота: перевернуть эту карточку или вернуть обратно */
  const handleFlipButtonClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setFlippedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <S.Wrapper>
      {resolvedTitle && (
        <S.TitleWrapper>
          <S.Title>{resolvedTitle}</S.Title>
        </S.TitleWrapper>
      )}
      <S.Grid>
        {visibleCards.map((card, index) => {
          const isFirst = card.isPrimary === true; // benefit_card_primary — большая (2 строки)
          const isFlipped = flippedIndex === index;
          return (
            <S.CardWrapper
              key={card.id}
              $isFirst={isFirst}
              onClick={(e) => handleFlipButtonClick(e, index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleFlipButtonClick(
                    e as unknown as React.MouseEvent,
                    index
                  );
                }
              }}
              aria-label={
                isFlipped
                  ? "Перевернуть карточку обратно"
                  : "Перевернуть карточку"
              }
            >
              <S.CardInner $flipped={isFlipped}>
                {/* Лицевая сторона: фон-картинка на весь размер + заголовок + кнопка переворота */}
                <S.CardFront>
                  <S.CardImage $imageUrl={card.imageUrl} aria-hidden />
                  <S.CardContent>
                    <S.CardTitleFront>{card.title}</S.CardTitleFront>
                  </S.CardContent>
                  <S.FlipButton type="button" aria-hidden>
                    <FlipIcon />
                  </S.FlipButton>
                </S.CardFront>
                {/* Оборот: чёрный фон, заголовок, описание (HTML), у 2–5 карточек — кнопка «Подробнее», у всех — кнопка переворота */}
                <S.CardBack>
                  <S.CardContent>
                    <S.CardTitle>{card.title}</S.CardTitle>
                    {card.description && (
                      <S.CardDescription
                        dangerouslySetInnerHTML={{ __html: card.description }}
                      />
                    )}
                  </S.CardContent>
                  {card.detailsUrl?.trim() && card.detailsUrl !== "#" && (
                    <S.MoreDetailsButton
                      href={card.detailsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="Подробнее"
                    >
                      {card.buttonText?.trim() || "MORE DETAILS"}
                    </S.MoreDetailsButton>
                  )}
                  <S.FlipButton type="button" aria-hidden>
                    <FlipIcon />
                  </S.FlipButton>
                </S.CardBack>
              </S.CardInner>
            </S.CardWrapper>
          );
        })}
      </S.Grid>
    </S.Wrapper>
  );
};

export default BenefitCards;
