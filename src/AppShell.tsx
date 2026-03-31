"use client";

import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { RootState } from "./store";
import Loader from "./components/Loader/Loader";
import { useGetBasePageQuery } from "./store/basePageApi";
import { GlobalLoadingContext } from "./contexts/GlobalLoadingContext";
import { isAppRoutePath } from "./preloadRoutes";

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

function ScrollToTop() {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

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

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const yourLang = useSelector(
    (state: RootState) => state.registration.yourLang
  );
  const countryCodeReg = useSelector(
    (state: RootState) => state.registration.countryCodeReg ?? ""
  );
  const countryReg = useSelector(
    (state: RootState) => state.registration.countryReg ?? ""
  );

  const [pageLoading, setPageLoading] = useState(false);
  const [suspenseLoading, setSuspenseLoading] = useState(false);

  const isHeadlessPreviewRequest = useMemo(() => {
    if (pathname === "/preview") return true;
    return Boolean(
      searchParams.get("content_type") && searchParams.get("token")
    );
  }, [pathname, searchParams]);

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
      router.replace("/access");
    }
  }, [baseApiData, isForbidden, pathname, router]);

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
        <ScrollToTop />
        <Loader visible={suspenseLoading || pageLoading} size={350} />
        <Suspense
          fallback={<SuspenseFallbackTrigger setActive={setSuspenseLoading} />}
        >
          {children}
        </Suspense>
      </GlobalLoadingContext.Provider>
    );
  }

  return (
    <GlobalLoadingContext.Provider value={loadingContextValue}>
      <ScrollToTop />
      <Loader visible={showLoader} size={350} />
      {!isLoadingBase && (
        <Suspense
          fallback={<SuspenseFallbackTrigger setActive={setSuspenseLoading} />}
        >
          {children}
        </Suspense>
      )}
    </GlobalLoadingContext.Provider>
  );
}
