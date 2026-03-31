import * as S from "./LegalBlock.styled";
import type { LegalImageItem } from "../../types";
import { getImageUrl } from "./helpers";

type LegalBlockProps = {
  legalText?: string;
  legalImages: LegalImageItem[];
};

const LegalBlock = ({ legalText, legalImages }: LegalBlockProps) => {
  if (!legalText && legalImages.length === 0) return null;

  return (
    <>
      {legalText && <S.LegalText dangerouslySetInnerHTML={{ __html: legalText }} />}
      {legalImages.length > 0 && (
        <S.CertificatesRow>
          {legalImages.map((item) => {
            const imgUrl = getImageUrl(item.value.image);
            const url = item.value.url?.trim() || "#";
            if (!imgUrl) return null;
            return (
              <S.CertificateLink
                key={item.id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={imgUrl} alt="" />
              </S.CertificateLink>
            );
          })}
        </S.CertificatesRow>
      )}
    </>
  );
};

export default LegalBlock;
