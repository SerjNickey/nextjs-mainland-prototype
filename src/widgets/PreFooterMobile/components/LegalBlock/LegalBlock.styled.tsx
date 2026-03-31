import styled from "styled-components";

export const LegalText = styled.div`
  padding: 0 15px;
  font-size: 10px;
  line-height: 1.45;
  color: rgba(132, 133, 138, 1);
  text-align: center;

  p {
    margin: 0 0 8px;
  }
`;

export const CertificatesRow = styled.div`
  padding: 0 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
`;

export const CertificateLink = styled.a`
  display: inline-flex;
  width: auto;
  height: 28px;

  img {
    width: auto;
    height: 100%;
    object-fit: cover;
  }
`;
