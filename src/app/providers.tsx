"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { I18nextProvider } from "react-i18next";
import { store, type RootState } from "@/store";
import { theme } from "@/theme";
import { GlobalStyles } from "@/GlobalStyles";
import i18n from "@/i18n";
import { PageReadyProvider } from "@/contexts/PageReadyContext";
import { AppShell } from "@/AppShell";
import CookieBanner from "@/components/CookieBanner";
import { setYourLang, setQRFModalIsOpen } from "@/store/registrationSlice";
import QRFModal from "@/components/QRFModal/QRFModal";
import QRForm from "@/widgets/QRForm/QRForm";
import SendPasswordModal from "@/widgets/SendPasswordModal/SendPasswordModal";
import {
  getCookieConsent,
  getCookieLang,
  setCookieLang,
} from "@/utils/cookies";

function SyncLangFromCookie() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!getCookieConsent()) return;
    const lang = getCookieLang();
    if (lang === "ru" || lang === "en") {
      dispatch(setYourLang(lang));
      i18n.changeLanguage(lang);
      setCookieLang(lang);
    } else {
      const defaultLang = "en";
      dispatch(setYourLang(defaultLang));
      setCookieLang(defaultLang);
    }
  }, [dispatch]);
  return null;
}

function Modals() {
  const dispatch = useDispatch();
  const qrfModalIsOpen = useSelector(
    (state: RootState) => state.registration.qrfModalIsOpen
  );
  const closeQRFModal = () => dispatch(setQRFModalIsOpen(false));

  return (
    <>
      <QRFModal isOpen={qrfModalIsOpen} onClose={closeQRFModal}>
        <QRForm />
      </QRFModal>
      <SendPasswordModal />
    </>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <I18nextProvider i18n={i18n}>
          <PageReadyProvider>
            <SyncLangFromCookie />
            <AppShell>{children}</AppShell>
            <CookieBanner />
            <Modals />
          </PageReadyProvider>
        </I18nextProvider>
      </ThemeProvider>
    </Provider>
  );
}
