import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { MEDIA_ORIGIN } from "../../../../config/env";
import * as S from "./Promos.styled";

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

/** Контент модального окна при action.type === "popup". */
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

type Slide = {
  id: string;
  title: string;
  text: string;
  imageUrl?: string;
  buttonText: string;
  showButton: boolean;
  action:
    | { type: "link"; url: string; external: boolean }
    | { type: "popup"; content: PopupContent };
};

type HomePageData = {
  promos_title?: string;
  promos?: Array<{
    id?: string;
    value?: {
      title?: string;
      subtitle?: string;
      description?: string;
      image?: { file?: string };
      extra?: Array<{
        type?: string;
        value?: {
          extra_button_text?: string;
          link?: string;
          title?: string;
          subtitle?: string;
          note?: string;
          button_text?: string;
          button_link?: string;
          image?: { file?: string };
          description?: string;
          terms_and_conditions_title?: string;
          terms_and_conditions?: string;
        };
      }>;
    };
  }>;
} | null;

const getSlides = (data: HomePageData): Slide[] => {
  const promos = data?.promos ?? [];
  if (!Array.isArray(promos) || promos.length === 0) return [];

  return promos
    .map((promo, index) => {
      const v = promo.value;
      const title =
        typeof v?.title === "string" && v.title.trim()
          ? v.title
          : `Promo ${index + 1}`;
      const text = typeof v?.subtitle === "string" ? v.subtitle : "";
      const imageUrl = v?.image ? getFileUrl(v.image) : undefined;
      const extra = v?.extra?.[0];
      const buttonText =
        (extra?.value?.extra_button_text ?? "DETAILS").trim() || "DETAILS";

      let action: Slide["action"];
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
        action = {
          type: "popup",
          content: {
            title: x.title,
            subtitle: x.subtitle,
            note: x.note,
            buttonText: x.button_text,
            buttonLink: x.button_link ? normalizeUrl(x.button_link) : undefined,
            imageUrl: getFileUrl(x.image) || undefined,
            description: x.description,
            termsTitle: x.terms_and_conditions_title,
            termsBody: x.terms_and_conditions,
          },
        };
        showButton = true;
      } else {
        action = { type: "link", url: "#", external: false };
      }

      return {
        id: String(promo.id ?? `slide-${index}`),
        title,
        text,
        imageUrl,
        buttonText,
        showButton,
        action,
      };
    })
    .filter(Boolean);
};

const getTitle = (data: HomePageData): string => {
  if (typeof data?.promos_title === "string" && data.promos_title.trim()) {
    return data.promos_title;
  }
  return "Title is not found";
};

interface PromosProps {
  data?: HomePageData;
  dotsActive?: boolean;
}

const Promos = ({ data, dotsActive }: PromosProps) => {
  const slides = useMemo(() => getSlides(data ?? null), [data]);
  const title = useMemo(() => getTitle(data ?? null), [data]);
  const shouldLoop = slides.length > 1;
  const [modalContent, setModalContent] = useState<PopupContent | null>(null);
  const [termsOpen, setTermsOpen] = useState(false);

  const handleSlideAction = useCallback((slide: Slide) => {
    if (slide.action.type === "link") {
      if (slide.action.external) {
        window.open(slide.action.url, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = slide.action.url;
      }
    } else {
      setModalContent(slide.action.content);
      setTermsOpen(false);
    }
  }, []);

  const closeModal = useCallback(() => setModalContent(null), []);
  const toggleTerms = useCallback(() => setTermsOpen((prev) => !prev), []);

  // useEffect(() => {
  //   if (data) {
  //     console.log("[Promos] data:", data);
  //   }
  // }, [data]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: shouldLoop, align: slides.length < 3 ? "center" : "start" },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
      }),
    ]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const totalSlides = slides.length;
      const index = emblaApi.selectedScrollSnap();
      const normalized =
        totalSlides > 0
          ? ((index % totalSlides) + totalSlides) % totalSlides
          : 0;
      setSelectedIndex(normalized);
    };

    emblaApi.reInit({
      loop: shouldLoop,
      align: slides.length < 3 ? "center" : "start",
    });
    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, slides.length, shouldLoop]);

  /** При открытой модалке ставим автоплей на паузу, при закрытии — возобновляем. */
  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = emblaApi.plugins()?.autoplay;
    if (!autoplay) return;
    if (modalContent) {
      autoplay.stop();
    } else {
      autoplay.reset();
    }
  }, [emblaApi, modalContent]);

  /** Жёсткая блокировка скролла при открытой модалке: body в position:fixed, после закрытия восстанавливаем scroll (как на PromosPage). */
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

  const onNavButtonClick = useCallback((api: typeof emblaApi) => {
    const autoplay = api?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      onNavButtonClick(emblaApi);
    },
    [emblaApi, onNavButtonClick]
  );

  const showDots = dotsActive && slides.length > 1;

  return (
    <S.Wrapper>
      <S.Title>{title}</S.Title>
      <S.Viewport ref={emblaRef}>
        <S.Container $isCentered={slides.length < 3}>
          {slides.map((slide) => (
            <S.Slide key={slide.id}>
              <S.SlideContent $backgroundUrl={slide.imageUrl}>
                <S.SlideTitle>{slide.title}</S.SlideTitle>
                <S.SlideText>{slide.text}</S.SlideText>
                {slide.showButton && (
                  <S.SlideButton
                    type="button"
                    onClick={() => handleSlideAction(slide)}
                  >
                    {slide.buttonText}
                  </S.SlideButton>
                )}
              </S.SlideContent>
            </S.Slide>
          ))}
        </S.Container>
      </S.Viewport>
      {showDots && (
        <S.Controls>
          <S.Dots>
            {Array.from({ length: slides.length }).map((_, index) => (
              <S.DotButton
                key={`dot-${index}`}
                type="button"
                $isActive={index === selectedIndex}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </S.Dots>
        </S.Controls>
      )}

      {modalContent && (
        <S.ModalOverlay onClick={closeModal} role="dialog" aria-modal="true">
          <S.ModalBox onClick={(e) => e.stopPropagation()}>
            <S.ModalClose
              type="button"
              onClick={closeModal}
              aria-label="Закрыть"
            >
              ×
            </S.ModalClose>
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
              {(modalContent.termsTitle || modalContent.termsBody) && (
                <S.ToggleBlock>
                  <S.ToggleHeader
                    type="button"
                    onClick={toggleTerms}
                    $open={termsOpen}
                    aria-expanded={termsOpen}
                  >
                    <span>
                      {modalContent.termsTitle ?? "Terms & Conditions"}
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
    </S.Wrapper>
  );
};

export default Promos;
