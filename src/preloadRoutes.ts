/**
 * Предзагрузка чанков страниц по пути.
 * Вызывать при onMouseEnter / onMouseDown по табу — к моменту клика чанк часто уже загружен.
 */
const preloaders: Record<string, () => Promise<unknown>> = {
  "/": () => import("./pages/HomePage/HomePage"),
  "/promos": () => import("./pages/PromosPage/PromosPage"),
  "/ppsochi": () => import("./pages/SochiPage/SochiPage"),
  "/poker": () => import("./pages/PokerSchoolPage/PokerSchoolPage"),
  "/access": () => import("./pages/AccessPage/AccessPage"),
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

export function preloadRoute(path: string): void {
  const key = normalized(path);
  if (preloaders[key]) {
    preloaders[key]();
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

/** Подгрузить чанки всех основных разделов (вызывать с задержкой после mount меню). */
export function preloadAllRoutes(): void {
  PRELOADABLE_PATHS.forEach(preloadRoute);
}
