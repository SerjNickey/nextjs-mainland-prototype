import { useEffect, useRef, useState } from "react";
import * as S from "./SochiTimeline.styled";

export type TimelineItem = {
  date: string;
  title: string;
  description: string;
  /** left — слева от линии, right — справа. Чередование по макету. */
  side: "left" | "right";
  /** Подсветить дату красным */
  highlightDate?: boolean;
};

interface SochiTimelineProps {
  items?: TimelineItem[];
}

const SochiTimeline = ({ items }: SochiTimelineProps) => {
  const list = items ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const updateActiveFromScroll = () => {
      const refs = stepRefs.current;
      const count = refs.length;
      if (count === 0) return;

      const viewportCenter = window.innerHeight / 2;
      let bestIndex = 0;
      let bestDistance = Infinity;

      for (let i = 0; i < count; i++) {
        const el = refs[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const stepCenter = rect.top + rect.height / 2;
        const distance = Math.abs(stepCenter - viewportCenter);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = i;
        }
      }

      setActiveIndex((prev) => (prev !== bestIndex ? bestIndex : prev));
      rafId.current = null;
    };

    const onScroll = () => {
      if (rafId.current != null) return;
      rafId.current = requestAnimationFrame(updateActiveFromScroll);
    };

    const runOnce = () => {
      rafId.current = requestAnimationFrame(updateActiveFromScroll);
    };

    runOnce();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    };
  }, [list.length]);

  if (list.length === 0) return null;

  return (
    <S.Wrapper>
      <S.Timeline>
        <S.VerticalLine aria-hidden />
        {list.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <S.Step
              key={`${item.date}-${index}`}
              ref={(el) => {
                stepRefs.current[index] = el;
              }}
              data-step-index={index}
              $side={item.side}
            >
              <S.VerticalLineSegment $isActive={isActive} aria-hidden />
              <S.Card $isActive={isActive} $side={item.side}>
                <S.Date $highlight={isActive} $isActive={isActive}>
                  {item.date}
                </S.Date>
                <S.StepTitle $isActive={isActive}>{item.title}</S.StepTitle>
                <S.StepDescription
                  $isActive={isActive}
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </S.Card>
            </S.Step>
          );
        })}
      </S.Timeline>
    </S.Wrapper>
  );
};

export default SochiTimeline;
