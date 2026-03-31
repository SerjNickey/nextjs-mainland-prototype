"use client";

import { useEffect, useMemo, useState, type ComponentType } from "react";
import { useSearchParams } from "next/navigation";
import Loader from "../../components/Loader/Loader";
import HomePage from "../HomePage/HomePage";
import PromosPage from "../PromosPage/PromosPage";
import SochiPage from "../SochiPage/SochiPage";
import PokerSchoolPage from "../PokerSchoolPage/PokerSchoolPage";
import NotFoundPage from "../404Page/404Page";

type PreviewState = {
  loading: boolean;
  error?: string;
  data?: any;
};

const pageMap: Record<
  string,
  ComponentType<{ previewData?: any }>
> = {
  "base.basepage": HomePage,
  "home.homepage": HomePage,
  "promo.promopage": PromosPage,
  "sochi.sochipage": SochiPage,
  "school.pokerschoolpage": PokerSchoolPage,
};

function parseQuery(search: string) {
  const params = new URLSearchParams(search);
  const contentType = params.get("content_type") || "";
  const token = params.get("token") || "";
  return { contentType, token };
}

function buildPreviewUrl(contentType: string, token: string): string {
  const params = new URLSearchParams({
    content_type: contentType,
    token,
    format: "json",
    _ts: String(Date.now()),
  });
  return `/api/v2/page_preview/1/?${params.toString()}`;
}

const PreviewPage = () => {
  const searchParams = useSearchParams();
  const { contentType, token } = useMemo(() => {
    const s = searchParams.toString();
    return parseQuery(s ? `?${s}` : "");
  }, [searchParams]);

  const [state, setState] = useState<PreviewState>({
    loading: true,
  });

  useEffect(() => {
    if (!contentType || !token) {
      setState({
        loading: false,
        error: "Missing content_type or token.",
      });
      return;
    }

    let cancelled = false;
    const url = buildPreviewUrl(contentType, token);

    setState({ loading: true });

    fetch(url, { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `Preview request failed (${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setState({ loading: false, data });
      })
      .catch((err) => {
        if (cancelled) return;
        setState({
          loading: false,
          error: err?.message || "Failed to load preview.",
        });
      });

    return () => {
      cancelled = true;
    };
  }, [contentType, token]);

  if (state.loading) {
    return <Loader text="Loading..." />;
  }

  if (state.error) {
    return <div>{state.error}</div>;
  }

  const PageComponent = pageMap[contentType.toLowerCase()];
  if (!PageComponent) {
    return <NotFoundPage />;
  }

  return <PageComponent previewData={state.data} />;
};

export default PreviewPage;
