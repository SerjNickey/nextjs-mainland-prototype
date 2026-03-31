import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store";
import { useSendEmailMutation } from "../../../../store/registrationApi";
import * as S from "./SendPassword.styled";
import * as M from "../../../../widgets/SendPasswordModal/SendPasswordModal.styled";
import { LazyImage } from "../../../../components/LazyImage/LazyImage";
import SimpleInput from "../../../../components/SimpleInput/SimpleInput";
import LastPage from "../../../../widgets/SendPasswordModal/components/LastPage";
import logo from "../../../../assets/images/SendPassword/logo_2x.webp";

export interface SendPasswordProps {
  /** Режим «форма сброса открыта» — родитель скрыл форму регистрации и показывает только этот блок */
  openInForm?: boolean;
  /** Вызов при клике «Восстановить» — родитель переключает на показ формы сброса */
  onOpenForm?: () => void;
  /** Вызов при закрытии формы сброса (Назад / крестик) — родитель снова показывает форму регистрации */
  onClose?: () => void;
}

/** Ссылка «Восстановить» в форме регистрации: открывает форму сброса по месту; родитель скрывает форму регистрации при openInForm. */
const SendPassword = ({
  openInForm = false,
  onOpenForm,
  onClose,
}: SendPasswordProps) => {
  const [page, setPage] = useState<"First" | "Last">("First");
  const [email, setEmail] = useState("");
  const formToken = useSelector((s: RootState) => s.registration.formToken);
  const [sendEmailForPassword] = useSendEmailMutation();

  const handleBack = () => {
    setPage("First");
    setEmail("");
    onClose?.();
  };

  const handleConfirm = () => {
    setPage("Last");
    sendEmailForPassword({ formToken, value: email, type: "email" });
  };

  if (openInForm) {
    return (
      <S.InlineFormWrapper>
        <S.InlineFormContainer>
          {page === "First" && (
            <>
              <M.ModalHeader isVisible $inline>
                <M.TitleContainer $inline>Сброс пароля</M.TitleContainer>
              </M.ModalHeader>
              <M.ModalContent>
                <M.DescriptionText>
                  Введите адрес электронной почты, привязанный к вашей учётной
                  записи. На него будет отправлена ссылка для сброса пароля.
                </M.DescriptionText>
                <M.InputWrapper>
                  <SimpleInput
                    inputType="email"
                    setValueInParent={setEmail}
                    errorEnabled={false}
                    value={email}
                    placeholderText="Электронная почта"
                  />
                  <span>Проверьте корректность адреса</span>
                </M.InputWrapper>
                <M.ButtonsWrapper>
                  <M.StyledBtn type="button" onClick={handleBack}>
                    Назад
                  </M.StyledBtn>
                  <M.StyledBtn
                    type="button"
                    isRed
                    onClick={handleConfirm}
                    disabled={email === ""}
                  >
                    Подтвердить
                  </M.StyledBtn>
                </M.ButtonsWrapper>
              </M.ModalContent>
            </>
          )}
          {page === "Last" && (
            <M.ModalContent>
              <LastPage />
            </M.ModalContent>
          )}
        </S.InlineFormContainer>
      </S.InlineFormWrapper>
    );
  }

  return (
    <>
      <S.FirstWrapper>
        <S.Wrapper>
          <LazyImage src={logo} alt="icon" />
          <p>Была учетная запись PokerStars Sochi?</p>
        </S.Wrapper>
        <S.StyledBtn type="button" isRed onClick={onOpenForm}>
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
