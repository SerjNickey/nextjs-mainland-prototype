import * as S from "./SochiHero.styled";

const DEFAULT_TITLE =
  "IMPORTANT INFORMATION AND LATEST NEWS FOR POKERSTARS SOCHI PLAYERS";

const DEFAULT_INTRO = [
  "The PokerStars Sochi license has expired. We have transferred your data and balances to PokerPlanets so you can continue to play without losing access to your account.",
  "Below you will find the key dates and answers to the most frequently asked questions.",
];

interface SochiHeroProps {
  /** Заголовок из API (sochiPageApi) */
  title?: string;
  /** Вступительный текст из API — строка или массив абзацев */
  intro?: string | string[];
}

const SochiHero = ({ title, intro }: SochiHeroProps) => {
  const displayTitle = title?.trim() || DEFAULT_TITLE;
  const introArr =
    intro == null
      ? DEFAULT_INTRO
      : Array.isArray(intro)
        ? intro.filter((s) => typeof s === "string")
        : [intro];

  return (
    <S.Wrapper>
      <S.Title>{displayTitle}</S.Title>
      <S.Intro>
        {introArr.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </S.Intro>
    </S.Wrapper>
  );
};

export default SochiHero;
