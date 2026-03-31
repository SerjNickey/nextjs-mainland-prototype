import * as S from "./StepsMobile.styled";
import step1 from "../../../../assets/images/SimpleSteps/step_one_small_2x.webp";
import step2 from "../../../../assets/images/SimpleSteps/step_two_small_2x.webp";
import step3 from "../../../../assets/images/SimpleSteps/step_three_small_2x.webp";

const stepsArr = [step1, step2, step3];

type StepItem = {
  step_number?: number;
  title?: string;
  description?: string;
  description_mobile?: string;
};

type HomePageData = {
  steps_title?: string;
  steps?: Array<{
    value?: StepItem;
  }>;
} | null;

type StepsMobileProps = {
  data?: HomePageData;
};

const StepsMobile = (_props: StepsMobileProps) => {
  return (
    <S.Wrapper>
      <S.Title>{_props.data?.steps_title}</S.Title>
      <S.StepsWrapper>
        {_props.data?.steps?.map((step, index) => (
          <S.Step key={step.value?.title} $isLeft={index === 1}>
            {index !== 1 && (
              <img src={stepsArr[index]} alt={step.value?.title} />
            )}
            <S.StepTxtBlock>
              <S.StepTxtTitle>{step.value?.title}</S.StepTxtTitle>
              <S.StepTxtDesc
                dangerouslySetInnerHTML={{
                  __html: step.value?.description_mobile ?? "",
                }}
              ></S.StepTxtDesc>
            </S.StepTxtBlock>
            {index === 1 && (
              <img src={stepsArr[index]} alt={step.value?.title} />
            )}
          </S.Step>
        ))}
      </S.StepsWrapper>
    </S.Wrapper>
  );
};

export default StepsMobile;
