import { useEffect, useMemo, useState } from "react";
import { MEDIA_ORIGIN } from "../../../../config/env";
import * as S from "./InterfaceDemonstrationMobile.styled";

type DemoItem = {
  title?: string;
  description?: string;
  icon?: { file?: string };
  background?: { file?: string };
  feature?: { file?: string };
  foreground?: { file?: string };
  mobile_background?: { file?: string } | null;
  mobile_feature?: { file?: string } | null;
  mobile_foreground?: { file?: string } | null;
};

type HomePageData = {
  interface_demos_title?: string;
  interface_demos?: Array<{ value?: DemoItem }>;
} | null;

interface InterfaceDemonstrationMobileProps {
  data?: HomePageData;
}

const normalizeUrl = (rawUrl: string) => {
  const trimmed = rawUrl.trim();
  if (!trimmed) return "";
  const protocol =
    typeof window !== "undefined" ? window.location.protocol : "https:";
  if (trimmed.startsWith("//")) return `${protocol}${trimmed}`;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    if (protocol === "https:" && trimmed.startsWith("http://")) {
      return trimmed.replace("http://", "https://");
    }
    return trimmed;
  }
  if (trimmed.startsWith("/")) return `${MEDIA_ORIGIN}${trimmed}`;
  return `${MEDIA_ORIGIN}/${trimmed}`;
};

const getFileUrl = (source?: { file?: unknown } | null) => {
  if (typeof source?.file === "string") return normalizeUrl(source.file);
  const fileObject = source?.file as { url?: unknown } | undefined;
  if (typeof fileObject?.url === "string") return normalizeUrl(fileObject.url);
  return "";
};

const InterfaceDemonstrationMobile = ({
  data,
}: InterfaceDemonstrationMobileProps) => {
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

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (selectedIndex >= items.length) setSelectedIndex(0);
  }, [items.length, selectedIndex]);

  if (items.length === 0) return null;

  const activeItem = items[selectedIndex];
  const previewBackground =
    getFileUrl(activeItem.mobile_background) ||
    getFileUrl(activeItem.background);
  const previewFeature =
    getFileUrl(activeItem.mobile_feature) || getFileUrl(activeItem.feature);
  const previewForeground =
    getFileUrl(activeItem.mobile_foreground) ||
    getFileUrl(activeItem.foreground);

  return (
    <S.Wrapper>
      {title && <S.Title>{title}</S.Title>}
      <S.Card>
        <S.TabsGrid>
          {items.map((item, index) => (
            <S.TabCard
              key={`${item.title ?? "demo-tab"}-${index}`}
              type="button"
              $isActive={index === selectedIndex}
              $iconUrl={getFileUrl(item.icon)}
              onClick={() => setSelectedIndex(index)}
              aria-pressed={index === selectedIndex}
            >
              <S.TabTitle $isActive={index === selectedIndex}>
                {item.title}
              </S.TabTitle>
            </S.TabCard>
          ))}
        </S.TabsGrid>
        <S.Preview
          $backgroundUrls={[
            previewForeground,
            previewFeature,
            previewBackground,
          ]}
        />
        <S.Details>
          <S.DetailsTitle>{activeItem.title}</S.DetailsTitle>
          {activeItem.description && (
            <S.DetailsText
              dangerouslySetInnerHTML={{ __html: activeItem.description }}
            />
          )}
        </S.Details>
      </S.Card>
    </S.Wrapper>
  );
};

export default InterfaceDemonstrationMobile;
