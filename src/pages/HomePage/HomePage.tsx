import HeaderMobile from "../../widgets/HeaderMobile/HeaderMobile";
import StickyHeader from "../../widgets/StickyHeader/StickyHeader";
import SEO from "../../components/SEO/SEO";
import PreFooter from "../../widgets/NPreFooter/NPreFooter";
import PreFooterMobile from "../../widgets/PreFooterMobile/PreFooterMobile";
import Footer from "../../widgets/Footer/Footer";
import RegistrationFormBlock from "../../components/RegistrationFormBlock";
import SendPasswordBlock from "../../widgets/SendPasswordModal/SendPasswordBlock";
import Promos from "./components/Promos/Promos";
import BannerSlider from "./components/BannerSlider/BannerSlider";
import PokerIsBack from "./components/PokerIsBack/PokerIsBack";
// import BannerSliderMobile from "./components/BannerSliderMobile";
import Steps from "./components/Steps/Steps";
import StepsMobile from "./components/StepsMobile/StepsMobile";
import InterfaceDemonstration from "./components/InterfaceDemonstration/InterfaceDemonstration";
import InterfaceDemonstrationMobile from "./components/InterfaceDemonstrationMobile/InterfaceDemonstrationMobile";
import BenefitCards from "./components/BenefitCards/BenefitCards";
import BenefitCardsMobile from "./components/BenefitCardsMobile/BenefitCardsMobile";
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
  const countryCodeReg = useSelector(
    (s: RootState) => s.registration?.countryCodeReg ?? ""
  );
  const countryNameReg = useSelector(
    (s: RootState) => s.registration?.countryReg ?? ""
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
  const pokerIsBackSrc = pageData?.mobile_banner?.file || "";
  const countryCode = baseData?.user_country?.code ?? countryCodeReg;
  const countryName = baseData?.user_country?.name ?? countryNameReg;

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

      <S.MobileWrapper>
        <HeaderMobile logoSrc={logoSrc} />
        <PokerIsBack backSrc={pokerIsBackSrc} />
        <Promos data={pageData} dotsActive={true} />
        <StepsMobile data={pageData} />
        <InterfaceDemonstrationMobile data={pageData} />
        <BenefitCardsMobile data={pageData} />
        <Community data={pageData} userCountry={baseData?.user_country} />
        <S.LocalWrapper><SEO lang={yourLang} data={pageData} /></S.LocalWrapper>
        <PreFooterMobile />
      </S.MobileWrapper>

      <StickyHeader logoSrc={logoSrc} />
      <S.Wrapper>
        <S.BannerSection>
          <S.BannerSliderDesktopOnly>
            <BannerSlider
              data={pageData}
              countryCode={countryCode}
              countryName={countryName}
              dotsActive={true}
            />
          </S.BannerSliderDesktopOnly>

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
        <Community data={pageData} userCountry={baseData?.user_country} />
        <SEO lang={yourLang} data={pageData} />
        <PreFooter />
      </S.Wrapper>
      <Footer />
    </S.PageLayout>
  );
};

export default HomePage;
