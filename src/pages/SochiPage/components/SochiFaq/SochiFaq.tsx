import { useState } from "react";
import * as S from "./SochiFaq.styled";

export type FaqItem = {
  id: string;
  question: string;
  answer: string | string[];
};

interface SochiFaqProps {
  items?: FaqItem[];
}

const SochiFaq = ({ items }: SochiFaqProps) => {
  const list = items ?? [];
  const [openId, setOpenId] = useState<string | null>(null);

  if (list.length === 0) return null;

  const renderAnswer = (item: FaqItem) => {
    if (typeof item.answer === "string") {
      return (
        <S.AnswerInner dangerouslySetInnerHTML={{ __html: item.answer }} />
      );
    }
    const text = item.answer;
    return (
      <S.AnswerInner>
        {text.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </S.AnswerInner>
    );
  };

  return (
    <S.Wrapper>
      <S.List>
        {list.map((item) => {
          const isOpen = openId === item.id;
          return (
            <S.Item key={item.id} $open={isOpen}>
              <S.Question
                $open={isOpen}
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
                id={`faq-question-${item.id}`}
              >
                {item.question}
                <S.Toggle $open={isOpen} aria-hidden />
              </S.Question>
              <S.Answer
                $open={isOpen}
                id={`faq-answer-${item.id}`}
                role="region"
                aria-labelledby={`faq-question-${item.id}`}
              >
                {renderAnswer(item)}
              </S.Answer>
            </S.Item>
          );
        })}
      </S.List>
    </S.Wrapper>
  );
};

export default SochiFaq;
