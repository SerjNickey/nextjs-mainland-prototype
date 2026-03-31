import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      danger: string;
    };
    scrollbar: {
      scrollbarTrack: string;
      scrollbarThumb: string;
      scrollbarThumbHover: string;
    };
    spacing: (multiplier?: number) => string;
  }
}
