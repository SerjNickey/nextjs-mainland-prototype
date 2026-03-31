import { useState, useRef, useLayoutEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";

import type { RootState } from "../../store";
import * as S from "./PasswordInput.styled";
import eyeClosedWhite from "../../assets/images/PasswordInput/eye_closed_white.webp";
import eyeOpenedWhite from "../../assets/images/PasswordInput/eye_opened_white.webp";
import eyeClosedGrey from "../../assets/images/PasswordInput/eye_closed_grey.webp";

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const POPUP_WIDTH = 250;
const POPUP_GAP = 12;

const PASSWORD_RULES = {
  length: (s: string) => s.length >= 6 && s.length <= 20,
  capitalLetter: (s: string) => /[A-Z]/.test(s),
  lowercaseLetter: (s: string) => /[a-z]/.test(s),
  number: (s: string) => /[0-9]/.test(s),
  symbol: (s: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(s),
} as const;

const POPUP_COPY: Record<
  string,
  { title: string; items: Record<keyof typeof PASSWORD_RULES, string> }
> = {
  en: {
    title: "Password must contain:",
    items: {
      length: "6–20 characters using:",
      capitalLetter: "a capital letter",
      lowercaseLetter: "a lowercase letter",
      number: "a number",
      symbol: "a symbol",
    },
  },
  ru: {
    title: "Пароль должен содержать:",
    items: {
      length: "6–20 символов, используя:",
      capitalLetter: "заглавную букву",
      lowercaseLetter: "строчную букву",
      number: "цифру",
      symbol: "символ",
    },
  },
};

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type ValidationState = Record<keyof typeof PASSWORD_RULES, boolean>;

interface PasswordInputProps {
  value: undefined | string;
  isError?: boolean;
  errorText?: string;
  placeholderText: string;
  isRequired?: boolean;
  inputType: string;
  setValueInParent: (v: string) => void;
  errorHandler?: (v: string) => void;
  errorEnabled: boolean;
  passwordValidation: ValidationState | undefined;
  setPasswordValidation: (v: ValidationState) => void;
  showPopupOnlyWhenModalClosed?: boolean;
  popupVerticalNudge?: number;
  popupInPortal?: boolean;
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function runValidation(password: string): ValidationState {
  return Object.fromEntries(
    (Object.keys(PASSWORD_RULES) as (keyof typeof PASSWORD_RULES)[]).map(
      (key) => [key, PASSWORD_RULES[key](password)]
    )
  ) as ValidationState;
}

function isFullyValid(v: ValidationState | undefined): boolean {
  if (!v) return false;
  return (Object.keys(PASSWORD_RULES) as (keyof typeof PASSWORD_RULES)[]).every(
    (k) => !!v[k]
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  placeholderText,
  inputType,
  isRequired,
  setValueInParent,
  errorText,
  errorHandler,
  errorEnabled,
  passwordValidation,
  setPasswordValidation,
  showPopupOnlyWhenModalClosed = false,
  popupVerticalNudge = 0,
  popupInPortal = false,
}) => {
  const { yourLang, qrfModalIsOpen } = useSelector(
    (s: RootState) => s.registration
  );

  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ left: 0, top: 0 });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validation =
    (passwordValidation as ValidationState | undefined) ??
    runValidation(value ?? "");
  const isPasswordValid = isFullyValid(validation);
  const hasValue = (value ?? "").length > 0;
  const hasError = errorEnabled && (errorText ?? "") !== "";

  const showValidationPopup =
    isFocused &&
    !isPasswordValid &&
    (!showPopupOnlyWhenModalClosed || !qrfModalIsOpen);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value;
      setValueInParent(next);
      errorHandler?.("");
      setPasswordValidation(runValidation(next));
    },
    [setValueInParent, errorHandler, setPasswordValidation]
  );

  const handleCapsLock = useCallback((e: React.KeyboardEvent) => {
    setIsCapsLockOn(Boolean(e.getModifierState?.("CapsLock")));
  }, []);

  const updatePopupPosition = useCallback(() => {
    const el = inputRef.current ?? wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const bodyTop =
      parseInt(
        String(
          document.body.style.top || getComputedStyle(document.body).top || "0"
        ).replace("px", ""),
        10
      ) || 0;
    const offsetY = bodyTop < 0 ? Math.abs(bodyTop) : 0;
    const nudgeY = offsetY > 0 ? 10 : 0;
    setPopupPosition({
      left: rect.left - POPUP_WIDTH - POPUP_GAP,
      top: rect.top + rect.height / 2 + offsetY + nudgeY + popupVerticalNudge,
    });
  }, [popupVerticalNudge]);

  useLayoutEffect(() => {
    if (!popupInPortal || !showValidationPopup) return;
    updatePopupPosition();

    const t1 = setTimeout(updatePopupPosition, 0);
    const rafId = requestAnimationFrame(() => {
      updatePopupPosition();
      requestAnimationFrame(updatePopupPosition);
    });
    const t2 = setTimeout(updatePopupPosition, 100);

    let scrollParent: Element | null = null;
    for (
      let p: Element | null = wrapperRef.current?.parentElement ?? null;
      p;
      p = p.parentElement
    ) {
      const style = getComputedStyle(p);
      if (/(auto|scroll|overlay)/.test(style.overflowY + style.overflow)) {
        scrollParent = p;
        break;
      }
    }

    const onUpdate = () => updatePopupPosition();
    window.addEventListener("resize", onUpdate);
    window.addEventListener("scroll", onUpdate, true);
    scrollParent?.addEventListener("scroll", onUpdate, true);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onUpdate);
      window.removeEventListener("scroll", onUpdate, true);
      scrollParent?.removeEventListener("scroll", onUpdate, true);
    };
  }, [
    popupInPortal,
    showValidationPopup,
    popupVerticalNudge,
    updatePopupPosition,
  ]);

  const lang = yourLang === "en" ? "en" : "ru";
  const copy = POPUP_COPY[lang] ?? POPUP_COPY.en;
  const eyeSrc = showPassword
    ? eyeOpenedWhite
    : value
      ? eyeClosedWhite
      : eyeClosedGrey;

  const popupBody = showValidationPopup ? (
    <>
      <S.ValidationPopupHeader>
        <S.ValidationPopupWarningIcon aria-hidden>
          ⚠
        </S.ValidationPopupWarningIcon>
        <S.ValidationPopupTitle>{copy.title}</S.ValidationPopupTitle>
      </S.ValidationPopupHeader>
      <S.ValidationPopupContent>
        {(Object.keys(PASSWORD_RULES) as (keyof typeof PASSWORD_RULES)[]).map(
          (key) => (
            <S.ValidationText key={key} isValid={validation?.[key] ?? false}>
              {copy.items[key]}
            </S.ValidationText>
          )
        )}
      </S.ValidationPopupContent>
    </>
  ) : null;

  const popupContent =
    showValidationPopup && popupBody ? (
      popupInPortal && typeof document !== "undefined" ? (
        <S.ValidationPopupPortal
          $left={popupPosition.left}
          $top={popupPosition.top}
        >
          {popupBody}
        </S.ValidationPopupPortal>
      ) : (
        <S.ValidationPopup>{popupBody}</S.ValidationPopup>
      )
    ) : null;

  return (
    <S.PasswordInputContainer>
      <S.InputColumn>
        <S.InputWrapper
          ref={wrapperRef}
          data-placeholder={placeholderText}
          data-error={hasError}
          data-valid={isPasswordValid}
          data-filled={hasValue}
        >
          {popupInPortal && popupContent
            ? createPortal(popupContent, document.body)
            : popupContent}
          <S.StyledInput
            ref={inputRef}
            placeholder=" "
            aria-label={placeholderText}
            type={showPassword ? "text" : inputType}
            required={isRequired}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleCapsLock}
            onKeyUp={handleCapsLock}
            isError={hasError}
            isCapsLockOn={isCapsLockOn}
            showPassword={!showPassword}
            isValid={isPasswordValid}
          />
          <S.ToggleButton
            onClick={() => setShowPassword((v) => !v)}
            type="button"
          >
            <img src={eyeSrc} alt="" />
          </S.ToggleButton>
        </S.InputWrapper>
        {isCapsLockOn && <S.CapsLockWarning>Capslock is ON</S.CapsLockWarning>}
        {hasError && <S.StyledError>{errorText}</S.StyledError>}
      </S.InputColumn>
    </S.PasswordInputContainer>
  );
};

export default PasswordInput;
