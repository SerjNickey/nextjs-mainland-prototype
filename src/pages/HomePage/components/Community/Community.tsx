/**
 * Community — блок списка соцсетей бренда (переход по ссылке в новой вкладке).
 * Данные из homePageApi: communities_title, communities_subtitle, communities.
 * Порядок и состав — как в API после фильтра по active и excluded_countries.
 */
import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store";
import {
  getItemsFromData,
  type HomePageCommunityData,
} from "../../../../shared/communitiesData";
import * as S from "./Community.styled";
import Line from "../../../../components/Line/Line";

export type {
  CommunityItem,
  HomePageCommunityData,
} from "../../../../shared/communitiesData";
export { getItemsFromData } from "../../../../shared/communitiesData";

interface CommunityProps {
  /** Данные из useGetHomePageQuery(); при отсутствии блок не рендерится */
  data?: HomePageCommunityData;
  /** Как в GrandMenu: страна из base page, иначе из Redux ниже */
  userCountry?: { code?: string; name?: string };
}

const Community = ({ data, userCountry }: CommunityProps) => {
  const countryCodeReg = useSelector(
    (s: RootState) => s.registration?.countryCodeReg ?? ""
  );
  const countryNameReg = useSelector(
    (s: RootState) => s.registration?.countryReg ?? ""
  );
  const countryCode = userCountry?.code ?? countryCodeReg;
  const countryName = userCountry?.name ?? countryNameReg;

  const title = useMemo(
    () =>
      typeof data?.communities_title === "string" &&
      data.communities_title.trim()
        ? data.communities_title.trim()
        : "",
    [data]
  );
  const subtitle = useMemo(
    () =>
      typeof data?.communities_subtitle === "string" &&
      data.communities_subtitle.trim()
        ? data.communities_subtitle.trim()
        : "",
    [data]
  );
  const items = useMemo(() => {
    if (!data) return [];
    return getItemsFromData(data, countryCode, countryName);
  }, [data, countryCode, countryName]);

  if (data?.communities_active === false) return null;
  if (!title && items.length === 0) return null;

  return (
    <S.GrandWrapper>
      <S.Wrapper>
        {title && <S.Title>{title}</S.Title>}
        {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
        {items.length > 0 && (
          <S.CardRow>
            {items.map((item) => (
              <S.Card
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
              >
                {item.iconUrl ? (
                  <S.CardIcon
                    src={item.iconUrl}
                    alt=""
                    width={24}
                    height={24}
                  />
                ) : null}
                <S.CardName>{item.name}</S.CardName>
              </S.Card>
            ))}
          </S.CardRow>
        )}
      </S.Wrapper>
      <Line isVisible={true} />
    </S.GrandWrapper>
  );
};

export default Community;
