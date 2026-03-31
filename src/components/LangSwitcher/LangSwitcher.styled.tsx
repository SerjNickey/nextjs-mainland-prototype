import styled from "styled-components";

// Иконки языков
export const LanguageIcon = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 2px;
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

export const LanguageContainer = styled.div`
  width: 44px;
  height: 44px;
  border: 1px solid #84858a;
  border-radius: 6px;
  position: relative;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #2d2e33;
`;

export const Popup = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  padding: 12px;
  background: #2d2e33;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: flex;
  gap: 12px;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const LanguageIconWrapper = styled.div`
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
  display: flex;
  flex-direction: row;
  gap: 10px;
  cursor: pointer;
  color: #ffffff;
`;

export const CurrentLanguage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;

  //   &:hover {
  //     background-color: rgba(27, 27, 27, 0.7);
  //   }
`;
