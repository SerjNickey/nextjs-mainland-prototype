import { useDispatch } from "react-redux";
import {
  setQRFModalIsOpen,
  setSendPasswordModalIsOpen,
} from "../../store/registrationSlice";
import * as S from "./SendPassword.styled";
import { LazyImage } from "../../components/LazyImage/LazyImage";

import logo from "../../assets/images/SendPassword/logo_2x.webp";

interface ISendPassword {}

const SendPassword: React.FC<ISendPassword> = () => {
  const dispatch = useDispatch();

  const handleSendPasswordForm = () => {
    dispatch(setQRFModalIsOpen(false));
    dispatch(setSendPasswordModalIsOpen(true));
  };

  return (
    <>
      <S.FirstWrapper>
        <S.Wrapper>
          <LazyImage src={logo} alt="icon" />
          <p>Была учетная запись PokerStars Sochi?</p>
        </S.Wrapper>
        <S.StyledBtn type="button" isRed onClick={handleSendPasswordForm}>
          Восстановить
        </S.StyledBtn>
      </S.FirstWrapper>
      <S.MiddlePoint>
        <S.MiddleLine />
        <S.MiddleText>или пройти регистрацию</S.MiddleText>
        <S.MiddleLine isReversed />
      </S.MiddlePoint>
    </>
  );
};

export default SendPassword;
