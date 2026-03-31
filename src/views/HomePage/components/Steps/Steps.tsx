import { useMemo, useState } from "react";
import * as S from "./Steps.styled";

type StepItem = {
  step_number?: number;
  title?: string;
  description?: string;
};

type HomePageData = {
  steps_title?: string;
  steps?: Array<{
    value?: StepItem;
  }>;
} | null;

interface StepsProps {
  data?: HomePageData;
}

const Steps = ({ data }: StepsProps) => {
  const steps = useMemo(
    () =>
      (data?.steps ?? [])
        .map((step) => step.value)
        .filter(Boolean)
        .slice(0, 3) as StepItem[],
    [data]
  );
  const title = useMemo(
    () =>
      typeof data?.steps_title === "string" && data.steps_title.trim()
        ? data.steps_title
        : "",
    [data]
  );
  const [activeIndex, setActiveIndex] = useState(0);

  if (steps.length === 0) {
    return null;
  }

  return (
    <S.Wrapper>
      {title && <S.Title>{title}</S.Title>}
      <S.StepsRow>
        <S.Line>
          {steps.map((_, index) => (
            <S.LineSegment
              key={`step-line-${index}`}
              $isActive={index === activeIndex}
            />
          ))}
        </S.Line>
        {steps.map((step, index) => (
          <S.StepCard
            key={`${step.title ?? "step"}-${index}`}
            $isActive={index === activeIndex}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
          >
            <S.StepHeader>
              <S.StepNumber $isActive={index === activeIndex}>
                {step.step_number ?? index + 1}
              </S.StepNumber>
              <S.StepTitle $isActive={index === activeIndex}>
                {step.title}
              </S.StepTitle>
            </S.StepHeader>
            {step.description && (
              <S.StepBody>
                <S.StepDescription
                  $isActive={index === activeIndex}
                  dangerouslySetInnerHTML={{ __html: step.description }}
                />
              </S.StepBody>
            )}
          </S.StepCard>
        ))}
      </S.StepsRow>
    </S.Wrapper>
  );
};

export default Steps;
