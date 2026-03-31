import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { useGetBasePageQuery } from "../../../store/basePageApi";
import {
  SuccessContainer,
  SuccessFirst,
  SuccessTitle,
  SuccessText,
  DownloadAppText,
} from "./LastPage.styled";
import doneLogo from "../../../assets/images/QRForm/done_2x.webp";
import GetAppButtonNew from "../../../components/GetAppButtonNew/GetAppButtonNew";

const LastPage = () => {
  const lang = "ru";
  const { yourLang } = useSelector((state: RootState) => state.registration);
  const { data: baseData } = useGetBasePageQuery(yourLang);
  const logoSrc =
    (baseData as { logo?: { file?: string } } | undefined)?.logo?.file ?? "";

  return (
    <SuccessContainer>
      {logoSrc ? (
        <img src={logoSrc} width={171} height={19} alt="Logo" />
      ) : (
        <span style={{ fontSize: 18, fontWeight: 700 }}>Poker Planets</span>
      )}
      <SuccessFirst>
        <img src={doneLogo.src} width={50} height={50} alt="" />
        <SuccessTitle>Письмо отправлено!</SuccessTitle>
        <SuccessText>
          На указанную электронную почту отправлена ссылка для сброса пароля.
          Проверьте почту — иногда письмо может попасть в «Спам».
        </SuccessText>
      </SuccessFirst>

      {/* <SuccessBanner>
        <LazyImage src={successLogo} alt="success logo" />
      </SuccessBanner> */}

      <DownloadAppText>
        Вы можете скачать приложение уже сейчас. Нажмите кнопку ниже «Скачать
        приложение».
      </DownloadAppText>

      <GetAppButtonNew
        fullWidth
        text={lang === "ru" ? "Скачать приложение" : "DOWNLOAD APP"}
      />
    </SuccessContainer>
  );
};

export default LastPage;
