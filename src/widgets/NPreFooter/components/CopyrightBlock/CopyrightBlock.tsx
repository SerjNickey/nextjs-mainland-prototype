import * as S from "./CopyrightBlock.styled";

interface ICopyrightBlock {
  lang: string;
}

const CopyrightBlock = ({ lang }: ICopyrightBlock) => {
  return (
    <S.CopyrightSection>
      {lang === "ru" && (
        <S.CopyrightTitle>
          © 2026 Entertainment Planets B.V. Все права защищены.
        </S.CopyrightTitle>
      )}
      {lang === "en" && (
        <S.CopyrightTitle>
          © 2026 Entertainment Planets B.V. All rights reserved.
        </S.CopyrightTitle>
      )}
      {lang === "ru" && (
        <S.CopyrightText>
          Компания зарегистрирована на Кюрасао под номером 164686, юридический
          адрес: Kaya Richard J. Beaujon Z/N, Кюрасао. Сайт лицензирован и
          регулируется Curacao Gaming Control Board, лицензия №
          OGL/2024/469/0855.
        </S.CopyrightText>
      )}
      {lang === "en" && (
        <S.CopyrightText>
          Operated by Entertainment Planets B.V., a company registered in
          Curaçao under No. 166486, with registered office at Kaya Richard J.
          Beaujon Z/N, Curaçao. This website is licensed and regulated by
          Curaçao Gaming Control Board, License No. OGL/2024/469/0855.
        </S.CopyrightText>
      )}
      <S.CopyrightText />
      {lang === "ru" && (
        <S.CopyrightText>
          Чтобы зарегистрироваться на сайте, пользователь должен принять{" "}
          <a
            href="https://pokerplanets.com/ru/terms-conditions/"
            target="_blank"
          >
            Условия использования
          </a>
          ,{" "}
          <a
            href="https://pokerplanets.com/ru/terms-conditions/privacy-policy/"
            target="_blank"
          >
            Политику конфиденциальности
          </a>{" "}
          и{" "}
          <a
            href="https://pokerplanets.com/ru/terms-conditions/cookie-policy/"
            target="_blank"
          >
            Политику файлов cookie
          </a>
          . Игрок несет личную ответственность за соблюдение законов своей
          юрисдикции. Играйте ответственно.
        </S.CopyrightText>
      )}
      {lang === "en" && (
        <S.CopyrightText>
          To register for this website, the user is required to accept the{" "}
          <a href="https://pokerplanets.com/terms-conditions/" target="_blank">
            General Terms and Conditions
          </a>
          ,{" "}
          <a
            href="https://pokerplanets.com/terms-conditions/privacy-policy/"
            target="_blank"
          >
            Privacy Policy
          </a>
          , and{" "}
          <a
            href="https://pokerplanets.com/terms-conditions/cookie-policy/"
            target="_blank"
          >
            Cookie Policy
          </a>
          . It is the player’s sole responsibility to inquire about the existing
          laws and regulations of the given jurisdiction for online gambling.
          Please play responsibly.
        </S.CopyrightText>
      )}
    </S.CopyrightSection>
  );
};

export default CopyrightBlock;
