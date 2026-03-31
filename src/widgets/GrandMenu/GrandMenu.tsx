import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetBasePageQuery } from "../../store/basePageApi";
import type { RootState } from "../../store";
import type { BaseMenuItem, MainMenuTab } from "./types";
import * as S from "./GrandMenu.styled";
import LangSwitcher from "../../components/LangSwitcher/LangSwitcher";
import RegistrationForm from "../../widgets/RegistrationForm/RegistrationForm";
import { preloadAllRoutes } from "../../preloadRoutes";
import {
  getCommunityItemsFromBase,
  hasSubmenu,
  isMoreTab,
  isVisibleByActive,
  isVisibleByCountry,
  mapBaseMenuToTabs,
} from "../../shared/mainMenu";
import { isVisibleForCountry } from "../../shared/countryVisibility";
import { FallbackTab, TabButton, TabWithDropdown } from "./components";

export interface GrandMenuProps {
  showPreview?: boolean;
}

const GrandMenu = ({ showPreview = false }: GrandMenuProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const yourLang = useSelector(
    (s: RootState) => s.registration?.yourLang ?? "en"
  );
  const { data: baseData } = useGetBasePageQuery(yourLang);
  const countryCodeReg = useSelector(
    (s: RootState) => s.registration?.countryCodeReg ?? ""
  );
  const countryNameReg = useSelector(
    (s: RootState) => s.registration?.countryReg ?? ""
  );
  const countryCode = baseData?.user_country?.code ?? countryCodeReg;
  const countryName = baseData?.user_country?.name ?? countryNameReg;

  const communityItems = React.useMemo(
    () => getCommunityItemsFromBase(baseData, countryCode, countryName),
    [baseData, countryCode, countryName]
  );

  const [openId, setOpenId] = useState<string | null>(null);
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const baseMenu = (baseData as { menu?: BaseMenuItem[] } | undefined)?.menu;
  const tabs: MainMenuTab[] =
    baseMenu && baseMenu.length > 0 ? mapBaseMenuToTabs(baseMenu) : [];

  const visibleTabs = tabs.filter(
    (tab) =>
      isVisibleByActive(tab.active, showPreview) &&
      isVisibleByCountry(tab.countries, countryCode, countryName) &&
      isVisibleForCountry(
        tab.includedCountries,
        tab.excludedCountries,
        countryCode,
        countryName
      )
  );

  const handleDropdownEnter = (tabId: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenId(tabId);
  };

  const handleDropdownLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setOpenId(null);
      closeTimerRef.current = null;
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    setNavigatingTo(null);
  }, [pathname]);

  useEffect(() => {
    const t = setTimeout(preloadAllRoutes, 2000);
    return () => clearTimeout(t);
  }, []);

  const handleNavigate = (to: string) => {
    setNavigatingTo(to);
    navigate(to);
  };

  return (
    <S.Wrapper>
      <S.NavInner>
        {visibleTabs.map((tab) => {
          if (tab.type === "button") {
            return (
              <TabButton
                key={tab.id}
                tab={tab}
                pathname={pathname}
                navigatingTo={navigatingTo}
                onNavigate={handleNavigate}
              />
            );
          }
          /* More: попап по hover даже при пустом submenu / пустых communities */
          if (hasSubmenu(tab) || isMoreTab(tab)) {
            return (
              <TabWithDropdown
                key={tab.id}
                tab={tab}
                pathname={pathname}
                isOpen={openId === tab.id}
                showPreview={showPreview}
                countryCode={countryCode}
                countryName={countryName}
                navigatingTo={navigatingTo}
                communityItems={communityItems}
                onDropdownEnter={handleDropdownEnter}
                onDropdownLeave={handleDropdownLeave}
                onNavigate={handleNavigate}
                onCloseDropdown={() => setOpenId(null)}
              />
            );
          }
          return (
            <FallbackTab
              key={tab.id}
              tab={tab}
              pathname={pathname}
              navigatingTo={navigatingTo}
              onNavigate={handleNavigate}
            />
          );
        })}

        <RegistrationForm
          btnText={yourLang === "ru" ? "Скачать и играть" : "Download app"}
        />
        <LangSwitcher />
      </S.NavInner>
    </S.Wrapper>
  );
};

export default GrandMenu;
