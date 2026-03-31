import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import {
  setCountryReg,
  setCountryCodeReg,
  setCurrentPage,
  setNicknameReg,
  setEmailReg,
  setPasswordReg,
  setValidationReg,
  setInvitationCodeReg,
  setAgreementReg,
  setSuccessArr,
  setErrorsArr,
  setFormToken,
  setIsVerificationCodeValid,
} from "../../store/registrationSlice";
import {
  useRegisterMutation,
  useGetFormTokenQuery,
  useResendVerificationCodeMutation,
  useCheckVerificationCodeMutation,
} from "../../store/registrationApi";
import type { ValidationState } from "../../components/PasswordInput/PasswordInput";
import SimpleInput from "../../components/SimpleInput/SimpleInput";
import { isUsernameFormatValid } from "../../components/SimpleInput/usernameValidation";
import { isEmailFormatValid } from "../../components/SimpleInput/emailValidation";
import {
  SimpleInputPopupRulesBlock,
  SimpleInputPopupWarningIcon,
  SimpleInputPopupRulesText,
} from "../../components/SimpleInput/SimpleInput.styled";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import CountrySelect from "../CountrySelect";
import InvitationCodeInput from "../InvitationCodeInput";
import CustomCheckbox from "../../components/CustomCheckbox/CustomCheckbox";
import SimpleButton from "../../components/SimpleButton/SimpleButton";
import VerificationCodeScreen from "../../widgets/QRForm/components/VerificationCodeScreen/VerificationCodeScreen";
import SuccessScreen from "../../widgets/QRForm/components/SuccessScreen/SuccessScreen";
import SendPassword from "./components/SendPassword";
import * as S from "./RegistrationFormBlock.styled";

const COPY = {
  ru: {
    username: "Имя пользователя",
    nicknamePopup:
      "Имя пользователя должно быть от 3 до 16 символов, только латинские буквы, цифры и спецсимволы; пробелы не допускаются.",
    email: "Электронная почта",
    password: "Пароль",
    bonusCode: "Бонус код",
    optional: "* Необязательно",
    agreementError: "Подтвердите согласие, чтобы продолжить.",
    usernameRequired: "Поле обязательно для заполнения.",
    emailInvalid: "Введите корректный адрес электронной почты.",
    nicknameInUse: "Такое имя уже используется.",
    emailInUse: "Такой адрес уже используется.",
    inviteCodeError: "Incorrect Invitation Code.",
    register: "ЗАРЕГИСТРИРОВАТЬСЯ",
    back: "Назад",
    verificationTitle: "Код подтверждения",
    loading: "Загрузка...",
    agreement: (
      <>
        Я ознакомился и соглашаюсь с{" "}
        <a
          href="https://pokerplanets.com/ru/terms-conditions/"
          target="_blank"
          rel="noreferrer"
        >
          Общими условиями и положениями
        </a>
        ,{" "}
        <a
          href="https://pokerplanets.com/ru/terms-conditions/privacy-policy/"
          target="_blank"
          rel="noreferrer"
        >
          Политикой конфиденциальности
        </a>{" "}
        и{" "}
        <a
          href="https://pokerplanets.com/ru/terms-conditions/cookie-policy/"
          target="_blank"
          rel="noreferrer"
        >
          Политикой использования файлов cookie
        </a>
        , а также подтверждаю свое совершеннолетие.
      </>
    ),
  },
  en: {
    username: "Username",
    nicknamePopup:
      "Username must be 3 to 16 characters long and include only Latin letters, numbers, and special characters; spaces are not allowed.",
    email: "E-mail",
    password: "Password",
    bonusCode: "Bonus Code",
    optional: "* Optional",
    agreementError: "Confirm to proceed.",
    usernameRequired: "This field is required.",
    emailInvalid: "Please enter a valid email address.",
    nicknameInUse: "The username is already in use.",
    emailInUse: "The e-mail address is already in use.",
    inviteCodeError: "Incorrect Invitation Code.",
    register: "REGISTER",
    back: "Back",
    verificationTitle: "Verification Code",
    loading: "Loading...",
    agreement: (
      <>
        I have read and agree to the{" "}
        <a
          href="https://pokerplanets.com/terms-conditions/"
          target="_blank"
          rel="noreferrer"
        >
          Terms and Conditions
        </a>
        ,{" "}
        <a
          href="https://pokerplanets.com/terms-conditions/privacy-policy/"
          target="_blank"
          rel="noreferrer"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="https://pokerplanets.com/terms-conditions/cookie-policy/"
          target="_blank"
          rel="noreferrer"
        >
          Cookie Policy
        </a>
        , and I confirm that I am of legal age.
      </>
    ),
  },
} as const;

