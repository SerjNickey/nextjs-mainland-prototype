import {
  CheckboxContainer,
  StyledCheckbox,
  CheckboxLabel,
} from "./CustomCheckbox.styled";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface CustomCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  errorEnabled?: boolean;
  errorText?: string;
  errorHandler?: (error: string) => void;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  checked,
  onChange,
  errorEnabled = false,
  errorText = "",
  errorHandler,
}) => {
  const hasError = errorEnabled && errorText !== "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
    errorHandler?.("");
  };

  return (
    <CheckboxContainer>
      <CheckboxLabel isError={hasError}>
        <StyledCheckbox
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          isError={hasError}
        />
        <span>{label}</span>
      </CheckboxLabel>
    </CheckboxContainer>
  );
};

export default CustomCheckbox;
