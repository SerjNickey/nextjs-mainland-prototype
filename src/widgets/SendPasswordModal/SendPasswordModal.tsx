import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { useSendEmailMutation } from "../../store/registrationApi";
import {
  setEmailForPassword,
  setSendPasswordModalIsOpen,
  setQRFModalIsOpen,
  setSendPasswordPage,
} from "../../store/registrationSlice";
import * as S from "./SendPasswordModal.styled";
import SimpleInput from "../../components/SimpleInput/SimpleInput";
import LastPage from "./components/LastPage";

const SendPasswordModal = () => {
  const dispatch = useDispatch();

  const {
    sendPasswordModalIsOpen,
    sendPasswordPage,
    emailForPassword,
    formToken,
  } = useSelector((state: RootState) => state.registration);
  const [sendEmailForPassword] = useSendEmailMutation();

  // Блокировка прокрутки body при открытом модальном окне
  useEffect(() => {
    if (sendPasswordModalIsOpen) {
      // Сохраняем текущее состояние прокрутки
      const scrollY = window.scrollY;
      const body = document.body;

      // Блокируем прокрутку
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.width = "100%";

      return () => {
        // Восстанавливаем прокрутку
        body.style.overflow = "";
        body.style.position = "";
        body.style.top = "";
        body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [sendPasswordModalIsOpen]);

  const onClose = () => {
    dispatch(setSendPasswordModalIsOpen(false));
    dispatch(setEmailForPassword(""));
    dispatch(setSendPasswordPage("First"));
  };

  const handleEmail = (e: any) => {
    dispatch(setEmailForPassword(e));
  };

  const handleBack = () => {
    dispatch(setSendPasswordModalIsOpen(false));
    dispatch(setEmailForPassword(""));
    dispatch(setQRFModalIsOpen(true));
  };
  const handleSetEmailForPassword = () => {
    dispatch(setSendPasswordPage("Last"));
    sendEmailForPassword({ formToken, value: emailForPassword, type: "email" });
  };

  // Закрытие по клавише Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (sendPasswordModalIsOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [sendPasswordModalIsOpen, onClose]);

  if (!sendPasswordModalIsOpen) return null;

  return (
    <S.ModalPositioner>
      <S.AnimatedModalContainer>
        {sendPasswordPage === "First" && (
          <S.ModalHeader isVisible>
            <S.TitleContainer>Сброс пароля</S.TitleContainer>
            <S.CloseButton onClick={onClose} />
          </S.ModalHeader>
        )}
        {sendPasswordPage === "First" && (
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
              <S.StyledBtn onClick={handleBack}>Назад</S.StyledBtn>
              <S.StyledBtn
                isRed
                onClick={handleSetEmailForPassword}
                disabled={emailForPassword === ""}
              >
                Подтвердить
              </S.StyledBtn>
            </S.ButtonsWrapper>
          </S.ModalContent>
        )}
        {sendPasswordPage === "Last" && (
          <S.ModalContent>
            <LastPage />
          </S.ModalContent>
        )}
      </S.AnimatedModalContainer>
    </S.ModalPositioner>
  );
};

export default SendPasswordModal;
