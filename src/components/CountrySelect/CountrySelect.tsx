import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import {
  CountryInputSelectContainer,
  InputWrapper,
  StyledInput,
  ToggleButton,
  DropdownList,
  DropdownListPortal,
  DropdownItem,
  StyledError,
} from "./CountrySelect.styled";

const countriesRu = [
  { name: "Алжир", code: "6" },
  { name: "Аргентина", code: "13" },
  { name: "Азербайджан", code: "4" },
  { name: "Багамы", code: "17" },
  { name: "Бангладеш", code: "18" },
  { name: "Боливия", code: "27" },
  { name: "Ботсвана", code: "30" },
  { name: "Бразилия", code: "31" },
  { name: "Камбоджа", code: "84" },
  { name: "Камерун", code: "85" },
  { name: "Канада", code: "86" },
  { name: "Чили", code: "234" },
  { name: "Колумбия", code: "94" },
  { name: "Конго", code: "97" },
  { name: "ДР Конго", code: "96" },
  { name: "Коста-Рика", code: "100" },
  { name: "Доминиканская Республика", code: "66" },
  { name: "Эквадор", code: "239" },
  { name: "Египет", code: "67" },
  { name: "Сальвадор", code: "242" },
  { name: "Эфиопия", code: "245" },
  { name: "Гондурас", code: "55" },
  { name: "Индия", code: "72" },
  { name: "Индонезия", code: "73" },
  { name: "Ямайка", code: "250" },
  { name: "Казахстан", code: "83" },
  { name: "Кения", code: "88" },
  { name: "Киргизия", code: "90" },
  { name: "Ливия", code: "109" },
  { name: "Малайзия", code: "120" },
  { name: "Мексика", code: "128" },
  { name: "Молдова", code: "131" },
  { name: "Монголия", code: "133" },
  { name: "Марокко", code: "125" },
  { name: "Намибия", code: "136" },
  { name: "Никарагуа", code: "142" },
  { name: "Нигер", code: "139" },
  { name: "Нигерия", code: "140" },
  { name: "Пакистан", code: "157" },
  { name: "Панама", code: "160" },
  { name: "Папуа — Новая Гвинея", code: "162" },
  { name: "Парагвай", code: "163" },
  { name: "Перу", code: "164" },
  { name: "Филиппины", code: "222" },
  { name: "Россия", code: "171" },
  { name: "Самоа", code: "174" },
  { name: "Сенегал", code: "183" },
  { name: "Сомали", code: "198" },
  { name: "ЮАР", code: "246" },
  { name: "Южный Судан", code: "249" },
  { name: "Шри-Ланка", code: "238" },
  { name: "Судан", code: "199" },
  { name: "Таджикистан", code: "202" },
  { name: "Танзания", code: "205" },
  { name: "Того", code: "207" },
  { name: "Тунис", code: "212" },
  { name: "Туркменистан", code: "213" },
  { name: "Уганда", code: "215" },
  { name: "Уругвай", code: "219" },
  { name: "Узбекистан", code: "216" },
  { name: "Венесуэла", code: "39" },
  { name: "Вьетнам", code: "42" },
];

const countriesEn = [
  { name: "Algeria", code: "6" },
  { name: "Argentina", code: "13" },
  { name: "Azerbaijan", code: "4" },
  { name: "Bahamas", code: "17" },
  { name: "Bangladesh", code: "18" },
  { name: "Bolivia", code: "27" },
  { name: "Botswana", code: "30" },
  { name: "Brazil", code: "31" },
  { name: "Cambodia", code: "84" },
  { name: "Cameroon", code: "85" },
  { name: "Canada", code: "86" },
  { name: "Chile", code: "234" },
  { name: "Colombia", code: "94" },
  { name: "Congo", code: "97" },
  { name: "Congo DR", code: "96" },
  { name: "Costa Rica", code: "100" },
  { name: "Dominican Republic", code: "66" },
  { name: "Ecuador", code: "239" },
  { name: "Egypt", code: "67" },
  { name: "El Salvador", code: "242" },
  { name: "Ethiopia", code: "245" },
  { name: "Honduras", code: "55" },
  { name: "India", code: "72" },
  { name: "Indonesia", code: "73" },
  { name: "Jamaica", code: "250" },
  { name: "Kazakhstan", code: "83" },
  { name: "Kenya", code: "88" },
  { name: "Kyrgyzstan", code: "90" },
  { name: "Libyan", code: "109" },
  { name: "Malaysia", code: "120" },
  { name: "Mexico", code: "128" },
  { name: "Moldova", code: "131" },
  { name: "Mongolia", code: "133" },
  { name: "Morocco", code: "125" },
  { name: "Namibia", code: "136" },
  { name: "Nicaragua", code: "142" },
  { name: "Niger", code: "139" },
  { name: "Nigeria", code: "140" },
  { name: "Pakistan", code: "157" },
  { name: "Panama", code: "160" },
  { name: "Papua New Guinea", code: "162" },
  { name: "Paraguay", code: "163" },
  { name: "Peru", code: "164" },
  { name: "Philippines", code: "222" },
  { name: "Russia", code: "171" },
  { name: "Samoa", code: "174" },
  { name: "Senegal", code: "183" },
  { name: "Somalia", code: "198" },
  { name: "South Africa", code: "246" },
  { name: "South Sudan", code: "249" },
  { name: "Sri Lanka", code: "238" },
  { name: "Sudan", code: "199" },
  { name: "Tajikistan", code: "202" },
  { name: "Tanzania", code: "205" },
  { name: "Togo", code: "207" },
  { name: "Tunisia", code: "212" },
  { name: "Turkmenistan", code: "213" },
  { name: "Uganda", code: "215" },
  { name: "Uruguay", code: "219" },
  { name: "Uzbekistan", code: "216" },
  { name: "Venezuela", code: "39" },
  { name: "Vietnam", code: "42" },
];

