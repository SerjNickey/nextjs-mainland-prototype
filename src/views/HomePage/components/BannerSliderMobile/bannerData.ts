import {
  cleanIncludedCountries,
  cleanExcludedCountries,
  isVisibleForCountry,
  type ExcludedCountryEntry,
} from "../../../../shared/countryVisibility";

export type BannerSlide = {
  title: string;
  subtitle: string;
  imageUrl?: string;
};

export type HomePageBannerData = {
  banner_slider?: Array<{
    value?: {
      title?: string;
      subtitle?: string;
      image?: {
        file?: string;
      };
      included_countries?: ExcludedCountryEntry[];
      excluded_countries?: ExcludedCountryEntry[];
    };
  }>;
} | null;

export const getBannerSlides = (
  data: HomePageBannerData,
  countryCode: string,
  countryName: string
): BannerSlide[] => {
  const banners = data?.banner_slider ?? [];
  if (Array.isArray(banners) && banners.length > 0) {
    return banners
      .filter((banner) => {
        const included = cleanIncludedCountries(banner.value?.included_countries);
        const excluded = cleanExcludedCountries(banner.value?.excluded_countries);
        return isVisibleForCountry(included, excluded, countryCode, countryName);
      })
      .map((banner, index) => ({
        title:
          typeof banner.value?.title === "string" && banner.value.title.trim()
            ? banner.value.title
            : `Banner ${index + 1}`,
        subtitle:
          typeof banner.value?.subtitle === "string"
            ? banner.value.subtitle
            : "",
        imageUrl:
          typeof banner.value?.image?.file === "string"
            ? banner.value.image.file
            : undefined,
      }));
  }

  return [];
};
