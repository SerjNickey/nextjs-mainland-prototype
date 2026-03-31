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

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const POPUP_DEFAULT_WIDTH = 250;
const POPUP_GAP = 12;

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
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ left: 0, top: 0 });
  const [portalPositionReady, setPortalPositionReady] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasValue = value.length > 0;
  const hasError = errorEnabled && (errorText ?? "") !== "";
  const showPopup = Boolean(popupContent && isFocused);
  const popupWForPosition = popupMaxWidth ?? popupWidth ?? popupMinWidth;

  const handleValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValueInParent(e.target.value);
      errorHandler?.("");
    },
    [setValueInParent, errorHandler]
  );

  const updatePopupPosition = useCallback(() => {
    const el = inputRef.current ?? wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPopupPosition({
      left: rect.left - popupWForPosition - POPUP_GAP,
      top: rect.top + rect.height / 2,
    });
  }, [popupWForPosition]);

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
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
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
      data-filled={hasValue}
    >
      <StyledInput {...inputProps} />
      {hasError && <StyledError>{errorText}</StyledError>}
    </SimpleInputContainer>
  );
};

export default SimpleInput;
