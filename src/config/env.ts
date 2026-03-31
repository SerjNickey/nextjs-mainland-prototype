/**
 * Переменные окружения (Vite: только VITE_* доступны в клиенте).
 * Базовый URL медиа/бэкенда для относительных путей из API.
 */
export const MEDIA_ORIGIN =
  (import.meta.env.VITE_MEDIA_ORIGIN || "https://pokerplanets.pavva.org").replace(/\/$/, "");

/** Алиас для совместимости (PokerSchoolPage и др.) */
export const MEDIA_BASE_URL = MEDIA_ORIGIN;
