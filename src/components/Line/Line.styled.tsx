import styled from "styled-components";
import line from "../../assets/images/Line/redline.webp";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface ContainerProps {
  secondType?: boolean;
  isVisible?: boolean;
}

// -----------------------------------------------------------------------------
// Component styles
// -----------------------------------------------------------------------------

export const Container = styled.section<ContainerProps>`
  max-width: 1440px;
  width: 100%;
  height: 2px;
  margin: 0 auto;
  background: url(${line.src}) no-repeat center;
  background-size: 100% 100%;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
`;
