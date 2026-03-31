// Для Chrome и TG браузера на мобиле нужно отнимать от разрешения девайса 135px
// У Galaxy S20 FE Viewport равен 800px по Y. Чтобы не было скроллов нужно тестить на Y равном 665px

// Viewoports
const devices = {
  "320x480": ["iPhone 4"],
  "320x523": [],
  "320x533": ["Nokia Lumia 520"],
  "320x568": ["iPhone5/SE"],
  "320x658": ["Galaxy S9+"],

  "344x747": [],
  "344x882": ["Galaxy Z Fold 5"],

  "353x610": [],
  "353x745": ["Pixel 4"],

  "360x505": [],
  "360x518": [],
  "360x535": [],
  "360x605": [],
  "360x640": [
    "BlackBerry Z30",
    "Galaxy Note 3",
    "Galaxy Note II",
    "Galaxy S III",
    "Microsoft Lumia 950",
    "Moto G4",
    "Nexus 5",
    "Galaxy S5",
  ],
  "360x650": ["HONOR 20"],
  "360x665": [],
  "360x670": ["Galaxy S20"],
  "360x740": ["Galaxy S8", "Samsung Galaxy S8+"],
  "360x800": ["Galaxy S20 FE"],

  "375x532": [],
  "375x667": ["iPhone SE", "iPhone 6/7/8"],
  "375x677": [],
  "375x812": ["iPhone X"],

  "384x505": [],
  "384x640": ["LG Optimus L70", "Nexus 4"],

  "390x709": [],
  "390x844": ["iPhone 12 Pro"],

  "393x651": [],
  "393x786": ["Pixel 3", "Pixel 3 XL"],

  "407x764": [],
  "407x904": ["Redmi Note 13 Pro+ 5G"],

  "411x596": [],
  "411x688": [],
  "411x731": ["Pixel 2"],
  "411x823": ["Pixel 2 XL"],

  "412x597": [],
  "412x688": [],
  "412x732": ["Nexus 5X", "Nexus 6", "Nexus 6P"],
  "412x757": [],
  "412x779": [],
  "412x780": [],
  "412x823": ["Moto G Power"],
  "412x892": ["Facebook on Android"],
  "412x914": ["Samsung Galaxy A51/71"],
  "412x915": ["Pixel 7", "Samsung Galaxy S20 Ultra"],

  "414x601": [],
  "414x736": ["iPhone 6/7/8 Plus"],
  "414x761": [],
  "414x896": ["iPhone XR"],

  "430x797": [],
  "430x932": ["iPhone 14 Pro Max"],

  "480x719": [],
  "480x854": ["Nokia N9"],

  "540x585": [],
  "540x720": ["Surface Duo"],

  "600x960": ["Nexus 7"],
  "600x1024": ["Blackberry PlayBook"],

  // "640x360": ["Microsoft Lumia 550"],
  "712x1138": ["Galaxy Tab S4"],
  "768x1024": ["iPad Mini", "iPad"],
  "800x1280": ["Kindle Fire HDX", "Nexus 10"],
  "820x1180": ["iPad Air"],
  "853x1280": ["Asus Zenbook Fold"],
  "912x1368": ["Surface Pro 7"],
  "1024x600": ["Nest Hub"],
  "1024x1366": ["iPad Pro"],
  "1280x593": [],
  "1280x673": [],
  "1280x720": [],
  "1280x800": ["Nest Hub Max"],
  "1536x703": [],
  "1536x864": [],
  "1600x900": "",
  "1920x1080": "",
  "2560x1440": "",
  "3840x2160": "",
};

export default devices;
