import { useMemo, useState } from "react";
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
  setIsVerificationCodeValid,
  // setIsPageTransition,
} from "../../store/registrationSlice";
import {
  useRegisterMutation,
  useGetFormTokenQuery,
  useResendVerificationCodeMutation,
  useCheckVerificationCodeMutation,
} from "../../store/registrationApi";
import SimpleInput from "../../components/SimpleInput/SimpleInput";
import { isUsernameFormatValid } from "../../components/SimpleInput/usernameValidation";
import { isEmailFormatValid } from "../../components/SimpleInput/emailValidation";
import {
  SimpleInputPopupRulesBlock,
  SimpleInputPopupWarningIcon,
  SimpleInputPopupRulesText,
} from "../../components/SimpleInput/SimpleInput.styled";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import InvitationCodeInput from "../../components/InvitationCodeInput";
import CountrySelect from "../../components/CountrySelect";
import CustomCheckbox from "../../components/CustomCheckbox/CustomCheckbox";
import SimpleButton from "../../components/SimpleButton/SimpleButton";
import VerificationCodeScreen from "./components/VerificationCodeScreen/VerificationCodeScreen";
import SuccessScreen from "./components/SuccessScreen/SuccessScreen";
import {
  QRFormContainer,
  RegistrationSubtitle,
  NicknameEmailRow,
  CountryCodeRow,
  ButtonWrapper,
  CheckboxWrapper,
  CheckboxError,
} from "./QRForm.styled";
import SendPassword from "../SendPassword/SendPassword";