export interface CountrySelectProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  selectedCountryCode: string;
  setSelectedCountryCode: (value: string) => void;
  errorEnabled?: boolean;
  errorText?: string;
  errorHandler?: (error: string) => void;
  /** true = Portal в document.body (для модалки, не обрезается). false = inline (для страницы, без скачков при скролле). */
  usePortal?: boolean;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  inputValue,
  setInputValue,
  selectedCountryCode,
  setSelectedCountryCode,
  errorEnabled = false,
  errorText = "",
  errorHandler,
  usePortal = true,
}) => {
  const { yourLang } = useSelector((state: RootState) => state.registration);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getCountriesArray = () =>
    yourLang === "ru" ? countriesRu : countriesEn;

  const [filteredCountries, setFilteredCountries] =
    useState(getCountriesArray());
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const findCountryByName = (name: string) => {
    return getCountriesArray().find(
      (country) => country.name.toLowerCase() === name.toLowerCase().trim()
    );
  };

  const autoSelectIndiaIfNoMatch = () => {
    if (inputValue.trim() && !selectedCountryCode) {
      const exactMatch = findCountryByName(inputValue);
      if (exactMatch) {
        handleCountrySelect(exactMatch);
      } else {
        const indiaCountry = getCountriesArray().find(
          (country) => country.name === "India" || country.name === "Индия"
        );
        if (indiaCountry) {
          handleCountrySelect(indiaCountry);
        }
      }
    }
  };

  const filterCountries = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredCountries(getCountriesArray());
      return;
    }
    const filtered = getCountriesArray().filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setSelectedCountryCode("");
    filterCountries(value);
    setIsDropdownOpen(true);
    if (errorHandler) errorHandler("");
  };

  const handleCountrySelect = (country: { code: string; name: string }) => {
    setInputValue(country.name);
    setSelectedCountryCode(country.code);
    setIsDropdownOpen(false);
    if (errorHandler) errorHandler("");
  };

  const toggleDropdown = () => {
    const willOpen = !isDropdownOpen;
    setIsDropdownOpen(willOpen);
    if (willOpen) setFilteredCountries(getCountriesArray());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (isDropdownOpen && filteredCountries.length > 0) {
        handleCountrySelect(filteredCountries[0]);
        return;
      }
      autoSelectIndiaIfNoMatch();
      setIsDropdownOpen(false);
    } else if (e.key === "Escape") {
      setIsDropdownOpen(false);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!isDropdownOpen) autoSelectIndiaIfNoMatch();
    }, 200);
  };

  const updateDropdownPosition = () => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom,
        left: rect.left,
        width: rect.width,
      });
    }
  };

  const rafRef = useRef<number | null>(null);
  const throttledUpdatePosition = () => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      updateDropdownPosition();
    });
  };

  useLayoutEffect(() => {
    if (usePortal && isDropdownOpen && wrapperRef.current) {
      updateDropdownPosition();
      window.addEventListener("scroll", throttledUpdatePosition, true);
      window.addEventListener("resize", updateDropdownPosition);
      return () => {
        window.removeEventListener("scroll", throttledUpdatePosition, true);
        window.removeEventListener("resize", updateDropdownPosition);
        if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      };
    }
  }, [usePortal, isDropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        autoSelectIndiaIfNoMatch();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen, inputValue, selectedCountryCode]);

  const placeholderText = yourLang === "ru" ? "Страна" : "Country";
  const hasValue = inputValue !== "";
  const hasError = errorEnabled && errorText !== "";

  return (
    <CountryInputSelectContainer>
      <InputWrapper
        ref={wrapperRef}
        data-placeholder={placeholderText}
        data-has-value={hasValue}
        data-error={hasError}
      >
        <StyledInput
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={() => {
            setIsDropdownOpen(true);
            setFilteredCountries(getCountriesArray());
          }}
          placeholder={hasValue ? "" : placeholderText}
          isError={hasError}
          hasValue={hasValue}
        />
        <ToggleButton
          onClick={toggleDropdown}
          isOpened={isDropdownOpen}
          hasValue={selectedCountryCode}
          type="button"
        />
        {isDropdownOpen &&
          filteredCountries.length > 0 &&
          (usePortal ? (
            dropdownPosition.width > 0 &&
            createPortal(
              <DropdownListPortal
                ref={dropdownRef}
                $top={dropdownPosition.top}
                $left={dropdownPosition.left}
                $width={dropdownPosition.width}
              >
                {filteredCountries.map((country) => (
                  <DropdownItem
                    key={country.code}
                    onClick={() => handleCountrySelect(country)}
                    onTouchStart={(e) => e.stopPropagation()}
                  >
                    {country.name}
                  </DropdownItem>
                ))}
              </DropdownListPortal>,
              document.body
            )
          ) : (
            <DropdownList ref={dropdownRef}>
              {filteredCountries.map((country) => (
                <DropdownItem
                  key={country.code}
                  onClick={() => handleCountrySelect(country)}
                  onTouchStart={(e) => e.stopPropagation()}
                >
                  {country.name}
                </DropdownItem>
              ))}
            </DropdownList>
          ))}
      </InputWrapper>
      {hasError && <StyledError>{errorText}</StyledError>}
    </CountryInputSelectContainer>
  );
};

export default CountrySelect;
