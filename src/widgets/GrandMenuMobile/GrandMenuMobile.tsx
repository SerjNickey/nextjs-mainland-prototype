/**
 * Мобильное меню: данные и утилиты только из `shared/mainMenu`, без импортов из GrandMenu.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import type { RootState } from "../../store";
import { useGetBasePageQuery } from "../../store/basePageApi";
import type { BaseMenuItem } from "../../shared/mainMenu/types";
import {
  getCommunityItemsFromBase,
  getTabSectionPath,
  hasSubmenu,
  isInternalAppLink,
  isMoreTab,
  isTabCurrentByRoute,
  isVisibleByActive,
  isVisibleByCountry,
  mapBaseMenuToTabs,
  MoreSocialBlock,
  normalizeSubmenu,
  urlToInternalPath,
} from "../../shared/mainMenu";
import { isVisibleForCountry } from "../../shared/countryVisibility";
import LangSwitcher from "../../components/LangSwitcher/LangSwitcher";
import { useVisualViewportBottomGap } from "../../hooks/useVisualViewportBottomGap";
import { isIosClient } from "../../utils/getOs";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import * as S from "./GrandMenuMobile.styled";

type GrandMenuMobileProps = {
  hidden?: boolean;
};

const GrandMenuMobile = ({ hidden = false }: GrandMenuMobileProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const wrapperRef = useRef<HTMLElement>(null);
  useVisualViewportBottomGap(wrapperRef);
  /** iOS: без псевдоэлемента ::before у Wrapper; тестовый оранжевый фон у DownloadWrap. */
  const [isIos, setIsIos] = useState(() =>
    typeof window !== "undefined" ? isIosClient() : false
  );
  useEffect(() => {
    setIsIos(isIosClient());
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const yourLang = useSelector(
    (s: RootState) => s.registration?.yourLang ?? "en"
  );
  const countryCodeReg = useSelector(
    (s: RootState) => s.registration?.countryCodeReg ?? ""
  );
  const countryNameReg = useSelector(
    (s: RootState) => s.registration?.countryReg ?? ""
  );
  const { data: baseData } = useGetBasePageQuery(yourLang);
  const countryCode = baseData?.user_country?.code ?? countryCodeReg;
  const countryName = baseData?.user_country?.name ?? countryNameReg;

  const tabs = useMemo(() => {
    const baseMenu = (baseData as { menu?: BaseMenuItem[] } | undefined)?.menu;
    if (!baseMenu || baseMenu.length === 0) return [];
    return mapBaseMenuToTabs(baseMenu)
      .filter(
        (tab) =>
          isVisibleByActive(tab.active, false) &&
          isVisibleByCountry(tab.countries, countryCode, countryName) &&
          isVisibleForCountry(
            tab.includedCountries,
            tab.excludedCountries,
            countryCode,
            countryName
          )
      )
      .filter((tab) => {
        /** More только при непустом подменю (communities не учитываем) */
        if (!isMoreTab(tab)) return true;
        return hasSubmenu(tab);
      });
  }, [baseData, countryCode, countryName]);

  const communityItems = useMemo(
    () => getCommunityItemsFromBase(baseData, countryCode, countryName),
    [baseData, countryCode, countryName]
  );

  const handleItemClick = (href?: string) => {
    if (!href) return;
    setIsOpen(false);
    if (isInternalAppLink(href)) {
      navigate(urlToInternalPath(href));
      return;
    }
    window.open(href, "_self");
  };
  const handleMainItemClick = (
    tabId: string,
    href?: string,
    hasNested?: boolean
  ) => {
    if (hasNested) {
      setExpandedId((prev) => (prev === tabId ? null : tabId));
      return;
    }
    handleItemClick(href);
  };
  const isTabActive = (tab: (typeof tabs)[number], nested: boolean) => {
    if (nested) {
      const sectionPath = getTabSectionPath(normalizeSubmenu(tab.submenu));
      return sectionPath ? isTabCurrentByRoute(sectionPath, pathname) : false;
    }
    if (!tab.href || !isInternalAppLink(tab.href)) return false;
    return isTabCurrentByRoute(urlToInternalPath(tab.href), pathname);
  };

  useEffect(() => {
    setExpandedId(null);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.paddingRight = prevBodyPaddingRight;
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <S.PageOverlay
          role="presentation"
          onClick={() => setIsOpen(false)}
          aria-hidden
        />
      )}
      <S.Wrapper
        ref={wrapperRef}
        aria-label="Grand menu mobile"
        $hidden={hidden}
        $isIos={isIos}
      >
        {isOpen && (
          <S.Popover>
            {tabs.map((tab) => {
              const nested = hasSubmenu(tab);
              const open = expandedId === tab.id;
              return (
                <div key={tab.id}>
                  <S.MainItemButton
                    type="button"
                    $active={isTabActive(tab, nested)}
                    onClick={() =>
                      handleMainItemClick(tab.id, tab.href, nested)
                    }
                  >
                    {tab.label}
                    {nested && <S.Chevron $open={open} />}
                  </S.MainItemButton>
                  {nested &&
                    open &&
                    normalizeSubmenu(tab.submenu).map((group, idx) => (
                      <div key={`${tab.id}-group-${idx}`}>
                        {group.title ? (
                          <S.SubmenuGroupTitle>
                            {group.title}
                          </S.SubmenuGroupTitle>
                        ) : null}
                        {group.items.map((item) => {
                          if (!("href" in item)) return null;
                          if (
                            ("includedCountries" in item ||
                              "excludedCountries" in item) &&
                            !isVisibleForCountry(
                              "includedCountries" in item
                                ? item.includedCountries
                                : undefined,
                              "excludedCountries" in item
                                ? item.excludedCountries
                                : undefined,
                              countryCode,
                              countryName
                            )
                          ) {
                            return null;
                          }
                          return (
                            <S.SubmenuItem
                              key={`${tab.id}-${item.id}`}
                              type="button"
                              onClick={() => handleItemClick(item.href)}
                            >
                              {"label" in item ? item.label : item.title}
                            </S.SubmenuItem>
                          );
                        })}
                      </div>
                    ))}
                </div>
              );
            })}
            <S.BottomBlock>
              <MoreSocialBlock items={communityItems} />
              <S.LangWrap>
                <LangSwitcher />
              </S.LangWrap>
            </S.BottomBlock>
          </S.Popover>
        )}
        <S.Row>
          <S.MenuButton
            type="button"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            $open={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? (
              <S.CloseIcon aria-hidden />
            ) : (
              <S.BurgerIcon aria-hidden />
            )}
            <S.MenuText $open={isOpen}>Menu</S.MenuText>
          </S.MenuButton>
          <S.DownloadWrap $iosTestOrange={isIos}>
            <RegistrationForm
              btnText={yourLang === "ru" ? "Скачать и играть" : "Download app"}
            />
          </S.DownloadWrap>
        </S.Row>
      </S.Wrapper>
    </>
  );
};

export default GrandMenuMobile;
