import React from "react";
import { Link } from "react-router-dom";
import { preloadRoute } from "../../../../preloadRoutes";
import type { MainMenuSubmenuItem } from "../../types";
import {
  getTabPath,
  isInternalAppLink,
  isTabCurrentByRoute,
  isVisibleByActive,
  urlToInternalPath,
} from "../../../../shared/mainMenu";
import * as S from "./SubmenuItemRender.styled";

export interface SubmenuItemRenderProps {
  item: MainMenuSubmenuItem;
  showPreview: boolean;
  pathname: string;
}

export function SubmenuItemRender({
  item,
  showPreview,
  pathname,
}: SubmenuItemRenderProps) {
  if (!isVisibleByActive(item.active, showPreview)) return null;

  switch (item.type) {
    case "link": {
      const href = item.href;
      const internal = isInternalAppLink(href);
      const isCurrent =
        internal && isTabCurrentByRoute(getTabPath(href), pathname);
      const path = urlToInternalPath(href);
      return internal ? (
        <S.DropdownLink
          key={item.id}
          as={
            Link as React.ComponentType<{
              to: string;
              children?: React.ReactNode;
            }>
          }
          to={path}
          onMouseEnter={() => preloadRoute(path)}
          $current={isCurrent}
        >
          {item.label}
        </S.DropdownLink>
      ) : (
        <S.DropdownLink key={item.id} href={href} $current={false}>
          {item.label}
        </S.DropdownLink>
      );
    }
    case "article": {
      const href = item.href;
      const internal = isInternalAppLink(href);
      const isCurrent =
        internal && isTabCurrentByRoute(getTabPath(href), pathname);
      const path = urlToInternalPath(href);
      return internal ? (
        <S.DropdownLink
          key={item.id}
          as={
            Link as React.ComponentType<{
              to: string;
              children?: React.ReactNode;
            }>
          }
          to={path}
          onMouseEnter={() => preloadRoute(path)}
          $current={isCurrent}
        >
          {item.title}
        </S.DropdownLink>
      ) : (
        <S.DropdownLink key={item.id} href={href} $current={false}>
          {item.title}
        </S.DropdownLink>
      );
    }
    case "languages_menu":
      return (
        <S.SocialRow key={item.id} style={{ padding: "8px 12px" }}>
          {item.languages.map((lang) => (
            <S.LangButton
              key={lang.code}
              type="button"
              title={lang.label}
              as="a"
              href="#"
              style={{ marginRight: 4 }}
            >
              {lang.flagUrl ? (
                <img src={lang.flagUrl} alt={lang.label} />
              ) : (
                lang.code.toUpperCase()
              )}
            </S.LangButton>
          ))}
        </S.SocialRow>
      );
    case "social_media":
      return (
        <S.SocialRow key={item.id}>
          {item.items.map((social) => (
            <S.SocialIconButton
              key={social.id}
              href={social.href}
              title={social.label}
            >
              {social.iconUrl ? (
                <img src={social.iconUrl} alt="" width={20} height={20} />
              ) : (
                social.label.charAt(0)
              )}
            </S.SocialIconButton>
          ))}
        </S.SocialRow>
      );
    default:
      return null;
  }
}
