import { useRouter } from "next/navigation";
import * as S from "./Header.styled";

interface HeaderProps {
  logoSrc: string;
}

const Header = ({ logoSrc }: HeaderProps) => {
  const router = useRouter();

  const handleHeaderClick = () => {
    router.push("/");
  };

  return (
    <S.Wrapper onClick={handleHeaderClick}>
      <S.Container logoSrc={logoSrc}></S.Container>
    </S.Wrapper>
  );
};

export default Header;
