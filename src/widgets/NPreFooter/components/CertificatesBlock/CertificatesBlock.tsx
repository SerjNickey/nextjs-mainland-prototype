import * as S from "./CertificatesBlock.styled";
import cert_one from "../../../../assets/images/PreFooter/cert_one_2x.webp";
import cert_two from "../../../../assets/images/PreFooter/cert_two_2x.webp";
import cert_three from "../../../../assets/images/PreFooter/cert_three_2x.webp";
import cert_four from "../../../../assets/images/PreFooter/cert_four_2x.webp";

const certsArr = [
  {
    icon: cert_one.src,
    link: "https://pokerplanets.com/terms-conditions/responsible-gaming/",
    height: 38,
  },
  { icon: cert_two.src, link: "#", height: 33 },
  { icon: cert_three.src, link: "https://www.gamcare.org.uk/", height: 27 },
  {
    icon: cert_four.src,
    link: "https://cert.gcb.cw/certificate?id=ZXlKcGRpSTZJakpMV1RCbU1reEZSa2cyYmtzM2EwMW9ZV05tUkVFOVBTSXNJblpoYkhWbElqb2lWM0I1WWtoTGJtaHpiR2h5Y2tzeWQyUk9aekkwWkcxT01qTllaMlo0ZWxSNFIzRkpheTl1ZWpOeFp6MGlMQ0p0WVdNaU9pSTJPVFZoTXpjMk9HWTFOVGhsWW1SbU1ETXlaR05qTm1RMU4yTmxOR1ZpTURoaFpEaG1NakZoWWpReFptWXdPRFZtT0RkaVpqVTFOVFF5T1RkaE5USmtJaXdpZEdGbklqb2lJbjA9",
    height: 37,
  },
];

const CertificatesBlock = () => {
  return (
    <S.CertificatesSection>
      {certsArr.map((i, n) =>
        n === 0 || n === 1 ? (
          <img key={n} src={i.icon} width={"auto"} height={i.height} alt="" />
        ) : (
          <S.CertificateLink key={n} href={i.link} target="_blank">
            <img src={i.icon} width={"auto"} height={i.height} alt="" />
          </S.CertificateLink>
        )
      )}
    </S.CertificatesSection>
  );
};

export default CertificatesBlock;
