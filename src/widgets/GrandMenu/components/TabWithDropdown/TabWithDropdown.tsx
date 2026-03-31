import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { preloadRoute } from "../../../../preloadRoutes";
import type { MainMenuTab, MoreSocialItem } from "../../../../shared/mainMenu";
import {
  getTabPath,
  getTabSectionPath,
  isMoreTab,
  isTabCurrentByRoute,
  MoreSocialBlock,
  normalizeSubmenu,
} from "../../../../shared/mainMenu";
import { isVisibleForCountry } from "../../../../shared/countryVisibility";
import { SubmenuContent } from "../SubmenuContent/SubmenuContent";
import * as S from "./TabWithDropdown.styled";

export interface TabWithDropdownProps {
  tab: MainMenuTab;
  pathname: string;
  isOpen: boolean;
  showPreview: boolean;
  countryCode: string;
  countryName: string;
  navigatingTo: string | null;
  communityItems: MoreSocialItem[];
  onDropdownEnter: (tabId: string) => void;
  onDropdownLeave: () => void;
  onNavigate: (path: string) => void;
  onCloseDropdown: () => void;
}

export function TabWithDropdown({
  tab,
  pathname,
  isOpen,
  showPreview,
  countryCode,
  countryName,
  navigatingTo,
  communityItems,
  onDropdownEnter,
  onDropdownLeave,
  onNavigate,
  onCloseDropdown,
}: TabWithDropdownProps) {
  const router = useRouter();
  const submenuGroups = normalizeSubmenu(tab.submenu);
  const tabSectionPath = getTabSectionPath(submenuGroups);
  const isMore = isMoreTab(tab);
  const isCurrent =
    !isMore &&
    ((tabSectionPath != null &&
      isTabCurrentByRoute(tabSectionPath, pathname)) ||
      submenuGroups.some((gr) =>
        gr.items.some(
          (it) =>
            "href" in it &&
            !(
              ("includedCountries" in it || "excludedCountries" in it) &&
              !isVisibleForCountry(
                "includedCountries" in it ? it.includedCountries : undefined,
                "excludedCountries" in it ? it.excludedCountries : undefined,
                countryCode,
                countryName
              )
            ) &&
            isTabCurrentByRoute(getTabPath(it.href), pathname)
        )
      ));
  const handleTabClick = (e: React.MouseEvent) => {
    if (tabSectionPath != null && !isMore) {
      e.preventDefault();
      onCloseDropdown();
      onNavigate(tabSectionPath);
    }
  };
  const isLinkTab = tabSectionPath != null && !isMore;

  return (
    <S.DropdownWrap
      onMouseEnter={() => onDropdownEnter(tab.id)}
      onMouseLeave={onDropdownLeave}
    >
      <S.TabButton
        $active={isOpen}
        $current={isCurrent}
        $navigating={isLinkTab && navigatingTo === tabSectionPath}
        as={isLinkTab ? Link : "button"}
        {...(isLinkTab
          ? {
              href: tabSectionPath!,
              onMouseEnter: () => preloadRoute(router, tabSectionPath!),
              onMouseDown: () => preloadRoute(router, tabSectionPath!),
              onClick: handleTabClick,
            }
          : { type: "button" })}
      >
        {tab.iconUrl && (
          <S.IconWrap>
            <img src={tab.iconUrl} alt="" width={22} height={22} />
          </S.IconWrap>
        )}
        {tab.label}
      </S.TabButton>
      <S.DropdownPanel
        $visible={isOpen}
        $align={tab.submenuAlign ?? (isMore ? "right" : "left")}
      >
        <SubmenuContent
          submenu={submenuGroups}
          showPreview={showPreview}
          pathname={pathname}
          countryCode={countryCode}
          countryName={countryName}
          excludeSocialSection={isMore}
        />
        {isMore && <MoreSocialBlock items={communityItems} />}
      </S.DropdownPanel>
    </S.DropdownWrap>
  );
}
