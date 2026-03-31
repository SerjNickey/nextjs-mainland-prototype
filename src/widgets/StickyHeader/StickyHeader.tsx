/**
 * Виджет шапки: sticky Header (скрывается при скролле вниз) + GrandMenu (всегда видим).
 * Переиспользуется на HomePage, PromosPage, PokerSchoolPage, SochiPage, 404Page, AccessPage (без меню).
 */
import Header from "../Header/Header";
import GrandMenu from "../GrandMenu/GrandMenu";
import { useHeaderScrollVisibility } from "../../hooks/useHeaderScrollVisibility";
import type { UseHeaderScrollVisibilityOptions } from "../../hooks/useHeaderScrollVisibility";
import * as S from "./StickyHeader.styled";

export type StickyHeaderProps = {
  /** URL логотипа (из basePageApi) */
  logoSrc: string;
  /** Показывать GrandMenu под хедером (по умолчанию true). На AccessPage можно false. */
  showGrandMenu?: boolean;
  /** Настройки скролла: пороги и зона сверху (опционально). */
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

  return (
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
  );
};

export default StickyHeader;
