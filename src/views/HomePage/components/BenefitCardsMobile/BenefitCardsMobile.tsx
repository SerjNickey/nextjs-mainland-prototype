/**
 * Мобильная секция benefit cards: слайдер (Embla), без flip.
 * Макет: изображение → заголовок → описание (HTML) → кнопка MORE DETAILS + точки.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { MEDIA_ORIGIN } from "../../../../config/env";
import * as S from "./BenefitCardsMobile.styled";

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

const getFileUrl = (source?: { file?: unknown }) => {
  if (typeof source?.file === "string") return normalizeUrl(source.file);
  const fileObject = source?.file as { url?: unknown } | undefined;
  if (typeof fileObject?.url === "string") return normalizeUrl(fileObject.url);
  return "";
};

export type BenefitCardItem = {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  detailsUrl?: string;
  buttonText?: string;
  active?: boolean;
  isPrimary?: boolean;
};

export type HomePageBenefitData = {
  benefit_cards_title?: string;
  benefit_cards?: Array<{
    type?: string;
    id?: string;
    value?: {
      title?: string;
      subtitle?: string;
      description?: string;
      image_mobile?: { file?: string };
      button_text?: string;
      button_url?: string;
    };
  }>;
} | null;

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
      imageUrl: getFileUrl(v.image_mobile) || undefined,
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

type BenefitCardsMobileProps = {
  data?: HomePageBenefitData;
};

const BenefitCardsMobile = ({ data }: BenefitCardsMobileProps) => {
  const { title: resolvedTitle, cards: resolvedCards } = useMemo(() => {
    const fromApi = data ? getCardsFromData(data) : [];
    const title =
      typeof data?.benefit_cards_title === "string" &&
      data.benefit_cards_title.trim()
        ? data.benefit_cards_title.trim()
        : "";
    return { title, cards: fromApi };
  }, [data]);

  const visibleCards = resolvedCards.filter((c) => c.active !== false);
  const slideCount = visibleCards.length;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: slideCount > 1,
    align: "center",
    containScroll: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const n = emblaApi.scrollSnapList().length;
      const idx = emblaApi.selectedScrollSnap();
      setSelectedIndex(n > 0 ? ((idx % n) + n) % n : 0);
    };

    emblaApi.reInit({
      loop: slideCount > 1,
      align: "center",
      containScroll: false,
    });
    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, slideCount]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  if (slideCount === 0) return null;

  const showDots = slideCount > 1;

  return (
    <S.Wrapper>
      {resolvedTitle && (
        <S.TitleWrapper>
          <S.Title>{resolvedTitle}</S.Title>
        </S.TitleWrapper>
      )}
      <S.Viewport ref={emblaRef}>
        <S.Container>
          {visibleCards.map((card) => (
            <S.Slide key={card.id}>
              <S.Card>
                <S.ImageWrap>
                  <S.CardImage $imageUrl={card.imageUrl} role="presentation" />
                </S.ImageWrap>
                <S.CardBody>
                  <S.CardTitle>{card.title}</S.CardTitle>
                  {card.description ? (
                    <S.CardDescription
                      dangerouslySetInnerHTML={{ __html: card.description }}
                    />
                  ) : null}
                  {card.detailsUrl?.trim() && card.detailsUrl !== "#" ? (
                    <S.MoreDetailsButton
                      href={card.detailsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {card.buttonText?.trim() || "MORE DETAILS"}
                    </S.MoreDetailsButton>
                  ) : null}
                </S.CardBody>
              </S.Card>
            </S.Slide>
          ))}
        </S.Container>
      </S.Viewport>
      {showDots && (
        <S.Controls>
          <S.Dots>
            {visibleCards.map((_, index) => (
              <S.DotButton
                key={`benefit-dot-${index}`}
                type="button"
                $isActive={index === selectedIndex}
                onClick={() => scrollTo(index)}
                aria-label={`Слайд ${index + 1}`}
              />
            ))}
          </S.Dots>
        </S.Controls>
      )}
    </S.Wrapper>
  );
};

export default BenefitCardsMobile;
