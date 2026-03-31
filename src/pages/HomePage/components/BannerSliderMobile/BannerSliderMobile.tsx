import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { HomePageBannerData } from "./bannerData";
import { getBannerSlides } from "./bannerData";
import * as S from "./BannerSliderMobile.styled";

export interface BannerSliderMobileProps {
  data?: HomePageBannerData;
  countryCode?: string;
  countryName?: string;
  dotsActive?: boolean;
}

const BannerSliderMobile = ({
  data,
  countryCode = "",
  countryName = "",
  dotsActive = true,
}: BannerSliderMobileProps) => {
  const slides = useMemo(
    () => getBannerSlides(data ?? null, countryCode, countryName),
    [data, countryCode, countryName]
  );
  const shouldLoop = slides.length > 1;
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: shouldLoop, align: "start" },
    [
      Autoplay({
        delay: 5000,
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
      align: "start",
    });
    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, slides.length, shouldLoop]);

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

  if (slides.length === 0) {
    return null;
  }

  return (
    <S.Wrapper>
      <S.Viewport ref={emblaRef}>
        <S.Container>
          {slides.map((slide, index) => (
            <S.Slide key={`${slide.title}-${index}`}>
              <S.SlideContent $backgroundUrl={slide.imageUrl} />
            </S.Slide>
          ))}
        </S.Container>
      </S.Viewport>
      {showDots && (
        <S.Controls>
          <S.Dots>
            {Array.from({ length: slides.length }).map((_, index) => (
              <S.DotButton
                key={`banner-mobile-dot-${index}`}
                type="button"
                $isActive={index === selectedIndex}
                onClick={() => scrollTo(index)}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </S.Dots>
        </S.Controls>
      )}
    </S.Wrapper>
  );
};

export default BannerSliderMobile;
