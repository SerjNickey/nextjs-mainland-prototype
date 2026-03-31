/**
 * Access Page — страница доступа.
 * Использует только данные из basePageApi (store создавать не нужно).
 */
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import StickyHeader from "../../widgets/StickyHeader/StickyHeader";
import { useGetBasePageQuery } from "../../store/basePageApi";
import type { RootState } from "../../store";
import { GlobalLoadingContext } from "../../contexts/GlobalLoadingContext";
import * as S from "./AccessPage.styled";

const AccessPage = () => {
  const setPageLoading = useContext(GlobalLoadingContext)?.setPageLoading;
  const yourLang = useSelector(
    (s: RootState) => s.registration?.yourLang ?? "en"
  );
  const {
    data: baseData,
    isLoading: isLoadingBase,
    isFetching: isFetchingBase,
  } = useGetBasePageQuery(yourLang);
  const logoSrc = baseData?.logo?.file ?? "";

  const isLoading = isLoadingBase || isFetchingBase;

  useEffect(() => {
    setPageLoading?.(isLoading);
    return () => setPageLoading?.(false);
  }, [isLoading, setPageLoading]);

  if (isLoading) return null;

  const accessTitle = baseData?.access_title ?? "";
  const accessSubtitle = baseData?.access_subtitle ?? "";
  const accessText = baseData?.access_text ?? "";
  const accessHelpTitle = baseData?.access_help_title ?? "";
  const accessHelpSubtitle = baseData?.access_help_subtitle ?? "";
  const accessHelpEmail = baseData?.access_help_email ?? "";

  return (
    <S.PageLayout>
      <StickyHeader logoSrc={logoSrc} showGrandMenu={false} />
      <S.Wrapper>
        <S.Main>
          {accessTitle && <S.AccessTitle>{accessTitle}</S.AccessTitle>}
          {accessSubtitle && (
            <S.AccessSubtitle>{accessSubtitle}</S.AccessSubtitle>
          )}
          {accessText && (
            <S.AccessText dangerouslySetInnerHTML={{ __html: accessText }} />
          )}
          {(accessHelpTitle || accessHelpSubtitle || accessHelpEmail) && (
            <S.AccessHelp>
              {accessHelpTitle && (
                <S.AccessHelpTitle>{accessHelpTitle}</S.AccessHelpTitle>
              )}
              {accessHelpSubtitle && (
                <S.AccessHelpSubtitle>
                  {accessHelpSubtitle}
                </S.AccessHelpSubtitle>
              )}
              {accessHelpEmail && (
                <S.AccessHelpEmail href={`mailto:${accessHelpEmail}`}>
                  {accessHelpEmail}
                </S.AccessHelpEmail>
              )}
            </S.AccessHelp>
          )}
        </S.Main>
      </S.Wrapper>
    </S.PageLayout>
  );
};

export default AccessPage;
