import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useGetBasePageQuery } from "../store/basePageApi";

type PageReadyContextValue = {
  isPageReady: boolean;
  setRouteReady: () => void;
};

const PageReadyContext = createContext<PageReadyContextValue | null>(null);

export function PageReadyProvider({ children }: { children: ReactNode }) {
  const yourLang = useSelector(
    (s: RootState) => s.registration?.yourLang ?? "en"
  );
  const { data, isLoading, isFetching } = useGetBasePageQuery(yourLang);
  const { pathname } = useLocation();
  const [isRouteReady, setIsRouteReady] = useState(false);

  const isBaseLoading = !data || isLoading || isFetching;

  useEffect(() => {
    setIsRouteReady(false);
  }, [pathname]);

  const setRouteReady = useCallback(() => setIsRouteReady(true), []);

  const isPageReady = !isBaseLoading && isRouteReady;

  return (
    <PageReadyContext.Provider value={{ isPageReady, setRouteReady }}>
      {children}
    </PageReadyContext.Provider>
  );
}

export function usePageReady() {
  const ctx = useContext(PageReadyContext);
  return ctx?.isPageReady ?? false;
}

export function useSetRouteReady() {
  const ctx = useContext(PageReadyContext);
  return ctx?.setRouteReady ?? (() => {});
}

/** Вызвать внутри маршрута — когда компонент смонтирован, страница считается загруженной. */
export function RouteReadyMarker({ children }: { children: ReactNode }) {
  const setRouteReady = useSetRouteReady();
  useEffect(() => {
    setRouteReady();
  }, [setRouteReady]);
  return <>{children}</>;
}

/** Вставить в начало страницы (lazy). Когда страница смонтирована — вызывается setRouteReady. */
export function RouteReadyEffect() {
  const setRouteReady = useSetRouteReady();
  useEffect(() => {
    setRouteReady();
  }, [setRouteReady]);
  return null;
}
