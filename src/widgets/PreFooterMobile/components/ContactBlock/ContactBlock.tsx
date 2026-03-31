import * as S from "./ContactBlock.styled";

type ContactBlockProps = {
  title?: string;
  link?: string;
};

const ContactBlock = ({ title, link }: ContactBlockProps) => {
  if (!title && !link) return null;

  return (
    <S.Block>
      {title && <S.BlockTitle>{title}</S.BlockTitle>}
      <S.ContactSubtitle>Need help? Contact us at:</S.ContactSubtitle>
      {link && <S.ContactLink href={`mailto:${link}`}>{link}</S.ContactLink>}
    </S.Block>
  );
};

export default ContactBlock;
