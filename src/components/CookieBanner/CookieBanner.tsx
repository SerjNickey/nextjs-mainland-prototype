/**
 * Баннер Cookies по ТЗ:
 * - Функциональные cookies после согласия: согласие, язык, IP (IP определяется через api.ipify.org и записывается в cookie).
 * - Текст из конфигурации (baseApi), мультиязычность через выбранный язык.
 * - Показывается только когда страница полностью загружена (контекст isPageReady).
 */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import type { RootState } from "../../store";
import { usePageReady } from "../../contexts/PageReadyContext";
import { useGetBasePageQuery } from "../../store/basePageApi";
import {
  getCookieConsent,
  setCookieConsent,
  setCookieLang,
  setCookieIp,
} from "../../utils/cookies";
import * as S from "./CookieBanner.styled";

const COOKIE_BANNER_DELAY_MS = 500;

const CookieBanner = () => {
  const { pathname } = useLocation();
  const isPageReady = usePageReady();
  const yourLang = useSelector(
    (s: RootState) => s.registration?.yourLang ?? "en"
  );
  const { data: baseData } = useGetBasePageQuery(yourLang);
  const [visible, setVisible] = useState(false);
  const [allowShow, setAllowShow] = useState(false);

  useEffect(() => {
    setVisible(!getCookieConsent());
  }, []);

  useEffect(() => {
    if (!isPageReady) {
      setAllowShow(false);
      return;
    }
    const t = setTimeout(() => setAllowShow(true), COOKIE_BANNER_DELAY_MS);
    return () => clearTimeout(t);
  }, [isPageReady]);

  const handleAccept = () => {
    setCookieConsent(true);
    setCookieLang(yourLang);
    setVisible(false);
    // Определяем IP и записываем в cookie после согласия
    fetch("https://api.ipify.org?format=json")
      .then((r) => r.json())
      .then((data: { ip?: string }) => data?.ip && setCookieIp(data.ip))
      .catch(() => {});
  };

  const cookiesText = baseData?.cookies_text ?? "";
  const buttonText = baseData?.cookie_button_text ?? "OK";

  if (pathname === "/access" || !isPageReady || !allowShow) return null;
  if (!visible || (!cookiesText && !buttonText)) return null;

  return (
    <S.CookieWrap role="dialog" aria-label="Cookie consent">
      {cookiesText && (
        <S.CookieText dangerouslySetInnerHTML={{ __html: cookiesText }} />
      )}
      <S.CookieButton type="button" onClick={handleAccept}>
        {buttonText}
      </S.CookieButton>
    </S.CookieWrap>
  );
};

export default CookieBanner;