const QRForm = () => {
  const { yourLang } = useSelector((state: RootState) => state.registration);
  const lang = yourLang;
  const [register, { isLoading: isLoadingRegister }] = useRegisterMutation();
  const { refetch: refetchFormToken } = useGetFormTokenQuery();
  const [resendVerificationCode] = useResendVerificationCodeMutation();
  const [checkVerificationCode] = useCheckVerificationCodeMutation();

  const dispatch = useDispatch();
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
    // isPageTransition,
  } = useSelector((state: RootState) => state.registration);

  const [nicknameError, setNicknameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [agreementError, setAgreementError] = useState("");
  const [invitationCodeError, setInvitationCodeError] = useState("");

  const usernameValidationCopy = useMemo(
    () =>
      lang === "ru"
        ? {
          /** Сообщение под полем: пусто при blur / невалид при вводе */
          fieldMessage: "Обязательно для заполнения.",
          /** Только текст в попапе с правилами */
          popupHint:
            "Имя пользователя должно содержать от 3 до 16 символов, включая только латинские буквы, цифры и специальные символы. Пробелы не допускаются.",
        }
        : {
          fieldMessage: "This field is required.",
          popupHint:
            "Username must be 3 to 16 characters long and include only Latin letters, numbers, and special characters; spaces are not allowed.",
        },
    [lang]
  );

  const emailValidationCopy = useMemo(
    () =>
      lang === "ru"
        ? {
          required: "Обязательно для заполнения.",
          invalid: "Введите корректный адрес электронной почты.",
        }
        : {
          required: "This field is required.",
          invalid: "Please enter a valid email address.",
        },
    [lang]
  );

  // useEffect(() => {
  //   if (isLoadingFormToken) {
  //     console.log(
  //       "  - - - -  F O R M    T O K E N    I S    L O A D I N G  - - - -  "
  //     );
  //   } else {
  //     console.log("  - - - -  F O R M    T O K E N  - - - -  ", data);
  //     dispatch(setFormToken(data.token));
  //   }
  // }, [data]);

  const validatePassword = (password: string) => {
    const validation = {
      length: password.length >= 6 && password.length <= 20,
      capitalLetter: /[A-Z]/.test(password),
      lowercaseLetter: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };
    return validation;
  };

  const isPasswordValid = (password: string) => {
    const validation = validatePassword(password);
    return Object.values(validation).every(Boolean);
  };

  const handleNicknameReg = (e: string) => {
    dispatch(setNicknameReg(e));
  };
  const handleEmailReg = (e: string) => {
    dispatch(setEmailReg(e));
  };
  const handlePasswordReg = (e: string) => {
    dispatch(setPasswordReg(e));
  };
  const handleValidation = (e: {
    length: boolean;
    capitalLetter: boolean;
    lowercaseLetter: boolean;
    number: boolean;
    symbol: boolean;
  }) => {
    dispatch(setValidationReg(e));
  };
  const handleCountryReg = (e: string) => {
    dispatch(setCountryReg(e));
  };
  const handleCountryCodeReg = (e: string) => {
    dispatch(setCountryCodeReg(e));
  };
  const handleInvitationCodeReg = (e: string) => {
    dispatch(setInvitationCodeReg(e));
  };
  const handleAgreementReg = (e: boolean) => {
    dispatch(setAgreementReg(e));
  };

  const hasErrorByDetail = (errors: any, detailText: string) => {
    if (!Array.isArray(errors)) return false;

    return errors.some((error) => error?.detail === detailText);
  };

  const handleSubmit = async () => {
    if (!nicknameReg) {
      setNicknameError(usernameValidationCopy.fieldMessage);
    } else if (!isUsernameFormatValid(nicknameReg)) {
      setNicknameError(usernameValidationCopy.fieldMessage);
    } else {
      setNicknameError("");
    }

    if (!emailReg) {
      setEmailError(emailValidationCopy.required);
    } else if (!isEmailFormatValid(emailReg)) {
      setEmailError(emailValidationCopy.invalid);
    } else {
      setEmailError("");
    }
    if (!passwordReg) {
      setPasswordError("Please enter your password.");
    } else if (!isPasswordValid(passwordReg)) {
      setPasswordError("Password does not meet all requirements.");
    }
    if (!countryReg) {
      setCountryError("Please select your country.");
    }
    if (!agreementReg) {
      setAgreementError(
        lang === "ru"
          ? "Подтвердите согласие, чтобы продолжить."
          : "Confirm to proceed."
      );
    }

    if (
      nicknameReg &&
      isUsernameFormatValid(nicknameReg) &&
      emailReg &&
      isEmailFormatValid(emailReg) &&
      countryReg &&
      countryCodeReg &&
      passwordReg &&
      isPasswordValid(passwordReg) &&
      agreementReg
    ) {
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

        console.log("Регистрация успешна:", result);
        dispatch(setSuccessArr(result));
        dispatch(setCurrentPage("Second"));
      } catch (err: any) {
        console.error("Ошибка регистрации:", err);
        if (
          hasErrorByDetail(
            err && err.data && err.data.errors,
            "Username cannot be accepted. Please choose another."
          )
        ) {
          setNicknameError(
            `${lang === "ru"
              ? "Такой никнейм уже существует."
              : "This nickname is already taken."
            }`
          );
        }
        if (
          hasErrorByDetail(
            err && err.data && err.data.errors,
            "E-mail cannot be accepted. Please choose another."
          )
        ) {
          setEmailError(
            `${lang === "ru"
              ? "Электронная почта не может быть принята. Попробуйте другую."
              : "Email can not be accepted. Please try another one."
            }`
          );
        }
        if (
          hasErrorByDetail(
            err && err.data && err.data.errors,
            "E-mail address is not valid."
          )
        ) {
          setEmailError(emailValidationCopy.invalid);
        }
        if (
          hasErrorByDetail(
            err && err.data && err.data.errors,
            "Code is invalid."
          )
        ) {
          setInvitationCodeError("Incorrect Invitation Code.");
        }
        dispatch(setErrorsArr(err));
      }
    }
  };

  const handleFirstPage = () => {
    refetchFormToken();
    dispatch(setCurrentPage("First"));
    dispatch(setNicknameReg(""));
    dispatch(setEmailReg(""));
  };

  const handleResendVerificationCode = () => {
    resendVerificationCode({ formToken });
  };

  const handleSuccessPage = async (verificationCode: any) => {
    console.log("  - - - -  V E R    C O D E  - - - -  ", verificationCode);

    try {
      const result = await checkVerificationCode({
        formToken,
        verificationCode,
      }).unwrap();

      console.group();
      console.log("  - - - -  CHECK RESULT  - - - -  ", result.data);
      console.groupEnd();
      dispatch(setIsVerificationCodeValid(true));
      setTimeout(() => {
        dispatch(setCurrentPage("Last"));
      }, 1000);
    } catch (err) {
      console.error("Ошибка проверки кода:", err);
      dispatch(setIsVerificationCodeValid(false));
    }
  };

  return (
    <>
      {!isLoadingRegister && currentPage === "First" && (
        <QRFormContainer>
          <RegistrationSubtitle>
            {lang === "ru"
              ? "Загрузка началась. Чтобы ускорить процесс игры, пожалуйста, зарегистрируйтесь."
              : "The download has started. To speed up the gaming process, please register."}
          </RegistrationSubtitle>
          {yourLang === "ru" && <SendPassword />}
          {yourLang === "en" && <div style={{ width: "440px" }}></div>}
          <NicknameEmailRow>
            <SimpleInput
              value={nicknameReg}
              inputType="text"
              placeholderText={lang === "ru" ? "Имя пользователя" : "Username"}
              setValueInParent={handleNicknameReg}
              errorEnabled={true}
              errorText={nicknameError}
              errorHandler={setNicknameError}
              popupContent={
                <SimpleInputPopupRulesBlock>
                  <SimpleInputPopupWarningIcon aria-hidden>
                    ⚠
                  </SimpleInputPopupWarningIcon>
                  <SimpleInputPopupRulesText>
                    {usernameValidationCopy.popupHint}
                  </SimpleInputPopupRulesText>
                </SimpleInputPopupRulesBlock>
              }
              popupMinWidth={220}
              popupMaxWidth={256}
              popupInPortal={true}
              isUsername
              usernameRequiredError={usernameValidationCopy.fieldMessage}
              usernameInvalidError={usernameValidationCopy.fieldMessage}
            />
            <SimpleInput
              value={emailReg}
              inputType="email"
              placeholderText={lang === "ru" ? "Электронная почта" : "E-mail"}
              setValueInParent={handleEmailReg}
              errorEnabled={true}
              errorText={emailError}
              errorHandler={setEmailError}
              isEmail
              emailRequiredError={emailValidationCopy.required}
              emailInvalidError={emailValidationCopy.invalid}
            />
          </NicknameEmailRow>
          <PasswordInput
            value={passwordReg}
            inputType="password"
            placeholderText={lang === "ru" ? "Пароль" : "Password"}
            setValueInParent={handlePasswordReg}
            passwordValidation={validationReg}
            setPasswordValidation={handleValidation}
            errorEnabled={true}
            errorText={passwordError}
            errorHandler={setPasswordError}
            popupVerticalNudge={8}
            popupInPortal={true}
          />
          <CountryCodeRow>
            <InvitationCodeInput
              value={invitationCodeReg}
              onChange={handleInvitationCodeReg}
              placeholder={lang === "ru" ? "Бонус код" : "Bonus Code"}
              optionalLabel={lang === "ru" ? "* Необязательно" : "* Optional"}
              isEn={lang !== "ru"}
              errorText={invitationCodeError}
              errorHandler={setInvitationCodeError}
            />
            <CountrySelect
              inputValue={countryReg}
              setInputValue={handleCountryReg}
              selectedCountryCode={countryCodeReg}
              setSelectedCountryCode={handleCountryCodeReg}
              errorEnabled={true}
              errorText={countryError}
              errorHandler={setCountryError}
            />
          </CountryCodeRow>
          <CheckboxWrapper>
            <CustomCheckbox
              label=""
              checked={agreementReg}
              onChange={handleAgreementReg}
              errorEnabled={true}
              errorText={agreementError}
              errorHandler={setAgreementError}
            />
            {lang === "ru" ? (
              <p>
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
              </p>
            ) : (
              <p>
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
              </p>
            )}
          </CheckboxWrapper>
          {agreementError !== "" && (
            <CheckboxError role="alert">{agreementError}</CheckboxError>
          )}
          <ButtonWrapper>
            <SimpleButton
              isDisabled={
                !nicknameReg ||
                !isUsernameFormatValid(nicknameReg) ||
                nicknameError !== "" ||
                !emailReg ||
                !isEmailFormatValid(emailReg) ||
                emailError !== "" ||
                !countryReg ||
                !countryCodeReg ||
                !passwordReg ||
                !isPasswordValid(passwordReg) ||
                invitationCodeError !== ""
              }
              handleClick={handleSubmit}
              text={lang === "ru" ? "ЗАРЕГИСТРИРОВАТЬСЯ" : "REGISTER"}
            />
          </ButtonWrapper>
        </QRFormContainer>
      )}

      {isLoadingRegister && (
        <div
          style={{
            paddingTop: "35px",
            width: "240px",
            height: "240px",
            color: "#fff",
            textTransform: "uppercase",
            fontSize: 30,
            fontWeight: "700",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#000",
              width: "100%",
              height: "100%",
              position: "absolute",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {lang === "ru" ? "Загрузка..." : "Loading..."}
          </div>
        </div>
      )}

      {currentPage === "Second" && (
        <QRFormContainer>
          <VerificationCodeScreen
            email={emailReg}
            handleFirstPage={handleFirstPage}
            handleResend={handleResendVerificationCode}
            handleSuccessPage={handleSuccessPage}
            correctCode={isVerificationCodeValidReg}
            handleCorrectCodeStatus={setIsVerificationCodeValid}
          />
        </QRFormContainer>
      )}
      {currentPage === "Last" && (
        <QRFormContainer style={{ paddingTop: "35px" }}>
          <SuccessScreen />
        </QRFormContainer>
      )}
    </>
  );
};

export default QRForm;
