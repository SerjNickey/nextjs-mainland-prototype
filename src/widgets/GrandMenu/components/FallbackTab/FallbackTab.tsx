import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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
      {...(internal ? { href: to, onClick: handleClick } : { href })}
      onMouseEnter={() => internal && preloadRoute(router, to)}
      onMouseDown={() => internal && preloadRoute(router, to)}
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
