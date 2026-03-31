import { createContext } from "react";

/** Контекст для сообщения о загрузке страницы. Один глобальный Loader в App показывается, пока хотя бы один источник держит loading. */
export type GlobalLoadingContextValue = {
  setPageLoading: (loading: boolean) => void;
};

export const GlobalLoadingContext =
  createContext<GlobalLoadingContextValue | null>(null);
