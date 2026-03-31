import { useState, useRef, useEffect } from "react";

const DEFAULT_THRESHOLD_HIDE = 60;
const DEFAULT_THRESHOLD_SHOW = 24;
const DEFAULT_TOP_ZONE = 80;

export type UseHeaderScrollVisibilityOptions = {
  /** Порог (px) скролла вниз — после него скрываем хедер */
  thresholdHide?: number;
  /** Порог (px) скролла вверх — после него показываем хедер */
  thresholdShow?: number;
  /** Высота зоны "сверху страницы" (px): в ней хедер всегда видим */
  topZone?: number;
};

/**
 * Логика показа/скрытия хедера по скроллу.
 * Скрытие через transform в layout (без изменения высоты) — страница и скролл не скачут.
 */
export function useHeaderScrollVisibility(
  options: UseHeaderScrollVisibilityOptions = {}
): boolean {
  const {
    thresholdHide = DEFAULT_THRESHOLD_HIDE,
    thresholdShow = DEFAULT_THRESHOLD_SHOW,
    topZone = DEFAULT_TOP_ZONE,
  } = options;
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY ?? window.pageYOffset;

      if (scrollY <= topZone) {
        setVisible(true);
        lastScrollY.current = scrollY;
        return;
      }

      const delta = scrollY - lastScrollY.current;

      if (delta >= thresholdHide) {
        setVisible(false);
        lastScrollY.current = scrollY;
      } else if (delta <= -thresholdShow) {
        setVisible(true);
        lastScrollY.current = scrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [thresholdHide, thresholdShow, topZone]);

  return visible;
}
