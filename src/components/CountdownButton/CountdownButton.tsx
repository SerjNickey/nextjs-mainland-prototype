import React, { useState, useEffect } from "react";
import { StyledButton } from "./CountdownButton.styled";

interface CountdownButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const CountdownButton: React.FC<CountdownButtonProps> = ({
  children,
  onClick,
  ...props
}) => {
  const [seconds, setSeconds] = useState<number>(59);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      setSeconds(59);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]);

  const handleClick = (): void => {
    setIsActive(true);
    if (onClick) {
      onClick();
    }
  };

  const formatTime = (secs: number): string => {
    return `00:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <StyledButton onClick={handleClick} disabled={isActive} {...props}>
      <span>{children}</span>
      {isActive && <span>{formatTime(seconds)}</span>}
    </StyledButton>
  );
};

export default CountdownButton;
