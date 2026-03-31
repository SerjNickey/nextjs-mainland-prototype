import { useEffect, useMemo, useState } from "react";
import { MEDIA_ORIGIN } from "../../../../config/env";
import * as S from "./InterfaceDemonstration.styled";

type DemoItem = {
  title?: string;
  description?: string;
  icon?: { file?: string };
  background?: { file?: string };
  feature?: { file?: string };
  foreground?: { file?: string };
};

type HomePageData = {
  interface_demos_title?: string;
  interface_demos?: Array<{ value?: DemoItem }>;
} | null;

interface InterfaceDemonstrationProps {
  data?: HomePageData;
}

const normalizeUrl = (rawUrl: string) => {
  const trimmed = rawUrl.trim();
  if (!trimmed) return "";
  const protocol =
    typeof window !== "undefined" ? window.location.protocol : "https:";

  if (trimmed.startsWith("//")) {
    return `${protocol}${trimmed}`;
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    if (protocol === "https:" && trimmed.startsWith("http://")) {
      return trimmed.replace("http://", "https://");
    }
    return trimmed;
  }

  if (trimmed.startsWith("/")) {
    return `${MEDIA_ORIGIN}${trimmed}`;
  }

  return `${MEDIA_ORIGIN}/${trimmed}`;
};

const getFileUrl = (source?: { file?: unknown }) => {
  if (typeof source?.file === "string") {
    return normalizeUrl(source.file);
  }
  const fileObject = source?.file as { url?: unknown } | undefined;
  if (typeof fileObject?.url === "string") {
    return normalizeUrl(fileObject.url);
  }
  return "";
};

const InterfaceDemonstration = ({ data }: InterfaceDemonstrationProps) => {
  const items = useMemo(
    () =>
      (data?.interface_demos ?? [])
        .map((item) => item.value)
        .filter(Boolean) as DemoItem[],
    [data]
  );
  const title = useMemo(
    () =>
      typeof data?.interface_demos_title === "string" &&
      data.interface_demos_title.trim()
        ? data.interface_demos_title
        : "",
    [data]
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex >= items.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, items.length]);

  if (items.length === 0) {
    return null;
  }

  const activeItem = items[activeIndex];
  const previewBackground = getFileUrl(activeItem?.background);
  const previewFeature = getFileUrl(activeItem?.feature);
  const previewForeground = getFileUrl(activeItem?.foreground);

  return (
    <S.Wrapper>
      {title && <S.Title>{title}</S.Title>}
      <S.Content>
        <S.LeftColumn>
          <S.CardsGrid>
            {items.map((item, index) => (
              <S.Card
                key={`${item.title ?? "demo"}-${index}`}
                $isActive={index === activeIndex}
                $iconUrl={getFileUrl(item.icon)}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
              >
                <S.CardTitle>{item.title}</S.CardTitle>
              </S.Card>
            ))}
          </S.CardsGrid>
          <S.Details key={`details-${activeIndex}`}>
            <S.DetailsTitle>{activeItem?.title}</S.DetailsTitle>
            {activeItem?.description && (
              <S.DetailsText
                dangerouslySetInnerHTML={{ __html: activeItem.description }}
              />
            )}
          </S.Details>
        </S.LeftColumn>
        <S.RightColumn>
          <S.Preview
            $backgroundUrls={[
              previewForeground,
              previewFeature,
              previewBackground,
            ]}
          />
        </S.RightColumn>
      </S.Content>
    </S.Wrapper>
  );
};

export default InterfaceDemonstration;
