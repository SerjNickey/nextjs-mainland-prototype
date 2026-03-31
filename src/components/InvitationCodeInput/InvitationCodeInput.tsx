import * as S from "./InvitationCodeInput.styled";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface InvitationCodeInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  /** Подпись над полем (напр. "* Необязательно" / "* Optional") */
  optionalLabel?: string;
  /** true = английский (ширина блока подписи 86px) */
  isEn?: boolean;
  errorText?: string;
  errorHandler?: (error: string) => void;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const InvitationCodeInput: React.FC<InvitationCodeInputProps> = ({
  value,
  onChange,
  placeholder,
  optionalLabel,
  isEn,
  errorText = "",
  errorHandler,
}) => {
  const hasValue = value.length > 0;
  const hasError = Boolean(errorText);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    errorHandler?.("");
  };

  return (
    <S.InvitationCodeInputWrapper
      $optionalLabel={optionalLabel}
      $isEn={isEn}
      data-filled={hasValue}
    >
      <S.BonusCodeFieldWrap
        data-placeholder={placeholder}
        data-filled={hasValue}
        data-error={hasError}
      >
        <S.StyledInput
          type="text"
          placeholder=" "
          aria-label={placeholder}
          value={value}
          onChange={handleChange}
          isError={hasError}
        />
      </S.BonusCodeFieldWrap>
      {hasError && <S.StyledError>{errorText}</S.StyledError>}
    </S.InvitationCodeInputWrapper>
  );
};

export default InvitationCodeInput;