const API_ERROR_DETAILS = {
  nickname: "Username cannot be accepted. Please choose another.",
  email: "E-mail cannot be accepted. Please choose another.",
  emailInvalid: "E-mail address is not valid.",
  inviteCode: "Code is invalid.",
} as const;

function validatePassword(password: string): ValidationState {
  return {
    length: password.length >= 6 && password.length <= 20,
    capitalLetter: /[A-Z]/.test(password),
    lowercaseLetter: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };
}

function isPasswordValid(password: string): boolean {
  return Object.values(validatePassword(password)).every(Boolean);
}

function hasErrorDetail(errors: unknown, detail: string): boolean {
  if (!Array.isArray(errors)) return false;
  return errors.some((e: { detail?: string }) => e?.detail === detail);
}

export interface RegistrationFormBlockProps {
  onClose?: () => void;
  className?: string;
}

const RegistrationFormBlock = ({
  onClose: _onClose,
  className,
}: RegistrationFormBlockProps) => {
  const dispatch = useDispatch();
  const yourLang = useSelector((s: RootState) => s.registration.yourLang);
  const lang = yourLang === "ru" ? "ru" : "en";
  const copy = COPY[lang];

  const {
    countryReg,
    countryCodeReg,
    currentPage,
    nicknameReg,
    emailReg,
    passwordReg,
    validationReg,
    invitationCodeReg,
    agreementReg,
    formToken,
    isVerificationCodeValidReg,
  } = useSelector((s: RootState) => s.registration);

  const [register, { isLoading: isLoadingRegister }] = useRegisterMutation();
  const {
    data,
    isLoading: isLoadingFormToken,
    refetch: refetchFormToken,
  } = useGetFormTokenQuery();
  const [resendVerificationCode] = useResendVerificationCodeMutation();
  const [checkVerificationCode] = useCheckVerificationCodeMutation();

  const [nicknameError, setNicknameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [agreementError, setAgreementError] = useState("");
  const [invitationCodeError, setInvitationCodeError] = useState("");
  const [showPasswordResetForm, setShowPasswordResetForm] = useState(false);

  useEffect(() => {
    if (!isLoadingFormToken && data) dispatch(setFormToken(data.token));
  }, [data, isLoadingFormToken, dispatch]);

  useEffect(() => {
    if (isVerificationCodeValidReg !== true) return;
    const t = setTimeout(() => dispatch(setCurrentPage("Last")), 1000);
    return () => clearTimeout(t);
  }, [isVerificationCodeValidReg, dispatch]);

  const handleValidation = (v: ValidationState) =>
    dispatch(setValidationReg(v));
  const isSubmitDisabled = useMemo(
    () =>
      !nicknameReg ||
      !isUsernameFormatValid(nicknameReg) ||
      !!nicknameError ||
      !isEmailFormatValid(emailReg) ||
      !!emailError ||
      !countryReg ||
      !countryCodeReg ||
      !passwordReg ||
      !isPasswordValid(passwordReg) ||
      !!invitationCodeError,
    [
      nicknameReg,
      nicknameError,
      emailReg,
      emailError,
      countryReg,
      countryCodeReg,
      passwordReg,
      invitationCodeError,
    ]
  );

  const handleSubmit = async () => {
    setNicknameError(
      !nicknameReg
        ? copy.usernameRequired
        : !isUsernameFormatValid(nicknameReg)
          ? copy.usernameRequired
          : ""
    );
    setEmailError(
      !emailReg
        ? copy.usernameRequired
        : !isEmailFormatValid(emailReg)
          ? copy.emailInvalid
          : ""
    );
    setPasswordError(
      !passwordReg
        ? "Please enter your password."
        : !isPasswordValid(passwordReg)
          ? "Password does not meet all requirements."
          : ""
    );
    setCountryError(!countryReg ? "Please select your country." : "");
    setAgreementError(!agreementReg ? copy.agreementError : "");

    if (
      !nicknameReg ||
      !isUsernameFormatValid(nicknameReg) ||
      !isEmailFormatValid(emailReg) ||
      !countryReg ||
      !countryCodeReg ||
      !passwordReg ||
      !isPasswordValid(passwordReg) ||
      !agreementReg
    ) {
      return;
    }

    try {
      const result = await register({
        nick: nicknameReg,
        email: emailReg,
        password: passwordReg,
        confirmPassword: passwordReg,
        countryId: countryCodeReg,
        bonusCode: invitationCodeReg,
        confirmRules: agreementReg,
        formToken,
      }).unwrap();
      dispatch(setSuccessArr(result));
      dispatch(setCurrentPage("Second"));
    } catch (err: unknown) {
      const errors = (err as { data?: { errors?: unknown } })?.data?.errors;
      if (hasErrorDetail(errors, API_ERROR_DETAILS.nickname))
        setNicknameError(copy.nicknameInUse);
      if (hasErrorDetail(errors, API_ERROR_DETAILS.emailInvalid))
        setEmailError(copy.emailInvalid);
      if (hasErrorDetail(errors, API_ERROR_DETAILS.email))
        setEmailError(copy.emailInUse);
      if (hasErrorDetail(errors, API_ERROR_DETAILS.inviteCode))
        setInvitationCodeError(copy.inviteCodeError);
      dispatch(setErrorsArr(err));
    }
  };

  const handleFirstPage = () => {
    refetchFormToken();
    dispatch(setCurrentPage("First"));
    dispatch(setNicknameReg(""));
    dispatch(setEmailReg(""));
  };

  const handleSuccessPage = async (verificationCode: string) => {
    if (!formToken) return;
    try {
      await checkVerificationCode({ formToken, verificationCode }).unwrap();
      dispatch(setIsVerificationCodeValid(true));
    } catch {
      dispatch(setIsVerificationCodeValid(false));
    }
  };

  const renderSendPassword = () => {
    if (yourLang !== "ru") return null;
    if (showPasswordResetForm) {
      return (
        <SendPassword
          openInForm
          onClose={() => setShowPasswordResetForm(false)}
        />
      );
    }
    return <SendPassword onOpenForm={() => setShowPasswordResetForm(true)} />;
  };

  return (
    <S.RegistrationFormBlockWrapper className={className}>
      {!isLoadingRegister && currentPage === "First" && (
        <S.FormContainer>
          {renderSendPassword()}
          {!showPasswordResetForm && (
            <>
              <S.NicknameEmailRow>
                <SimpleInput
                  value={nicknameReg}
                  inputType="text"
                  placeholderText={copy.username}
                  setValueInParent={(v: string) => dispatch(setNicknameReg(v))}
                  errorEnabled
                  errorText={nicknameError}
                  errorHandler={setNicknameError}
                  popupContent={
                    <SimpleInputPopupRulesBlock>
                      <SimpleInputPopupWarningIcon aria-hidden>
                        ⚠
                      </SimpleInputPopupWarningIcon>
                      <SimpleInputPopupRulesText>
                        {copy.nicknamePopup}
                      </SimpleInputPopupRulesText>
                    </SimpleInputPopupRulesBlock>
                  }
                  popupMinWidth={280}
                  isUsername
                  usernameRequiredError={copy.usernameRequired}
                  usernameInvalidError={copy.usernameRequired}
                />
                <SimpleInput
                  value={emailReg}
                  inputType="email"
                  placeholderText={copy.email}
                  setValueInParent={(v: string) => dispatch(setEmailReg(v))}
                  errorEnabled
                  errorText={emailError}
                  errorHandler={setEmailError}
                  isEmail
                  emailRequiredError={copy.usernameRequired}
                  emailInvalidError={copy.emailInvalid}
                />
              </S.NicknameEmailRow>
              <PasswordInput
                value={passwordReg}
                inputType="password"
                placeholderText={copy.password}
                setValueInParent={(v) => dispatch(setPasswordReg(v))}
                passwordValidation={validationReg}
                setPasswordValidation={handleValidation}
                errorEnabled
                errorText={passwordError}
                errorHandler={setPasswordError}
                showPopupOnlyWhenModalClosed
              />
              <S.CountryCodeRow>
                <InvitationCodeInput
                  value={invitationCodeReg}
                  onChange={(v) => dispatch(setInvitationCodeReg(v))}
                  placeholder={copy.bonusCode}
                  optionalLabel={copy.optional}
                  isEn={lang !== "ru"}
                  errorText={invitationCodeError}
                  errorHandler={setInvitationCodeError}
                />
                <CountrySelect
                  inputValue={countryReg}
                  setInputValue={(v: string) => dispatch(setCountryReg(v))}
                  selectedCountryCode={countryCodeReg}
                  setSelectedCountryCode={(v: string) =>
                    dispatch(setCountryCodeReg(v))
                  }
                  errorEnabled
                  errorText={countryError}
                  errorHandler={setCountryError}
                  usePortal={false}
                />
              </S.CountryCodeRow>
              <S.CheckboxWrapper>
                <CustomCheckbox
                  label=""
                  checked={agreementReg}
                  onChange={(v) => dispatch(setAgreementReg(v))}
                  errorEnabled
                  errorText={agreementError}
                  errorHandler={setAgreementError}
                />
                <p>{copy.agreement}</p>
              </S.CheckboxWrapper>
              {agreementError && (
                <S.CheckboxError role="alert">{agreementError}</S.CheckboxError>
              )}
              <S.ButtonWrapper>
                <SimpleButton
                  isDisabled={isSubmitDisabled}
                  handleClick={handleSubmit}
                  text={copy.register}
                />
              </S.ButtonWrapper>
            </>
          )}
        </S.FormContainer>
      )}

      {isLoadingRegister && (
        <S.LoadingOverlay>
          <div>{copy.loading}</div>
        </S.LoadingOverlay>
      )}

      {currentPage === "Second" && (
        <S.FormContainer>
          <S.SecondPageHeader>
            <S.BackButton
              type="button"
              onClick={handleFirstPage}
              aria-label={copy.back}
            />
            <S.SecondPageTitle>{copy.verificationTitle}</S.SecondPageTitle>
            <span style={{ width: 44 }} aria-hidden />
          </S.SecondPageHeader>
          <VerificationCodeScreen
            email={emailReg}
            handleFirstPage={handleFirstPage}
            handleResend={() => resendVerificationCode({ formToken })}
            handleSuccessPage={handleSuccessPage}
            correctCode={isVerificationCodeValidReg}
            handleCorrectCodeStatus={setIsVerificationCodeValid}
          />
        </S.FormContainer>
      )}

      {currentPage === "Last" && (
        <S.FormContainer>
          <SuccessScreen />
        </S.FormContainer>
      )}
    </S.RegistrationFormBlockWrapper>
  );
};

export default RegistrationFormBlock;
