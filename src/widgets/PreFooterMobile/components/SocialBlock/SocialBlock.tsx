import InlineSvgFromUrl from "../../../../components/InlineSvgFromUrl/InlineSvgFromUrl";
import * as S from "./SocialBlock.styled";
import type { FooterCommunityItem } from "../../types";
import { getImageUrl } from "./helpers";

type SocialBlockProps = {
  title?: string;
  items: FooterCommunityItem[];
};

const SocialBlock = ({ title, items }: SocialBlockProps) => {
  if (!title || items.length === 0) return null;

  return (
    <S.Block>
      <S.BlockTitle>{title}</S.BlockTitle>
      <S.SocialRow>
        {items.map((item, index) => {
          const iconUrl = getImageUrl(item.icon);
          const link = item.link?.trim() || "#";
          const svgColor = item.icon?.color ?? item.color ?? undefined;
          return (
            <S.SocialIconLink
              key={`${item.name ?? "social"}-${item.link ?? ""}-${index}`}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              title={item.name}
            >
              {iconUrl ? (
                <InlineSvgFromUrl
                  src={iconUrl}
                  title={item.name}
                  width={22}
                  height={22}
                  color={svgColor}
                  forceColor={!!svgColor}
                  fallback={
                    <img src={iconUrl} alt="" width={22} height={22} loading="lazy" />
                  }
                />
              ) : (
                <span>{item.name?.charAt(0) ?? ""}</span>
              )}
            </S.SocialIconLink>
          );
        })}
      </S.SocialRow>
    </S.Block>
  );
};

export default SocialBlock;
