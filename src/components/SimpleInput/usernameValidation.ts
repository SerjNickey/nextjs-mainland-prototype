/**
 * Правила username из попапа: 3–16 символов, латиница, цифры, спецсимволы, без пробелов.
 */
const USERNAME_ALLOWED_PATTERN =
  /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]+$/;

export function isUsernameFormatValid(value: string): boolean {
  const len = value.length;
  if (len < 3 || len > 16) return false;
  return USERNAME_ALLOWED_PATTERN.test(value);
}
