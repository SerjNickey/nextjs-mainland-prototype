import StickyHeader from "../../widgets/StickyHeader/StickyHeader";
import SEO from "../../components/SEO/SEO";
import PreFooter from "../../widgets/NPreFooter/NPreFooter";
import Footer from "../../widgets/Footer/Footer";
import RegistrationFormBlock from "../../components/RegistrationFormBlock";
import SendPasswordBlock from "../../widgets/SendPasswordModal/SendPasswordBlock";
import Promos from "./components/Promos/Promos";
import BannerSlider from "./components/BannerSlider/BannerSlider";
import Steps from "./components/Steps/Steps";
import InterfaceDemonstration from "./components/InterfaceDemonstration/InterfaceDemonstration";
import BenefitCards from "./components/BenefitCards/BenefitCards";
import Community from "./components/Community/Community";

import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetBasePageQuery } from "../../store/basePageApi";
import { useGetHomePageQuery } from "../../store/homePageApi";
import type { RootState } from "../../store";
import { GlobalLoadingContext } from "../../contexts/GlobalLoadingContext";
import { RouteReadyEffect } from "../../contexts/PageReadyContext";
import * as S from "./HomePage.styled";

type HomePageProps = {
  previewData?: any;
};

const HomePage = ({ previewData }: HomePageProps) => {
  const setPageLoading = useContext(GlobalLoadingContext)?.setPageLoading;
  const isPreviewMode = previewData != null;
  const yourLang = useSelector(
    (s: RootState) => s.registration?.yourLang ?? "en"
  );
  const sendPasswordModalIsOpen = useSelector(
    (s: RootState) => s.registration?.sendPasswordModalIsOpen ?? false
  );
  const {
    data: baseData,
    isLoading: isLoadingBase,
    isFetching: isFetchingBase,
  } = useGetBasePageQuery(yourLang);
  const {
    data,
    isLoading: isLoadingHome,
    isFetching: isFetchingHome,
  } = useGetHomePageQuery(yourLang, { skip: isPreviewMode });
  const pageData = previewData ?? data;
  const logoSrc = baseData?.logo?.file || "";

  const isLoading =
    !isPreviewMode &&
    (isLoadingBase || isLoadingHome || isFetchingBase || isFetchingHome);

  useEffect(() => {
    setPageLoading?.(isLoading);
    return () => setPageLoading?.(false);
  }, [isLoading, setPageLoading]);

  if (isLoading || !pageData) return null;

  return (
    <S.PageLayout>
      <RouteReadyEffect />
      <StickyHeader logoSrc={logoSrc} />
      <S.Wrapper>
        <S.BannerSection>
          <BannerSlider data={pageData} dotsActive={true} />
          <S.BannerFormOverlay>
            <S.BannerFormOverlayInner>
              <S.BannerFormCard>
                {sendPasswordModalIsOpen ? (
                  <SendPasswordBlock />
                ) : (
                  <RegistrationFormBlock />
                )}
              </S.BannerFormCard>
            </S.BannerFormOverlayInner>
          </S.BannerFormOverlay>
        </S.BannerSection>
        <Promos data={pageData} dotsActive={true} />
        <Steps data={pageData} />
        <InterfaceDemonstration data={pageData} />
        <BenefitCards data={pageData} />
        <Community data={pageData} />
        <SEO lang={yourLang} data={pageData} />
        <PreFooter />
      </S.Wrapper>
      <Footer />
    </S.PageLayout>
  );
};

export default HomePage;
