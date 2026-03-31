import { useNavigate } from "react-router-dom";
import * as S from "./Header.styled";

interface HeaderProps {
  logoSrc: string;
}

const Header = ({ logoSrc }: HeaderProps) => {
  const navigate = useNavigate();

  const handleHeaderClick = () => {
    navigate("/");
  };

  return (
    <S.Wrapper onClick={handleHeaderClick}>
      <S.Container logoSrc={logoSrc}></S.Container>
    </S.Wrapper>
  );
};

export default Header;
