import { usePathname } from "next/navigation";
import * as S from "./PreFooterMobile.styled";
import ContactBlock from "./components/ContactBlock/ContactBlock";
import FooterBlocksAccordion from "./components/FooterBlocksAccordion/FooterBlocksAccordion";
import LegalBlock from "./components/LegalBlock/LegalBlock";
import RunningLineBlock from "./components/RunningLineBlock/RunningLineBlock";
import SocialBlock from "./components/SocialBlock/SocialBlock";
import { usePreFooterMobileData } from "./usePreFooterMobileData";

const PreFooterMobile = () => {
  const pathname = usePathname();
  const {
    footerBlocks,
    contactTitle,
    contactLink,
    socialTitle,
    visibleFooterCommunities,
    runningLineDisplay,
    legalText,
    filteredLegalImages,
  } = usePreFooterMobileData();

  return (
    <S.MobileOnly>
      <S.Wrapper>
        <S.InnerWrapper>
          <S.Top>
            <ContactBlock title={contactTitle} link={contactLink} />
            <FooterBlocksAccordion blocks={footerBlocks} pathname={pathname} />
          </S.Top>

          <RunningLineBlock items={runningLineDisplay} />

          <S.Bottom>
            <SocialBlock title={socialTitle} items={visibleFooterCommunities} />
            <LegalBlock legalText={legalText} legalImages={filteredLegalImages} />
          </S.Bottom>
        </S.InnerWrapper>
      </S.Wrapper>
    </S.MobileOnly>
  );
};

export default PreFooterMobile;
