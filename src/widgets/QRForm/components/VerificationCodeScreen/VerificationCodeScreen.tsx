import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../store";
import {
  VerificationContainer,
  InputsContainer,
  Input,
  StatusContainer,
  InfoContainer,
  ButtonsContainer,
  VerifyButton,
} from "./VerificationCodeScreen.styled";
import CountdownButton from "../../../../components/CountdownButton/CountdownButton";

interface IVerificationCodeScreen {
  correctCode: boolean | null;
  handleResend: any;
  handleSuccessPage: any;
  email: string;
  handleFirstPage: any;
  handleCorrectCodeStatus: any;
}

const VerificationCodeScreen: React.FC<IVerificationCodeScreen> = ({
  correctCode,
  handleResend,
  handleSuccessPage,
  email,
  handleFirstPage,
  handleCorrectCodeStatus,
}) => {
  const { yourLang } = useSelector((state: RootState) => state.registration);
  const lang = yourLang;
  const dispatch = useDispatch();
  const [digits, setDigits] = useState(["", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = digits.join("");

    handleSuccessPage(code);
  };

  useEffect(() => {
    if (correctCode === false) {
      setTimeout(() => {
        dispatch(handleCorrectCodeStatus(null));
        setDigits(["", "", "", ""]);
        inputsRef.current[0]?.focus();
      }, 1000);
    }
  }, [correctCode]);

  return (
    <VerificationContainer>
      {lang === "ru" ? (
        <InfoContainer>
          Введите 6-значный код, который мы отправили на адрес электронной почты{" "}
          {email ? email : "chupa.pupa@bk.ru"}
          <br />
          <span onClick={handleFirstPage}>Нажмите здесь</span> , чтобы изменить
          электронную почту
        </InfoContainer>
      ) : (
        <InfoContainer>
          Enter the 6-digit code we have sent to
          <br /> {email ? email : "chupa.pupa@bk.ru"}
          <br />
          <span onClick={handleFirstPage}>Click here</span> to change the e-mail
        </InfoContainer>
      )}

      <div>
        <InputsContainer>
          {digits.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              value={digit}
              $filled={!!digit}
              $verified={correctCode}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </InputsContainer>
        {correctCode === false && correctCode !== null && (
          <StatusContainer $verifed={correctCode}>
            {lang === "ru"
              ? "Неверный код подтверждения."
              : "Verification Code Invalid"}
          </StatusContainer>
        )}
        {correctCode === true && correctCode === true && (
          <StatusContainer $verifed={correctCode}>
            {lang === "ru" ? "Успешно!" : "Success!"}
          </StatusContainer>
        )}
      </div>
      {lang === "ru" ? (
        <InfoContainer>
          Не получили код?
          <br /> Нажмите на кнопку ниже «Отправить код»
        </InfoContainer>
      ) : (
        <InfoContainer>
          Did not get the code?
          <br /> Click on the button below ”Resend Code”
        </InfoContainer>
      )}
      <ButtonsContainer>
        <CountdownButton onClick={handleResend}>
          {lang === "ru" ? "Отправить код" : "Resend Code"}
        </CountdownButton>
        <VerifyButton
          onClick={handleVerify}
          disabled={digits.some((digit) => digit === "")}
        >
          {lang === "ru" ? "Подтвердить" : "Verify"}
        </VerifyButton>
      </ButtonsContainer>
    </VerificationContainer>
  );
};

export default VerificationCodeScreen;
