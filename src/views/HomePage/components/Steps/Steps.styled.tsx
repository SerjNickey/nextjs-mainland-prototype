import styled from "styled-components";
import { media } from "../../../../styles/breakpoints";

export const Wrapper = styled.section`
  width: 100%;
  margin: 0 auto 120px auto;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 800;
  font-size: 40px;
  line-height: 49px;
  /* identical to box height */
  text-align: center;
  text-transform: uppercase;

  color: #ffffff;
`;

export const Line = styled.div`
  display: flex;
  width: 100%;
  max-width: 1440px;
  height: 4px;
  background: linear-gradient(
    90deg,
    rgba(10, 10, 10, 0.2) 0%,
    #343132 11.06%,
    #343132 33.65%,
    #343132 96.57%,
    rgba(10, 10, 10, 0.2) 100%
  );
  border-radius: 1px;
  overflow: visible;
  position: absolute;
  top: var(--steps-line-offset);
  left: 0;
`;

export const LineSegment = styled.div<{ $isActive: boolean }>`
  flex: 1 1 0;
  position: relative;
  background: transparent;
  transition: background 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${(props) =>
      props.$isActive
        ? "linear-gradient(90deg, #343132 0%, #d70022 50%, #343132 100%)"
        : "transparent"};
    clip-path: ${(props) =>
      props.$isActive
        ? "polygon(0 50%, 6% 0, 94% 0, 100% 50%, 94% 100%, 6% 100%)"
        : "none"};
    transition:
      background 0.3s ease,
      clip-path 0.3s ease;
  }

  &::after {
    content: "";
    position: absolute;
    width: 24px;
    height: 24px;
    background: ${(props) => (props.$isActive ? "#d70022" : "#343132")};
    border-radius: 4px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
`;

export const StepsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
  align-items: stretch;
  position: relative;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  --steps-line-offset: 190px;

  ${media.max1024} {
    flex-direction: column;
    align-items: center;
  }
`;

export const StepCard = styled.div<{ $isActive: boolean }>`
  flex: 1 1 0;
  min-height: 220px;
  padding: 24px 10px 0 10px;

  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
`;

export const StepHeader = styled.div`
  min-height: 78px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 60px;
`;

export const StepBody = styled.div`
  margin-top: 0;
  padding: 16px;
  flex: 1 1 auto;
  background: rgba(27, 27, 27, 0.7);
  backdrop-filter: blur(5px);
  border-radius: 8px;
`;

export const StepNumber = styled.div<{ $isActive?: boolean }>`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 80px;
  text-align: center;
  color: ${(props) => (props.$isActive ? "#d70022" : "#343132")};
  opacity: 1;
  transition: color 0.3s ease;
`;

export const StepTitle = styled.h3<{ $isActive?: boolean }>`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  text-align: center;
  text-transform: uppercase;
  color: ${(props) => (props.$isActive ? "#ffffff" : "#343132")};
  transition: color 0.3s ease;
`;

export const StepDescription = styled.div<{ $isActive?: boolean }>`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  color: ${(props) => (props.$isActive ? "#ffffff" : "#84858a")};
  opacity: 0.8;
  transition: color 0.3s ease;

  p {
    margin: 0;
  }
`;
