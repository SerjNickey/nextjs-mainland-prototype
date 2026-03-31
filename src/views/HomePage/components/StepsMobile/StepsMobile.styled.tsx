import styled from "styled-components";

export const Wrapper = styled.section`
  padding: 0 15px;
  margin: 0 auto 40px auto;
`;

export const Title = styled.h2`
  font-weight: 800;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  margin-bottom: 15px;
`;

export const StepsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

export const Step = styled.div<{ $isLeft?: boolean }>`
  max-width: 343px;
  width: 100%;

  display: flex;
  padding-left: ${({ $isLeft }) => ($isLeft ? "15px" : "0")};
  padding-right: ${({ $isLeft }) => ($isLeft ? "0" : "15px")};
  flex-direction: row;
  justify-content: ${({ $isLeft }) => ($isLeft ? "flex-start" : "flex-end")};
  background:
    linear-gradient(0deg, rgba(177, 177, 177, 0.1), rgba(177, 177, 177, 0.1)),
    #000000;
  border: 1px solid #292929;
  box-shadow: inset 0px 1.1875px 0px rgba(255, 255, 255, 0.05);
  border-radius: 8px;

  & img {
    width: auto;
    height: 120px;
  }
`;

export const StepTxtBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`;

export const StepTxtTitle = styled.div`
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
`;

export const StepTxtDesc = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #ffffff;

  &,
  & * {
    font-family: "Montserrat", sans-serif !important;
    font-weight: 400 !important;
    font-size: 10px !important;
    line-height: 12px !important;
    color: #ffffff !important;
  }

  p {
    margin: 0;
  }

  b,
  strong {
    font-weight: 400 !important;
  }
`;
