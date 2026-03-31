/**
 * Шапка: Header + GrandMenu (десктоп). На max540 — только GrandMenuMobile (монтируется по matchMedia).
 */
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import GrandMenu from "../GrandMenu/GrandMenu";
import GrandMenuMobile from "../GrandMenuMobile/GrandMenuMobile";
import { useHeaderScrollVisibility } from "../../hooks/useHeaderScrollVisibility";
import type { UseHeaderScrollVisibilityOptions } from "../../hooks/useHeaderScrollVisibility";
import type { RootState } from "../../store";
import { breakpoints } from "../../styles/breakpoints";
import * as S from "./StickyHeader.styled";

const MOBILE_GRAND_MENU_MQ = `(max-width: ${breakpoints.max540})`;

export type StickyHeaderProps = {
  logoSrc: string;
  showGrandMenu?: boolean;
  scrollOptions?: UseHeaderScrollVisibilityOptions;
};

const StickyHeader = ({
  logoSrc,
  showGrandMenu = true,
  scrollOptions,
}: StickyHeaderProps) => {
  const headerVisible = useHeaderScrollVisibility({
    thresholdHide: 60,
    thresholdShow: 24,
    topZone: 80,
    ...scrollOptions,
  });

  const [isMobileGrandMenuViewport, setIsMobileGrandMenuViewport] =
    useState(false);
  const [isScrollingNow, setIsScrollingNow] = useState(false);
  const qrfModalIsOpen = useSelector(
    (state: RootState) => state.registration.qrfModalIsOpen
  );

  useLayoutEffect(() => {
    const mq = window.matchMedia(MOBILE_GRAND_MENU_MQ);
    const sync = () => setIsMobileGrandMenuViewport(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!isMobileGrandMenuViewport) return;
    let scrollStopTimer: ReturnType<typeof setTimeout> | null = null;

    const onScroll = () => {
      setIsScrollingNow(true);
      if (scrollStopTimer) clearTimeout(scrollStopTimer);
      scrollStopTimer = setTimeout(() => {
        setIsScrollingNow(false);
      }, 500);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollStopTimer) clearTimeout(scrollStopTimer);
    };
  }, [isMobileGrandMenuViewport]);

  return (
    <>
      <S.StickyHeaderWrap>
        <S.HeaderHideWrap>
          <S.HeaderSlide $hidden={!headerVisible}>
            <Header logoSrc={logoSrc} />
          </S.HeaderSlide>
        </S.HeaderHideWrap>
        {showGrandMenu && (
          <S.GrandMenuWrap $headerHidden={!headerVisible}>
            <GrandMenu />
          </S.GrandMenuWrap>
        )}
      </S.StickyHeaderWrap>
      {showGrandMenu && isMobileGrandMenuViewport && (
        <GrandMenuMobile hidden={isScrollingNow || qrfModalIsOpen} />
      )}
    </>
  );
};

export default StickyHeader;
