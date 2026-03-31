import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      loaderText: "Loading",
      preFooterAboutBlockTitle: "PokerPlanets India - Official Website",
      preFooterAboutBlockTextMin:
        "PokerPlanets appeared on the online poker market in 2025 and immediately attracted attention with its serious approach to the gameplay. Here you can find all the popular formats: from classic cash games to tournaments and innovative modes like Spin&Win. The Curacao license confirms the legality of the poker room and protects the interests of the players...",
      preFooterAboutBlockTextMax:
        "PokerPlanets appeared on the online poker market in 2025 and immediately attracted attention with its serious approach to the gameplay. Here you can find all the popular formats: from classic cash games to tournaments and innovative modes like Spin&Win. The Curacao license confirms the legality of the poker room and protects the interests of the players. In the same year, PokerStars trusted PokerPlanets to take over the Sochi player base. This strategic move strengthened PokerPlanets position on the global market and confirmed its reliability as a platform chosen by both international operators and professional players. Poker Planets stands out among competitors with its stable server operation and a variety of game formats. PokerPlanets India takes into account the specifics of the local market: it supports popular payment systems in the country and offers an interface in an understandable language.",
      preFooterSupportBlockTitle: "Support Team",
      preFooterSupportBlockSubTitle: "Need help? Contact us at:",
      preFooterSupportBlockLink: "support@pokerplanets.com",
      preFooterIconsSectionDownloadClient: "Download Client",
      preFooterIconsSectionSocialMedia: "Social Media",
      // Poker School
      pokerSchoolSearchPlaceholder: "What is poker...",
      pokerSchoolPopularTags: "Popular Tags",
      pokerSchoolRecentSearches: "Recent Searches",
      pokerSchoolClearHistory: "Clear history",
      pokerSchoolReadArticle: "READ ARTICLE",
      pokerSchoolNoResults: "No results. Try changing your search criteria.",
      pokerSchoolRecommended: "You may find these articles useful",
      pokerSchoolLinkCopied: "Link copied",
      pokerSchoolBreadcrumbHome: "Home",
      pokerSchoolBreadcrumbPokerSchool: "Poker School",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
