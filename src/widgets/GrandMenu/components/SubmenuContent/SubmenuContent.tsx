import type { MainMenuSubmenuGroup } from "../../types";
import { isVisibleForCountry } from "../../../../shared/countryVisibility";
import { SubmenuItemRender } from "../SubmenuItemRender/SubmenuItemRender";
import * as S from "./SubmenuContent.styled";

export interface SubmenuContentProps {
  submenu: MainMenuSubmenuGroup[];
  showPreview: boolean;
  pathname: string;
  countryCode: string;
  countryName: string;
  excludeSocialSection?: boolean;
}

export function SubmenuContent({
  submenu,
  showPreview,
  pathname,
  countryCode,
  countryName,
  excludeSocialSection = false,
}: SubmenuContentProps) {
  const groupsToRender = excludeSocialSection
    ? submenu.filter(
        (group) => !group.items.every((item) => item.type === "social_media")
      )
    : submenu;

  return (
    <>
      {groupsToRender.map((group, idx) => (
        <S.DropdownSection key={group.title ?? idx}>
          {group.title && (
            <S.DropdownSectionTitle>{group.title}</S.DropdownSectionTitle>
          )}
          {group.items
            .filter(
              (item) => !excludeSocialSection || item.type !== "social_media"
            )
            .filter((item) => {
              if (!("includedCountries" in item || "excludedCountries" in item)) {
                return true;
              }
              return isVisibleForCountry(
                "includedCountries" in item ? item.includedCountries : undefined,
                "excludedCountries" in item ? item.excludedCountries : undefined,
                countryCode,
                countryName
              );
            })
            .map((item) => (
              <SubmenuItemRender
                key={item.id}
                item={item}
                showPreview={showPreview}
                pathname={pathname}
              />
            ))}
        </S.DropdownSection>
      ))}
    </>
  );
}
