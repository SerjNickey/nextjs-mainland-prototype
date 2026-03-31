import { ButtonWrapper } from "./SimpleButton.styled";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface SimpleButtonProps {
  text: string;
  handleClick: () => void;
  isDisabled: boolean;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const SimpleButton: React.FC<SimpleButtonProps> = ({
  text,
  handleClick,
  isDisabled,
}) => (
  <ButtonWrapper disabled={isDisabled} onClick={handleClick}>
    {text}
  </ButtonWrapper>
);

export default SimpleButton;
