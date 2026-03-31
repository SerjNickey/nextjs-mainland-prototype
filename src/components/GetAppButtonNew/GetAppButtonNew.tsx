import { useDispatch } from "react-redux";
import {
  setQRFModalIsOpen,
  setSendPasswordModalIsOpen,
  setSendPasswordPage,
  setEmailForPassword,
} from "../../store/registrationSlice";
import { ShinyButton, TextRef } from "./GetAppButtonNew.styled";

interface IGetAppButtonNew {
  text: string;
  linkStr?: string;
  textMode?: boolean;
  fullWidth?: boolean;
}

export const getOS = (): string => {
  const userAgent = navigator.userAgent;

  if (
    /iPad|iPhone|iPod/.test(userAgent) &&
    !("MSStream" in window ? window.MSStream : false)
  ) {
    return "ios";
  }
  if (/android/i.test(userAgent)) {
    return "android";
  }
  if (/win/i.test(userAgent)) {
    return "windows";
  }
  if (/mac/i.test(userAgent)) {
    return "mac";
  }
  return "unknown";
};

export const getDownloadLink = (): string => {
  const os = getOS();

  switch (os) {
    case "windows":
      return "https://download.getpp.app/";
    case "mac":
      return "https://download.getpp.app/";
    case "android":
      return "https://download.getpp.app/";
    case "ios":
      return "Not Supported";
    default:
      return "Not Supported";
  }
};

const GetAppButtonNew: React.FC<IGetAppButtonNew> = ({
  text,
  linkStr,
  textMode,
  fullWidth,
}) => {
  const dispatch = useDispatch();

  const downloadLink = linkStr ? linkStr : getDownloadLink();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const link = linkStr ?? getDownloadLink();
    if (link !== "Not Supported") {
      window.open(link, "_self");
    }
    setTimeout(() => {
      dispatch(setQRFModalIsOpen(false));
      dispatch(setSendPasswordModalIsOpen(false));
      dispatch(setSendPasswordPage("First"));
      dispatch(setEmailForPassword(""));
    }, 1000);
  };

  return (
    <>
      {downloadLink !== "Not Supported" &&
        (textMode ? (
          <TextRef as="button" type="button" onClick={handleClick}>
            {text}
          </TextRef>
        ) : (
          <ShinyButton
            as="button"
            type="button"
            fullWidth={fullWidth}
            onClick={handleClick}
          >
            {text}
          </ShinyButton>
        ))}
    </>
  );
};

export default GetAppButtonNew;
