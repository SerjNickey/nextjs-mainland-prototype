/**
 * Предзагрузка маршрутов Next.js (prefetch RSC).
 * Вызывать из компонентов с useRouter: onMouseEnter / onMouseDown по табу.
 */
const preloaders: Record<string, true> = {
  "/": true,
  "/promos": true,
  "/ppsochi": true,
  "/poker": true,
  "/access": true,
};

const normalized = (path: string) => path.replace(/\/$/, "") || "/";

/** Префиксы путей приложения (по первому сегменту после слэша). Без привязки к домену. */
const APP_ROUTE_PREFIXES = [
  "/promos",
  "/ppsochi",
  "/poker",
  "/casinoandsports",
  "/more",
  "/access",
] as const;

/**
 * Является ли путь одним из маршрутов приложения (по содержимому после первого слэша).
 * Используется для определения внутренней ссылки без проверки домена.
 */
export function isAppRoutePath(path: string): boolean {
  const p = normalized(path);
  if (p === "/") return true;
  return APP_ROUTE_PREFIXES.some(
    (prefix) => p === prefix || p.startsWith(prefix + "/")
  );
}

export function preloadRoute(
  router: { prefetch: (href: string) => void },
  path: string
): void {
  const key = normalized(path);
  if (preloaders[key]) {
    router.prefetch(key);
  }
}

/** Пути, которые можно прелоадить (для фоновой подгрузки после загрузки страницы). */
export const PRELOADABLE_PATHS = [
  "/",
  "/poker",
  "/promos",
  "/ppsochi",
  "/access",
] as const;

/** Подгрузить маршруты Next (prefetch) после mount меню. */
export function preloadAllRoutes(router: {
  prefetch: (href: string) => void;
}): void {
  PRELOADABLE_PATHS.forEach((p) => router.prefetch(p));
}
