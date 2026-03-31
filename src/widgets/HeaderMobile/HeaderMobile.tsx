import { useRouter } from "next/navigation";
import { useHeaderScrollVisibility } from "../../hooks/useHeaderScrollVisibility";
import * as S from "./HeaderMobile.styled";

interface HeaderMobileProps {
  logoSrc: string;
}

const HeaderMobile = ({ logoSrc }: HeaderMobileProps) => {
  const router = useRouter();
  const headerVisible = useHeaderScrollVisibility({
    thresholdHide: 60,
    thresholdShow: 24,
    topZone: 80,
  });

  const handleHeaderClick = () => {
    router.push("/");
  };

  return (
    <S.Wrapper>
      <S.HeaderSlide $hidden={!headerVisible} onClick={handleHeaderClick}>
        <S.Container logoSrc={logoSrc} />
      </S.HeaderSlide>
    </S.Wrapper>
  );
};

export default HeaderMobile;
