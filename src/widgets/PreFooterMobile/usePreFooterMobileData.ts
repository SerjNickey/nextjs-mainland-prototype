import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  cleanIncludedCountries,
  cleanExcludedCountries,
  isVisibleForCountry,
} from "../../shared/countryVisibility";
import { useGetBasePageQuery } from "../../store/basePageApi";
import type { RootState } from "../../store";
import type {
  FooterBlock,
  FooterCommunityItem,
  LegalImageItem,
  RunningLineItem,
} from "./types";
import { buildRunningLineDisplay } from "./utils";

export function usePreFooterMobileData() {
  const { yourLang } = useSelector((s: RootState) => s.registration);
  const countryCodeReg = useSelector(
    (s: RootState) => s.registration?.countryCodeReg ?? ""
  );
  const countryNameReg = useSelector(
    (s: RootState) => s.registration?.countryReg ?? ""
  );
  const { data } = useGetBasePageQuery(yourLang);

  const countryCode =
    (data as { user_country?: { code?: string } } | undefined)?.user_country
      ?.code ?? countryCodeReg;
  const countryName =
    (data as { user_country?: { name?: string } } | undefined)?.user_country
      ?.name ?? countryNameReg;

  const footerBlocks: FooterBlock[] = Array.isArray(
    (data as { footer_blocks?: unknown })?.footer_blocks
  )
    ? ((data as { footer_blocks?: FooterBlock[] }).footer_blocks ?? [])
    : [];

  const contactTitle = (data as { footer_contact_title?: string })
    ?.footer_contact_title;
  const contactLink = (data as { footer_contact_link?: string })
    ?.footer_contact_link;
  const socialTitle = (data as { footer_social_media_title?: string })
    ?.footer_social_media_title;

  const communities =
    (data as { communities?: FooterCommunityItem[] } | undefined)
      ?.communities ?? [];

  const visibleFooterCommunities = useMemo(
    () =>
      communities.filter((item) => {
        if (item.active === false) return false;
        if (
          !isVisibleForCountry(
            cleanIncludedCountries(item.included_countries),
            cleanExcludedCountries(item.excluded_countries),
            countryCode,
            countryName
          )
        )
          return false;
        return Boolean(item.name?.trim()) && Boolean(item.link?.trim());
      }),
    [communities, countryCode, countryName]
  );

  const runningLine =
    (data as { footer_running_line?: RunningLineItem[] })?.footer_running_line ??
    [];
  const runningLineDisplay = useMemo(
    () => buildRunningLineDisplay(runningLine),
    [runningLine]
  );

  const legalText = (data as { footer_legal_text?: string })?.footer_legal_text;
  const legalImages =
    (data as { footer_legal_images?: LegalImageItem[] })?.footer_legal_images ??
    [];
  const filteredLegalImages = legalImages
    .filter(
      (item) =>
        item.type === "legal_image" &&
        isVisibleForCountry(
          cleanIncludedCountries(item.value?.included_countries),
          cleanExcludedCountries(item.value?.excluded_countries),
          countryCode,
          countryName
        )
    )
    .slice(0, 5);

  return {
    footerBlocks,
    contactTitle,
    contactLink,
    socialTitle,
    visibleFooterCommunities,
    runningLineDisplay,
    legalText,
    filteredLegalImages,
  };
}
