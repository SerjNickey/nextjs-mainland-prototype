"use client";

import { useEffect, useMemo, useContext } from "react";
import { useSelector } from "react-redux";
import StickyHeader from "../../widgets/StickyHeader/StickyHeader";
import PreFooter from "../../widgets/NPreFooter/NPreFooter";
import Footer from "../../widgets/Footer/Footer";
import SochiHero from "./components/SochiHero/SochiHero";
import SochiTimeline from "./components/SochiTimeline/SochiTimeline";
import SochiFaq from "./components/SochiFaq/SochiFaq";
import type { TimelineItem } from "./components/SochiTimeline/SochiTimeline";
import type { FaqItem } from "./components/SochiFaq/SochiFaq";
import type {
  SochiPageData,
  SochiPageTimelineBlock,
  SochiPageQuestionBlock,
} from "../../store/sochiPageApi";
import { useGetBasePageQuery } from "../../store/basePageApi";
import { useGetSochiPageQuery } from "../../store/sochiPageApi";
import type { RootState } from "../../store";
import { GlobalLoadingContext } from "../../contexts/GlobalLoadingContext";
import * as Styled from "./SochiPage.styled";

type SochiPageProps = {
  previewData?: any;
};

const SochiPage = ({ previewData }: SochiPageProps) => {
  const setPageLoading = useContext(GlobalLoadingContext)?.setPageLoading;
  const isPreviewMode = previewData != null;
  const yourLang = useSelector(
    (s: RootState) => s.registration?.yourLang ?? "en"
  );
  const {
    data: baseData,
    isLoading: isLoadingBase,
    isFetching: isFetchingBase,
  } = useGetBasePageQuery(yourLang);
  const {
    data: sochiData,
    isLoading: isLoadingSochi,
    isFetching: isFetchingSochi,
  } = useGetSochiPageQuery(yourLang, { skip: isPreviewMode });
  const pageData = (previewData ?? sochiData) as SochiPageData;
  const logoSrc = baseData?.logo?.file || "";

  const timelineItems = useMemo((): TimelineItem[] | undefined => {
    const raw = pageData?.timeline;
    if (!raw?.length) return undefined;
    return raw
      .filter((b: SochiPageTimelineBlock) => b?.value?.title != null)
      .map((b: SochiPageTimelineBlock, i: number) => {
        const v = b.value;
        return {
          date: v.date ?? "",
          title: v.title ?? "",
          description: v.description ?? "",
          side: i % 2 === 0 ? ("right" as const) : ("left" as const),
        };
      });
  }, [pageData?.timeline]);

  const faqItems = useMemo((): FaqItem[] | undefined => {
    const raw = pageData?.questions;
    if (!raw?.length) return undefined;
    return raw
      .filter((b: SochiPageQuestionBlock) => b?.value?.question != null)
      .map((b: SochiPageQuestionBlock, i: number) => ({
        id: b.id ?? `faq-${i}`,
        question: b.value.question ?? "",
        answer: b.value.answer ?? "",
      }));
  }, [pageData?.questions]);

  const isLoading =
    !isPreviewMode &&
    (isLoadingBase || isLoadingSochi || isFetchingBase || isFetchingSochi);

  useEffect(() => {
    setPageLoading?.(isLoading);
    return () => setPageLoading?.(false);
  }, [isLoading, setPageLoading]);

  if (isLoading || !pageData) return null;

  return (
    <Styled.Wrapper>
      <StickyHeader logoSrc={logoSrc} />
      <SochiHero
        title={pageData?.info_title}
        intro={(() => {
          const sub = pageData?.info_subtitle;
          return sub != null && sub !== ""
            ? sub.split(/\r?\n/).filter(Boolean)
            : undefined;
        })()}
      />
      <SochiTimeline items={timelineItems} />
      <SochiFaq items={faqItems} />
      <PreFooter />
      <Footer />
    </Styled.Wrapper>
  );
};

export default SochiPage;
