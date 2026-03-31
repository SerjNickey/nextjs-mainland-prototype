import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { setYourLang } from "../../store/registrationSlice";
import { getCookieConsent, setCookieLang } from "../../utils/cookies";
import i18n from "../../i18n";
import {
  LanguageContainer,
  Popup,
  LanguageIconWrapper,
  CurrentLanguage,
} from "./LangSwitcher.styled";
import RuIcon from "../../assets/images/LangSwitcher/ru_1x.webp";
import EnIcon from "../../assets/images/LangSwitcher/en_1x.webp";

// Типы для TypeScript
type LanguageCode = "ru" | "en"; // Добавьте другие коды языков по необходимости

interface Language {
  code: LanguageCode;
  name: string;
  icon: string;
}

const LangSwitcher: React.FC = () => {
  const dispatch = useDispatch();
  const { yourLang: currentLanguage } = useSelector(
    (state: RootState) => state.registration
  );

  //   const [currentLanguage, setCurrentLanguage] =
  //     useState<LanguageCode>(yourLang);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const languages: Language[] = [
    { code: "ru", name: "Russian", icon: RuIcon.src },
    { code: "en", name: "English", icon: EnIcon.src },
  ];

  // Закрытие попапа при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (newLang: LanguageCode): void => {
    dispatch(setYourLang(newLang));
    if (getCookieConsent()) setCookieLang(newLang);
    i18n.changeLanguage(newLang);
    setShowPopup(false);
  };

  const handleTogglePopup = (): void => {
    setShowPopup(!showPopup);
  };

  const currentLangObj: Language | undefined = languages.find(
    (lang) => lang.code === currentLanguage
  );
  const availableLanguages: Language[] = languages.filter(
    (lang) => lang.code !== currentLanguage
  );

  return (
    <LanguageContainer ref={containerRef}>
      <CurrentLanguage onClick={handleTogglePopup}>
        {/* {currentLangObj?.icon} */}
        <img src={currentLangObj?.icon} />
      </CurrentLanguage>

      {showPopup && availableLanguages.length > 0 && (
        <Popup ref={popupRef}>
          {availableLanguages.map((lang) => (
            <LanguageIconWrapper
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              title={lang.name}
            >
              <img src={lang.icon} /> {lang.name}
            </LanguageIconWrapper>
          ))}
        </Popup>
      )}
    </LanguageContainer>
  );
};

export default LangSwitcher;
