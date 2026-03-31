import styled from "styled-components";

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const BlockTitle = styled.h3`
  margin-bottom: 6px;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  color: #ffffff;
`;

export const SocialRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

export const SocialIconLink = styled.a`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #53555b;
  color: #fff;
`;
