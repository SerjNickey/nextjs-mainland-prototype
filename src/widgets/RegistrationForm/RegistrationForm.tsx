import { useDispatch } from "react-redux";
import { setQRFModalIsOpen } from "../../store/registrationSlice";
import { getDownloadLink } from "../../components/GetAppButtonNew/GetAppButtonNew";
import { ShinyButton } from "./RegistrationForm.styled";

interface IRegistrationForm {
  btnText: string;
}

const RegistrationForm: React.FC<IRegistrationForm> = ({ btnText }) => {
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const link = getDownloadLink();
    if (link !== "Not Supported") {
      window.open(link, "_self");
    }
    dispatch(setQRFModalIsOpen(true));
  };

  return (
    <ShinyButton as="button" type="button" onClick={handleClick}>
      {btnText}
    </ShinyButton>
  );
};

export default RegistrationForm;
