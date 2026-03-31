/**
 * Community — блок списка соцсетей бренда (переход по ссылке в новой вкладке).
 * Данные из homePageApi: communities_title, communities_subtitle, communities.
 * Показываются только Facebook, YouTube, Twitch, X.com, Instagram (в таком порядке).
 */
import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store";
import {
  getItemsFromData,
  type CommunityItem,
  type HomePageCommunityData,
} from "../../../../shared/communitiesData";
import * as S from "./Community.styled";
import Line from "../../../../components/Line/Line";

export type {
  CommunityItem,
  HomePageCommunityData,
} from "../../../../shared/communitiesData";
export { getItemsFromData } from "../../../../shared/communitiesData";

/** Порядок и допустимые названия соцсетей в блоке Community. */
const COMMUNITY_BLOCK_ORDER: Array<{ key: string; names: string[] }> = [
  { key: "facebook", names: ["facebook"] },
  { key: "youtube", names: ["youtube", "ютуб", "you tube"] },
  { key: "twitch", names: ["twitch"] },
  { key: "x", names: ["x", "x.com", "twitter"] },
  { key: "instagram", names: ["instagram", "inst"] },
];

function filterAndOrderCommunityItems(items: CommunityItem[]): CommunityItem[] {
  const norm = (s: string) => s.toLowerCase().trim().replace(/\./g, "");
  const result: CommunityItem[] = [];
  const used = new Set<string>();
  for (const { names } of COMMUNITY_BLOCK_ORDER) {
    const normNames = names.map((n) => n.replace(/\./g, ""));
    const found = items.find(
      (item) =>
        !used.has(item.id) && normNames.some((n) => norm(item.name) === n)
    );
    if (found) {
      result.push(found);
      used.add(found.id);
    }
  }
  return result;
}

interface CommunityProps {
  /** Данные из useGetHomePageQuery(); при отсутствии блок не рендерится */
  data?: HomePageCommunityData;
}

const Community = ({ data }: CommunityProps) => {
  const countryCode = useSelector(
    (s: RootState) => s.registration?.countryCodeReg ?? ""
  );
  const countryName = useSelector(
    (s: RootState) => s.registration?.countryReg ?? ""
  );

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
    const all = getItemsFromData(data, countryCode, countryName);
    return filterAndOrderCommunityItems(all);
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
