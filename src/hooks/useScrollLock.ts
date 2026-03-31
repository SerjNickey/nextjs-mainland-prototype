// useScrollLock.ts
import { useRef, useCallback, useEffect } from "react";

const useScrollLock = () => {
  const scrollPosition = useRef(0);
  const isLocked = useRef(false);
  const scrollbarWidth = useRef(0);

  const calculateScrollbarWidth = useCallback(() => {
    // Создаем временный элемент для вычисления ширины скроллбара
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.overflow = "scroll";
    document.body.appendChild(outer);

    const inner = document.createElement("div");
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    outer.parentNode?.removeChild(outer);

    return scrollbarWidth;
  }, []);

  const lockScroll = useCallback(() => {
    if (isLocked.current || typeof document === "undefined") return;

    scrollPosition.current = window.pageYOffset;
    scrollbarWidth.current = calculateScrollbarWidth();

    const body = document.body;
    // const html = document.documentElement;

    // Сохраняем текущую ширину body
    const bodyPaddingRight =
      parseInt(window.getComputedStyle(body).paddingRight, 10) || 0;

    // Блокируем прокрутку
    body.style.overflow = "hidden";
    body.style.touchAction = "none";
    body.style.overscrollBehavior = "none";

    // Добавляем отступ для компенсации скроллбара
    if (scrollbarWidth.current > 0) {
      body.style.paddingRight = `${bodyPaddingRight + scrollbarWidth.current}px`;
    }

    // Фиксируем позицию
    body.style.position = "fixed";
    body.style.top = `-${scrollPosition.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.height = "100vh";

    isLocked.current = true;

    return scrollPosition.current;
  }, [calculateScrollbarWidth]);

  const unlockScroll = useCallback(() => {
    if (!isLocked.current || typeof document === "undefined") return;

    const body = document.body;
    const scrollY = Math.abs(parseInt(body.style.top || "0", 10));

    // Восстанавливаем стили
    body.style.overflow = "";
    body.style.touchAction = "";
    body.style.overscrollBehavior = "";
    body.style.paddingRight = "";
    body.style.position = "";
    body.style.top = "";
    body.style.left = "";
    body.style.right = "";
    body.style.height = "";

    // Восстанавливаем позицию прокрутки
    if (scrollY) {
      window.scrollTo(0, scrollY);
    }

    isLocked.current = false;
  }, []);

  // Автоматическая разблокировка при размонтировании компонента
  useEffect(() => {
    return () => {
      if (isLocked.current) {
        unlockScroll();
      }
    };
  }, [unlockScroll]);

  return {
    lockScroll,
    unlockScroll,
    isLocked: isLocked.current,
  };
};

export default useScrollLock;
