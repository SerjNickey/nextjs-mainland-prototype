"use client";

import { useSelector } from "react-redux";
import StickyHeader from "../../widgets/StickyHeader/StickyHeader";
import { useGetBasePageQuery } from "../../store/basePageApi";
import type { RootState } from "../../store";
import * as S from "./404Page.styled";

const NotFoundPage = () => {
  const yourLang = useSelector(
    (s: RootState) => s.registration?.yourLang ?? "en"
  );
  const { data } = useGetBasePageQuery(yourLang);
  const logoSrc = data?.logo?.file || "";
  const errorText = data?.page_404_title || "This Page doesn't exist";

  return (
    <S.Wrapper>
      <StickyHeader logoSrc={logoSrc} />
      <S.Content>
        <S.ErrorCode>404</S.ErrorCode>
        <S.ErrorText>{errorText}</S.ErrorText>
      </S.Content>
    </S.Wrapper>
  );
};

export default NotFoundPage;
