import React from "react";
import { Link } from "react-router-dom";
import { preloadRoute } from "../../../../preloadRoutes";
import type { MainMenuTab } from "../../types";
import {
  isInternalAppLink,
  isTabCurrentByRoute,
  urlToInternalPath,
} from "../../../../shared/mainMenu";
import * as S from "./FallbackTab.styled";

export interface FallbackTabProps {
  tab: MainMenuTab;
  pathname: string;
  navigatingTo: string | null;
  onNavigate: (to: string) => void;
}

export function FallbackTab({
  tab,
  pathname,
  navigatingTo,
  onNavigate,
}: FallbackTabProps) {
  const href = tab.href ?? "#";
  const internal = isInternalAppLink(href);
  const to = internal ? urlToInternalPath(href) : href;
  const isCurrent = internal && isTabCurrentByRoute(to, pathname);
  const handleClick = internal
    ? (e: React.MouseEvent) => {
        e.preventDefault();
        onNavigate(to);
      }
    : undefined;

  return (
    <S.TabButton
      as={internal ? Link : "a"}
      {...(internal ? { to, onClick: handleClick } : { href })}
      onMouseEnter={() => internal && preloadRoute(to)}
      onMouseDown={() => internal && preloadRoute(to)}
      $current={isCurrent}
      $navigating={internal && navigatingTo === to}
    >
      {tab.iconUrl && (
        <S.IconWrap>
          <img src={tab.iconUrl} alt="" width={22} height={22} />
        </S.IconWrap>
      )}
      {tab.label}
    </S.TabButton>
  );
}
