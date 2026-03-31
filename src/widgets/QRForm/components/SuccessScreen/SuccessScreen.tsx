import { useSelector } from "react-redux";
import type { RootState } from "../../../../store";
import { useGetBasePageQuery } from "../../../../store/basePageApi";
import {
  SuccessContainer,
  SuccessFirst,
  SuccessTitle,
  DownloadAppText,
} from "./SuccessScreen.styled";
import doneLogo from "../../../../assets/images/QRForm/done_2x.webp";
import GetAppButtonNew from "../../../../components/GetAppButtonNew/GetAppButtonNew";

const SuccessScreen = () => {
  const { yourLang } = useSelector((state: RootState) => state.registration);
  const lang = yourLang;
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
        <img src={doneLogo} width={50} height={50} />
        <SuccessTitle>
          {lang === "ru" ? "Успешно!" : "Registration was successful!"}
        </SuccessTitle>
      </SuccessFirst>

      <DownloadAppText>
        {lang === "ru"
          ? 'Нет загрузки? Нажмите кнопку ниже "Скачать приложение"'
          : "The app download will start automatically. If the download has not started, click the button below."}
      </DownloadAppText>

      <GetAppButtonNew
        fullWidth
        text={lang === "ru" ? "Скачать приложение" : "DOWNLOAD APP"}
      />
    </SuccessContainer>
  );
};

export default SuccessScreen;
