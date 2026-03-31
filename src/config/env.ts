/**
 * Переменные окружения (Next: NEXT_PUBLIC_* на клиенте).
 * Базовый URL медиа/бэкенда для относительных путей из API.
 */
export const MEDIA_ORIGIN = (
  process.env.NEXT_PUBLIC_MEDIA_ORIGIN || "https://pokerplanets.pavva.org"
).replace(/\/$/, "");

/** Алиас для совместимости (PokerSchoolPage и др.) */
export const MEDIA_BASE_URL = MEDIA_ORIGIN;
