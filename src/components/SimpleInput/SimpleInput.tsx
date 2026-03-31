/**
 * SimpleInput — контролируемый инпут с плавающим плейсхолдером.
 *
 * Плейсхолдер: рисуется через ::before контейнера (data-placeholder).
 * При фокусе или непустом value — уезжает вверх (data-filled).
 *
 * Попап: при popupContent показывается при фокусе; popupInPortal рендерит в document.body.
 */
import { useState, useRef, useLayoutEffect, useCallback } from "react";
import { createPortal } from "react-dom";

import {
  SimpleInputContainer,
  SimpleInputPopupWrapper,
  SimpleInputPopup,
  SimpleInputPopupPortal,
  StyledInput,
  StyledError,
} from "./SimpleInput.styled";
import { isUsernameFormatValid } from "./usernameValidation";
import { isEmailFormatValid } from "./emailValidation";

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const POPUP_DEFAULT_WIDTH = 250;
const POPUP_GAP = 12;
const MOBILE_USERNAME_BREAKPOINT = 540;
const SIMPLE_INPUT_HEIGHT_PX = 44;
const SIMPLE_INPUT_LABEL_IDLE_TOP_PX = SIMPLE_INPUT_HEIGHT_PX / 2;

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface SimpleInputProps {
  isError?: boolean;
  errorText?: string;
  placeholderText: string;
  isRequired?: boolean;
  inputType: string;
  setValueInParent: (value: string) => void;
  errorHandler?: (value: string) => void;
  errorEnabled: boolean;
  value: string;
  popupContent?: React.ReactNode;
  popupMinWidth?: number;
  popupWidth?: number;
  popupMaxWidth?: number;
  popupInPortal?: boolean;
  /**
   * Поле — Username: включает только для него правила (blur/ввод, `usernameRequiredError` / `usernameInvalidError`, зелёный успех).
   * Для остальных инпутов не передавать.
   */
  isUsername?: boolean;
  /** Сообщения ошибок username — учитываются только при `isUsername` */
  usernameRequiredError?: string;
  usernameInvalidError?: string;
  /**
   * Поле — email: те же правила, что у username (blur/ввод, сообщения, зелёный успех).
   * Не комбинировать с `isUsername` на одном инпуте.
   */
  isEmail?: boolean;
  /** Сообщения ошибок email — учитываются только при `isEmail` */
  emailRequiredError?: string;
  emailInvalidError?: string;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const SimpleInput: React.FC<SimpleInputProps> = ({
  placeholderText,
  inputType,
  isRequired,
  setValueInParent,
  errorText,
  errorHandler,
  errorEnabled,
  value,
  popupContent,
  popupMinWidth = POPUP_DEFAULT_WIDTH,
  popupWidth,
  popupMaxWidth,
  popupInPortal = false,
  isUsername = false,
  usernameRequiredError = "",
  usernameInvalidError = "",
  isEmail = false,
  emailRequiredError = "",
  emailInvalidError = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ left: 0, top: 0 });
  const [portalPositionReady, setPortalPositionReady] = useState(false);
  const [usernameFieldActivated, setUsernameFieldActivated] = useState(false);
  const [emailFieldActivated, setEmailFieldActivated] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasValue = value.length > 0;
  const hasError = errorEnabled && (errorText ?? "") !== "";
  const usernameRulesOk =
    isUsername && hasValue && isUsernameFormatValid(value);
  const emailRulesOk = isEmail && hasValue && isEmailFormatValid(value);
  const showValidHighlight =
    errorEnabled &&
    !hasError &&
    ((isUsername && usernameRulesOk) || (isEmail && emailRulesOk));
  const showPopup = Boolean(popupContent && isFocused);
  const popupWForPosition = popupMaxWidth ?? popupWidth ?? popupMinWidth;

  const handleValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value;
      setValueInParent(next);
      if (
        isUsername &&
        errorHandler &&
        usernameRequiredError &&
        usernameInvalidError
      ) {
        if (next.length === 0) {
          errorHandler("");
        } else if (!isUsernameFormatValid(next)) {
          errorHandler(usernameInvalidError);
        } else {
          errorHandler("");
        }
      } else if (
        isEmail &&
        errorHandler &&
        emailRequiredError &&
        emailInvalidError
      ) {
        if (next.length === 0) {
          errorHandler("");
        } else if (!isEmailFormatValid(next)) {
          errorHandler(emailInvalidError);
        } else {
          errorHandler("");
        }
      } else {
        errorHandler?.("");
      }
    },
    [
      setValueInParent,
      errorHandler,
      isUsername,
      usernameRequiredError,
      usernameInvalidError,
      isEmail,
      emailRequiredError,
      emailInvalidError,
    ]
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    if (isUsername) {
      setUsernameFieldActivated(true);
    }
    if (isEmail) {
      setEmailFieldActivated(true);
    }
  }, [isUsername, isEmail]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    if (
      isUsername &&
      errorHandler &&
      usernameRequiredError &&
      usernameFieldActivated &&
      value.length === 0
    ) {
      errorHandler(usernameRequiredError);
    }
    if (
      isEmail &&
      errorHandler &&
      emailRequiredError &&
      emailFieldActivated &&
      value.length === 0
    ) {
      errorHandler(emailRequiredError);
    }
  }, [
    isUsername,
    isEmail,
    errorHandler,
    usernameRequiredError,
    emailRequiredError,
    usernameFieldActivated,
    emailFieldActivated,
    value,
  ]);

  const updatePopupPosition = useCallback(() => {
    const el = inputRef.current ?? wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const isMobileUsernamePopup =
      isUsername &&
      typeof window !== "undefined" &&
      window.innerWidth <= MOBILE_USERNAME_BREAKPOINT;

    if (isMobileUsernamePopup) {
      const viewportPadding = 10;
      const left = Math.max(
        viewportPadding,
        Math.min(rect.left, window.innerWidth - popupWForPosition - viewportPadding)
      );
      setPopupPosition({
        left,
        // Якорим попап к уровню псевдоэлемента лейбла (::before).
        top: rect.top + SIMPLE_INPUT_LABEL_IDLE_TOP_PX,
      });
      return;
    }

    setPopupPosition({
      left: rect.left - popupWForPosition - POPUP_GAP,
      top: rect.top + rect.height / 2,
    });
  }, [popupWForPosition, isUsername]);

  useLayoutEffect(() => {
    if (!popupInPortal || !showPopup) {
      setPortalPositionReady(false);
      return;
    }
    setPortalPositionReady(false);
    updatePopupPosition();

    const t1 = setTimeout(() => {
      updatePopupPosition();
      setPortalPositionReady(true);
    }, 0);
    const rafId = requestAnimationFrame(() => {
      updatePopupPosition();
      requestAnimationFrame(updatePopupPosition);
    });
    const t2 = setTimeout(updatePopupPosition, 100);

    let scrollParent: Element | null = null;
    for (
      let p = wrapperRef.current?.parentElement ?? null;
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
  }, [popupInPortal, showPopup, updatePopupPosition]);

  const showPortalPopup =
    popupInPortal && portalPositionReady && typeof document !== "undefined";

  const inputProps = {
    placeholder: " ",
    "aria-label": placeholderText,
    type: inputType,
    required: isRequired,
    value,
    onChange: handleValue,
    isError: hasError,
    isValid: showValidHighlight,
  };

  const renderPopup = () => {
    if (!showPopup || !popupContent) return null;
    if (showPortalPopup) {
      return (
        <SimpleInputPopupPortal
          $left={popupPosition.left}
          $top={popupPosition.top}
          $minWidth={popupMinWidth}
          $width={popupWidth}
          $maxWidth={popupMaxWidth}
          $topPlacementMobile={isUsername}
        >
          {popupContent}
        </SimpleInputPopupPortal>
      );
    }
    if (!popupInPortal) {
      return (
        <SimpleInputPopup
          $minWidth={popupMinWidth}
          $width={popupWidth}
          $maxWidth={popupMaxWidth}
          $topPlacementMobile={isUsername}
        >
          {popupContent}
        </SimpleInputPopup>
      );
    }
    return null;
  };

  const inputBlock = (
    <>
      <StyledInput
        ref={inputRef}
        {...inputProps}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {hasError && <StyledError>{errorText}</StyledError>}
    </>
  );

  if (popupContent) {
    return (
      <SimpleInputPopupWrapper ref={wrapperRef}>
        {showPortalPopup && createPortal(renderPopup(), document.body)}
        <SimpleInputContainer
          data-placeholder={placeholderText}
          data-error={hasError}
          data-valid={showValidHighlight}
          data-filled={hasValue}
        >
          {!popupInPortal && renderPopup()}
          {inputBlock}
        </SimpleInputContainer>
      </SimpleInputPopupWrapper>
    );
  }

  return (
    <SimpleInputContainer
      data-placeholder={placeholderText}
      data-error={hasError}
      data-valid={showValidHighlight}
      data-filled={hasValue}
    >
      <StyledInput
        ref={inputRef}
        {...inputProps}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {hasError && <StyledError>{errorText}</StyledError>}
    </SimpleInputContainer>
  );
};

export default SimpleInput;
