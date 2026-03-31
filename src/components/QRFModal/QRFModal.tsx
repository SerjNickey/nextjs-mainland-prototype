import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { useGetFormTokenQuery } from "../../store/registrationApi";
import {
  setCurrentPage,
  setNicknameReg,
  setEmailReg,
} from "../../store/registrationSlice";
import {
  Overlay,
  AnimatedModalContainer,
  ModalHeader,
  ModalContent,
  DifButton,
  CloseButton,
  TitleContainer,
} from "./QRFModal.styled";
// import logo from "../../assets/images/Header/logo_pp_2x.webp";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const QRFModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const { yourLang } = useSelector((state: RootState) => state.registration);
  const lang = yourLang;
  const dispatch = useDispatch();
  const { refetch: refetchFormToken } = useGetFormTokenQuery();
  const { currentPage, isPageTransition } = useSelector(
    (state: RootState) => state.registration
  );

  // Блокировка прокрутки body при открытом модальном окне
  useEffect(() => {
    if (isOpen) {
      // Сохраняем текущее состояние прокрутки
      const scrollY = window.scrollY;
      const body = document.body;

      // Блокируем прокрутку
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.width = "100%";

      return () => {
        // Восстанавливаем прокрутку
        body.style.overflow = "";
        body.style.position = "";
        body.style.top = "";
        body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Альтернативный упрощенный вариант (если предыдущий вызывает проблемы):
  /*
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none"; // Для мобильных устройств
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);
  */

  // Закрытие по клавише Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFirstPage = () => {
    refetchFormToken();
    dispatch(setCurrentPage("First"));
    dispatch(setNicknameReg(""));
    dispatch(setEmailReg(""));
  };

  return (
    <Overlay onClick={onClose}>
      <AnimatedModalContainer
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {currentPage !== "Last" && (
          <ModalHeader isVisible={!isPageTransition}>
            {currentPage !== "Last" &&
              (currentPage === "First" ? (
                <DifButton
                  style={{ opacity: 0 }}
                  currentPage={currentPage}
                  yourLang={yourLang}
                />
              ) : (
                <DifButton onClick={handleFirstPage} yourLang={yourLang} />
              ))}

            {currentPage === "First" && (
              <TitleContainer>
                {lang === "ru" ? "РЕГИСТРАЦИЯ" : "REGISTRATION"}
              </TitleContainer>
            )}
            {currentPage === "Second" && (
              <TitleContainer>
                {lang === "ru" ? "Код подтверждения" : "Verification Code"}
              </TitleContainer>
            )}

            {currentPage !== "Last" && <CloseButton onClick={onClose} />}
          </ModalHeader>
        )}
        {isPageTransition && (
          <div
            style={{
              paddingTop: "35px",
              width: "140px",
              height: "140px",
              color: "#fff",
              textTransform: "uppercase",
              fontWeight: "700",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {lang === "ru" ? "Загрузка..." : "Loading..."}
          </div>
        )}
        {!isPageTransition && <ModalContent>{children}</ModalContent>}
      </AnimatedModalContainer>
    </Overlay>
  );
};

export default QRFModal;
