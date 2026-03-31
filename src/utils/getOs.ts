export type ClientOS = "ios" | "android" | "windows" | "mac" | "unknown";

/**
 * Определение ОС по User-Agent (клиент).
 * iPadOS 13+ в Safari может идти без «iPad» в UA — учитываем до ветки `mac`.
 */
export const getOS = (): ClientOS => {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return "unknown";
  }

  const userAgent = navigator.userAgent;

  if (
    /iPad|iPhone|iPod/.test(userAgent) &&
    !("MSStream" in window ? window.MSStream : false)
  ) {
    return "ios";
  }

  if (
    navigator.platform === "MacIntel" &&
    typeof navigator.maxTouchPoints === "number" &&
    navigator.maxTouchPoints > 1
  ) {
    return "ios";
  }

  if (/android/i.test(userAgent)) {
    return "android";
  }
  if (/win/i.test(userAgent)) {
    return "windows";
  }
  if (/mac/i.test(userAgent)) {
    return "mac";
  }
  return "unknown";
};

export function isIosClient(): boolean {
  return getOS() === "ios";
}
