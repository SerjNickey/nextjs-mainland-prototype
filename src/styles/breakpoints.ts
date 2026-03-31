export const breakpoints = {
  max320: "321px", // Galaxy S9+, Nokia Lumia 520, iPhone 4, iPhone5/SE
  max344: "345px", // Samsung Galaxy Z Fold 5
  max353: "354px", // Pixel 4
  max360: "361px", // BlackBerry Z30, Galaxy Note 3, Galaxy Note II, Galaxy S III, Microsoft Lumia 950, Moto G4, Nexus 5, Samsung Galaxy S8+, Galaxy S5
  max375: "376px", // iPhone SE, iPhone 6/7/8, iPhone X
  max384: "385px", // LG Optimus L70, Nexus 4
  max390: "391px", // iPhone 12 Pro
  max393: "394px", // Pixel 3, Pixel 3 XL
  max407: "408px", // Redmi Note 13 Pro+ 5G
  max411: "412px", // Pixel 2, Pixel 2 XL
  max412: "413px", // Moto G Power, Nexus 5X, Nexus 6, Nexus 6P, Pixel 7, Samsung Galaxy S20 Ultra, Samsung Galaxy A51/71, Facebook on Android
  max414: "415px", // iPhone XR, iPhone 6/7/8 Plus
  max430: "431px", // iPhone 14 Pro Max
  max480: "481px", // Nokia N9
  max540: "541px", // Surface Duo
  max600: "601px", // Blackberry PlayBook, Nexus 7
  max640: "641px", // Microsoft Lumia 550
  max712: "713px", // Galaxy Tab S4
  max768: "769px", // iPad Mini, iPad
  max800: "801px", // Kindle Fire HDX, Nexus 10
  max820: "821px", // iPad Air
  max853: "854px", // Asus Zenbook Fold
  max912: "913px", // Surface Pro 7
  max1024: "1025px", // iPad Pro, Nest Hub
  max1280: "1281px", // Nest Hub Max
  max1366: "1367px",
  max1536: "1537px",
  max1600: "1601px", // 1600x900
  max1920: "1921px", //1920x1080
  max2560: "2561px", //2560x1440
  /* min-брейкпоинты для зума (layout 1920px, zoom = ширина/1920) */
  min768: "768px", // 768×1024
  min800: "800px", // 800×600
  min960: "960px", // 960×600, 1920×1200 @ 200%
  min1024: "1024px", // 1024×768 / 1024×640
  min1097: "1097px", // 1920×1080/1200 @ 175%
  min1152: "1152px", // 1152×864
  min1176: "1176px", // 1176×664
  min1280: "1280px", // 1280×720/768/800/960/1024, 1920×1200 @ 150%
  min1360: "1360px", // 1360×768
  min1366: "1366px", // 1366×768
  min1440: "1440px", // 1440×1080
  min1536: "1536px", // 1920×1080/1200 @ 125%
  min1600: "1600px", // 1600×900/1024/1200
  min1680: "1680px", // 1680×1050
  min1720: "1720px", // 3440×1440 @ 200%
  min1920: "1920px", // 1920×1080 / 1920×1200
  min1965: "1965px", // 3440×1440 @ 175%
  min2048: "2048px", // 2048×1280
  min2293: "2293px", // 3440×1440 @ 150%
  min2560: "2560px", // 2560×1600
  min2752: "2752px", // 3440×1440 @ 125%
  min3440: "3440px", // 21:9 3440×1440 @ 100%
  min3840: "3840px",
  min5120: "5120px", // 21:9 5120×2160, 32:9 5120×1440
};

export const media = {
  max320: `@media  (max-width: ${breakpoints.max320})`,
  max344: `@media  (max-width: ${breakpoints.max344})`,
  max353: `@media  (max-width: ${breakpoints.max353})`,
  max360: `@media  (max-width: ${breakpoints.max360})`,
  max375: `@media  (max-width: ${breakpoints.max375})`,
  max384: `@media  (max-width: ${breakpoints.max384})`,
  max390: `@media  (max-width: ${breakpoints.max390})`,
  max393: `@media  (max-width: ${breakpoints.max393})`,
  max407: `@media  (max-width: ${breakpoints.max407})`,
  max411: `@media  (max-width: ${breakpoints.max411})`,
  max412: `@media  (max-width: ${breakpoints.max412})`,
  max414: `@media  (max-width: ${breakpoints.max414})`,
  max430: `@media  (max-width: ${breakpoints.max430})`,
  max480: `@media  (max-width: ${breakpoints.max480})`,
  max540: `@media  (max-width: ${breakpoints.max540})`,
  max600: `@media  (max-width: ${breakpoints.max600})`,
  max640: `@media  (max-width: ${breakpoints.max640})`,
  max712: `@media  (max-width: ${breakpoints.max712})`,
  max768: `@media  (max-width: ${breakpoints.max768})`,
  max800: `@media  (max-width: ${breakpoints.max800})`,
  max820: `@media  (max-width: ${breakpoints.max820})`,
  max853: `@media  (max-width: ${breakpoints.max853})`,
  max912: `@media  (max-width: ${breakpoints.max912})`,
  max1024: `@media  (max-width: ${breakpoints.max1024})`,
  max1280: `@media  (max-width: ${breakpoints.max1280})`,
  max1366: `@media  (max-width: ${breakpoints.max1366})`,
  max1536: `@media  (max-width: ${breakpoints.max1536})`,
  max1600: `@media  (max-width: ${breakpoints.max1600})`,
  max1920: `@media  (max-width: ${breakpoints.max1920})`,
  max2560: `@media  (max-width: ${breakpoints.max2560})`,
  min768: `@media (min-width: ${breakpoints.min768})`,
  min800: `@media (min-width: ${breakpoints.min800})`,
  min960: `@media (min-width: ${breakpoints.min960})`,
  min1024: `@media (min-width: ${breakpoints.min1024})`,
  min1097: `@media (min-width: ${breakpoints.min1097})`,
  min1152: `@media (min-width: ${breakpoints.min1152})`,
  min1176: `@media (min-width: ${breakpoints.min1176})`,
  min1280: `@media (min-width: ${breakpoints.min1280})`,
  min1360: `@media (min-width: ${breakpoints.min1360})`,
  min1366: `@media (min-width: ${breakpoints.min1366})`,
  min1440: `@media (min-width: ${breakpoints.min1440})`,
  min1536: `@media (min-width: ${breakpoints.min1536})`,
  min1600: `@media (min-width: ${breakpoints.min1600})`,
  min1680: `@media (min-width: ${breakpoints.min1680})`,
  min1720: `@media (min-width: ${breakpoints.min1720})`,
  min1920: `@media (min-width: ${breakpoints.min1920})`,
  min1965: `@media (min-width: ${breakpoints.min1965})`,
  min2048: `@media (min-width: ${breakpoints.min2048})`,
  min2293: `@media (min-width: ${breakpoints.min2293})`,
  min2560: `@media (min-width: ${breakpoints.min2560})`,
  min2752: `@media (min-width: ${breakpoints.min2752})`,
  min3440: `@media (min-width: ${breakpoints.min3440})`,
  min3840: `@media (min-width: ${breakpoints.min3840})`,
  min5120: `@media (min-width: ${breakpoints.min5120})`,
};
