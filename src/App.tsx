import {
  lazy,
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { HelmetProvider } from "react-helmet-async";
import i18n from "./i18n";
import { GlobalStyles } from "./GlobalStyles";
import Loader from "./components/Loader/Loader";
import CookieBanner from "./components/CookieBanner";
import { PageReadyProvider } from "./contexts/PageReadyContext";
import { GlobalLoadingContext } from "./contexts/GlobalLoadingContext";
import { useGetBasePageQuery } from "./store/basePageApi";
import { setYourLang, setQRFModalIsOpen } from "./store/registrationSlice";
import QRFModal from "./components/QRFModal/QRFModal";
import QRForm from "./widgets/QRForm/QRForm";
import SendPasswordModal from "./widgets/SendPasswordModal/SendPasswordModal";
import {
  getCookieConsent,
  getCookieLang,
  setCookieLang,
} from "./utils/cookies";
import { isAppRoutePath } from "./preloadRoutes";

/** При монтировании (Suspense fallback) ставит active=true, при размонтировании — false. useLayoutEffect чтобы не было мигания до первой отрисовки. */
function SuspenseFallbackTrigger({
  setActive,
}: {
  setActive: (active: boolean) => void;
}) {
  useLayoutEffect(() => {
    setActive(true);
    return () => setActive(false);
  }, [setActive]);
  return null;
}

/** При смене маршрута прокручивает страницу в начало */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Lazy load pages
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const PromosPage = lazy(() => import("./pages/PromosPage/PromosPage"));
const NotFoundPage = lazy(() => import("./pages/404Page/404Page"));
const SochiPage = lazy(() => import("./pages/SochiPage/SochiPage"));
const PokerSchoolPage = lazy(
  () => import("./pages/PokerSchoolPage/PokerSchoolPage")
);
const AccessPage = lazy(() => import("./pages/AccessPage/AccessPage"));
const PreviewPage = lazy(() => import("./pages/PreviewPage/PreviewPage"));

/** Проверка: страна пользователя в списке запрещённых (по коду или по имени). */
function isCountryForbidden(
  userCode: string | undefined,
  userName: string | undefined,
  forbiddenList: Array<{ name?: string; code?: string }> | undefined
): boolean {
  if (!Array.isArray(forbiddenList) || forbiddenList.length === 0) return false;
  const code = (userCode ?? "").trim().toUpperCase();
  const name = (userName ?? "").trim().toLowerCase();
  return forbiddenList.some((c) => {
    const fc = (c?.code ?? "").trim().toUpperCase();
    const fn = (c?.name ?? "").trim().toLowerCase();
    return (code && fc && code === fc) || (name && fn && name === fn);
  });
}

/** Роуты + блокировка по стране. Один глобальный Loader смонтирован всегда и только скрывается/показывается — анимация идёт плавно до конца загрузки. */
function AppRoutes() {
  const yourLang = useSelector(
    (state: RootState) => state.registration.yourLang
  );
  const countryCodeReg = useSelector(
    (state: RootState) => state.registration.countryCodeReg ?? ""
  );
  const countryReg = useSelector(
    (state: RootState) => state.registration.countryReg ?? ""
  );
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(false);
  const [suspenseLoading, setSuspenseLoading] = useState(false);
  const isHeadlessPreviewRequest = useMemo(() => {
    if (pathname === "/preview") return true;
    const params = new URLSearchParams(search);
    return Boolean(params.get("content_type") && params.get("token"));
  }, [pathname, search]);
  const {
    data: baseApiData,
    isLoading,
    isFetching,
  } = useGetBasePageQuery(yourLang, { skip: isHeadlessPreviewRequest });

  const userCode = baseApiData?.user_country?.code ?? countryCodeReg;
  const userName = baseApiData?.user_country?.name ?? countryReg;

  const isForbidden = useMemo(
    () =>
      isCountryForbidden(
        userCode,
        userName,
        baseApiData?.access_forbidden_countries
      ),
    [userCode, userName, baseApiData?.access_forbidden_countries]
  );

  useEffect(() => {
    if (!baseApiData) return;
    if (isForbidden && pathname !== "/access" && isAppRoutePath(pathname)) {
      navigate("/access", { replace: true });
    }
  }, [baseApiData, isForbidden, pathname, navigate]);

  const isLoadingBase = !baseApiData && (isLoading || isFetching);
  const showLoader =
    isLoadingBase ||
    (baseApiData &&
      isForbidden &&
      pathname !== "/access" &&
      isAppRoutePath(pathname)) ||
    suspenseLoading ||
    pageLoading;

  const loadingContextValue = useMemo(() => ({ setPageLoading }), []);

  if (isHeadlessPreviewRequest) {
    return (
      <GlobalLoadingContext.Provider value={loadingContextValue}>
        <Loader visible={suspenseLoading || pageLoading} size={350} />
        <Suspense
          fallback={<SuspenseFallbackTrigger setActive={setSuspenseLoading} />}
        >
          <PreviewPage />
        </Suspense>
      </GlobalLoadingContext.Provider>
    );
  }

  return (
    <GlobalLoadingContext.Provider value={loadingContextValue}>
      <Loader visible={showLoader} size={350} />
      {!isLoadingBase && (
        <Suspense
          fallback={<SuspenseFallbackTrigger setActive={setSuspenseLoading} />}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/promos" element={<PromosPage />} />
            <Route path="/ppsochi" element={<SochiPage />} />
            <Route path="/poker" element={<PokerSchoolPage />} />
            <Route path="/access" element={<AccessPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      )}
    </GlobalLoadingContext.Provider>
  );
}

/** Подставляет язык из cookie только после согласия пользователя с cookies. */
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

function App() {
  const dispatch = useDispatch();
  const qrfModalIsOpen = useSelector(
    (state: RootState) => state.registration.qrfModalIsOpen
  );
  const closeQRFModal = () => dispatch(setQRFModalIsOpen(false));

  return (
    <>
      <GlobalStyles />
      <I18nextProvider i18n={i18n}>
        <HelmetProvider>
          <Router>
            <PageReadyProvider>
              <SyncLangFromCookie />
              <ScrollToTop />
              <AppRoutes />
              <CookieBanner />
              <QRFModal isOpen={qrfModalIsOpen} onClose={closeQRFModal}>
                <QRForm />
              </QRFModal>
              <SendPasswordModal />
            </PageReadyProvider>
          </Router>
        </HelmetProvider>
      </I18nextProvider>
    </>
  );
}

export default App;
