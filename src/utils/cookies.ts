/**
 * Функциональные cookies: согласие, язык, IP (всё только после согласия пользователя).
 */

const COOKIE_CONSENT_NAME = "cookie_consent";
const COOKIE_LANG_NAME = "lang";
const COOKIE_IP_NAME = "user_ip";
const MAX_AGE_DAYS = 365;

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(
  name: string,
  value: string,
  maxAgeDays: number = MAX_AGE_DAYS
): void {
  if (typeof document === "undefined") return;
  const maxAge = maxAgeDays * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function getCookieConsent(): boolean {
  return getCookie(COOKIE_CONSENT_NAME) === "true";
}

export function setCookieConsent(accepted: boolean): void {
  if (accepted) {
    setCookie(COOKIE_CONSENT_NAME, "true");
  } else {
    document.cookie = `${COOKIE_CONSENT_NAME}=; path=/; max-age=0`;
  }
}

export function getCookieLang(): string | null {
  return getCookie(COOKIE_LANG_NAME);
}

export function setCookieLang(lang: string): void {
  if (!lang || typeof document === "undefined") return;
  setCookie(COOKIE_LANG_NAME, lang);
}

export function getCookieIp(): string | null {
  return getCookie(COOKIE_IP_NAME);
}

/** Записывает IP в cookie только после согласия (вызывать при consent). */
export function setCookieIp(ip: string): void {
  if (!ip || typeof document === "undefined") return;
  setCookie(COOKIE_IP_NAME, ip);
}
