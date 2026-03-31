import React from "react";
import Lottie from "lottie-react";
import { LoaderOverlay, StyledLoader, LottieWrap } from "./Loader.styled";
import defaultAnimation from "../../assets/animations/loader.json";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface LoaderProps {
  /** Текст под анимацией (например "Загрузка...") */
  text?: string;
  /** Lottie JSON: объект анимации. Если не передан — используется встроенная анимация. */
  animationData?: object;
  /** Ширина/высота Lottie в пикселях */
  size?: number;
  /** Показывать ли лоадер. false — скрыть через CSS, не размонтировать (анимация идёт плавно). По умолчанию true. */
  visible?: boolean;
}

const lottieStyle = { width: "100%", height: "100%" } as const;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Loader: React.FC<LoaderProps> = ({
  text,
  animationData,
  size = 120,
  visible = true,
}) => {
  const data = animationData ?? defaultAnimation;

  return (
    <LoaderOverlay $visible={visible} aria-hidden={!visible}>
      <StyledLoader>
        <LottieWrap $size={size}>
          <Lottie
            animationData={data}
            loop
            style={lottieStyle}
            rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
          />
        </LottieWrap>
        {text != null && text !== "" && <span>{text}</span>}
      </StyledLoader>
    </LoaderOverlay>
  );
};

export default React.memo(Loader);
