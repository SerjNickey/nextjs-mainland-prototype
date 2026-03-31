import type { MoreSocialItem } from "../../communities";
import InlineSvgFromUrl from "../../../../components/InlineSvgFromUrl/InlineSvgFromUrl";
import * as S from "./MoreSocialBlock.styled";

export interface MoreSocialBlockProps {
  items: MoreSocialItem[];
}

export function MoreSocialBlock({ items }: MoreSocialBlockProps) {
  if (!items.length) return null;
  return (
    <S.DropdownSectionFooter>
      <S.SocialRow>
        {items.map((item) => (
          <S.SocialIconWrap key={item.id}>
            <S.SocialIconTooltip>{item.name}</S.SocialIconTooltip>
            <S.SocialIconButton
              href={item.link}
              title={item.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.iconUrl ? (
                <InlineSvgFromUrl
                  src={item.iconUrl}
                  title={item.name}
                  width={item.width ?? 20}
                  height={item.height ?? 20}
                  color="#161616"
                  fallback={
                    <img
                      src={item.iconUrl}
                      alt=""
                      width={item.width ?? 20}
                      height={item.height ?? 20}
                      loading="lazy"
                    />
                  }
                />
              ) : (
                <span>{item.name.charAt(0).toUpperCase()}</span>
              )}
            </S.SocialIconButton>
          </S.SocialIconWrap>
        ))}
      </S.SocialRow>
    </S.DropdownSectionFooter>
  );
}
