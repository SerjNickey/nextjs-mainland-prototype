import { Container } from "./Line.styled";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface LineProps {
  secondType?: boolean;
  isVisible?: boolean;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Line: React.FC<LineProps> = ({ secondType, isVisible }) => (
  <Container secondType={secondType} isVisible={isVisible} />
);

export default Line;
