import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { useSendEmailMutation } from "../../store/registrationApi";
import {
  setEmailForPassword,
  setSendPasswordModalIsOpen,
  setSendPasswordPage,
} from "../../store/registrationSlice";
import * as S from "./SendPasswordModal.styled";
import SimpleInput from "../../components/SimpleInput/SimpleInput";
import LastPage from "./components/LastPage";

/** Блок сброса пароля без модального окна — в потоке страницы */
const SendPasswordBlock = () => {
  const dispatch = useDispatch();
  const {
    sendPasswordModalIsOpen,
    sendPasswordPage,
    emailForPassword,
    formToken,
  } = useSelector((state: RootState) => state.registration);
  const [sendEmailForPassword] = useSendEmailMutation();

  const onClose = () => {
    dispatch(setSendPasswordModalIsOpen(false));
    dispatch(setEmailForPassword(""));
    dispatch(setSendPasswordPage("First"));
  };

  const handleEmail = (e: string) => {
    dispatch(setEmailForPassword(e));
  };

  const handleSetEmailForPassword = () => {
    dispatch(setSendPasswordPage("Last"));
    sendEmailForPassword({ formToken, value: emailForPassword, type: "email" });
  };

  if (!sendPasswordModalIsOpen) return null;

  return (
    <S.BlockWrapper>
      <S.BlockContainer>
        {sendPasswordPage === "First" && (
          <>
            <S.ModalHeader isVisible>
              <S.TitleContainer>Сброс пароля</S.TitleContainer>
              <S.CloseButton
                type="button"
                onClick={onClose}
                aria-label="Закрыть"
              />
            </S.ModalHeader>
            <S.ModalContent>
              <S.DescriptionText>
                Введите адрес электронной почты, привязанный к вашей учётной
                записи. На него будет отправлена ссылка для сброса пароля.
              </S.DescriptionText>
              <S.InputWrapper>
                <SimpleInput
                  inputType="email"
                  setValueInParent={handleEmail}
                  errorEnabled={false}
                  value={emailForPassword}
                  placeholderText="Электронная почта"
                />
                <span>Проверьте корректность адреса</span>
              </S.InputWrapper>
              <S.ButtonsWrapper>
                <S.StyledBtn type="button" onClick={onClose}>
                  Назад
                </S.StyledBtn>
                <S.StyledBtn
                  type="button"
                  isRed
                  onClick={handleSetEmailForPassword}
                  disabled={emailForPassword === ""}
                >
                  Подтвердить
                </S.StyledBtn>
              </S.ButtonsWrapper>
            </S.ModalContent>
          </>
        )}
        {sendPasswordPage === "Last" && (
          <S.ModalContent>
            <LastPage />
          </S.ModalContent>
        )}
      </S.BlockContainer>
    </S.BlockWrapper>
  );
};

export default SendPasswordBlock;
