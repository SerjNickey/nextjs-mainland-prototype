/**
 * Проверка формата email на клиенте (не полный RFC 5322).
 */
const EMAIL_PATTERN =
  // Требования:
  // - локальная часть: как в текущем паттерне (упрощённо, не полный RFC)
  // - домен: минимум 1 точка
  // - последняя часть (TLD) после последней точки: минимум 2 символа
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,60}[a-zA-Z0-9])$/;

export function isEmailFormatValid(value: string): boolean {
  const v = value.trim();
  if (!v || v.length > 254) return false;
  return EMAIL_PATTERN.test(v);
}
