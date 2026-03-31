import { useSelector } from "react-redux";
import { useGetBasePageQuery } from "../../store/basePageApi";
import type { RootState } from "../../store";
import { Container } from "./Footer.styled";

const Footer = () => {
  const { yourLang } = useSelector((state: RootState) => state.registration);
  const { data } = useGetBasePageQuery(yourLang);
  const legalHtml = data?.footer_additional_legal_text;

  return (
    <Container>
      {legalHtml && <div dangerouslySetInnerHTML={{ __html: legalHtml }} />}
    </Container>
  );
};

export default Footer;
