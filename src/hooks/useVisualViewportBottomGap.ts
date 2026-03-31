import { useLayoutEffect, type RefObject } from "react";

/**
 * На iOS Safari высота layout viewport меняется при показе/скрытии нижней панели;
 * `position: fixed; bottom: …` из‑за этого «прыгает». Добавляем зазор между низом
 * layout и низом visual viewport в CSS-переменную на переданном элементе.
 */
export function useVisualViewportBottomGap(
  targetRef: RefObject<HTMLElement | null>
): void {
  useLayoutEffect(() => {
    const vv = window.visualViewport;
    const el = targetRef.current;
    if (!vv || !el) return;

    const update = () => {
      const gap = Math.max(
        0,
        window.innerHeight - vv.height - vv.offsetTop
      );
      el.style.setProperty("--vv-layout-bottom-gap", `${gap}px`);
    };

    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    window.addEventListener("resize", update);

    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      el.style.removeProperty("--vv-layout-bottom-gap");
    };
  }, [targetRef]);
}
