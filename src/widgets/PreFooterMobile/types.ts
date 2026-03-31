export type FooterLine = {
  title?: string;
  slug?: string;
  url?: string;
  text?: unknown;
};

export type FooterBlock = {
  id?: string;
  type?: string;
  value?: { title?: string; lines?: FooterLine[] };
};

export type FooterCommunityItem = {
  name?: string;
  icon?: { file?: string; color?: string };
  link?: string;
  color?: string;
  included_countries?: (string | null | { name?: string; code?: string })[];
  excluded_countries?: (string | null | { name?: string; code?: string })[];
  active?: boolean;
};

export type RunningLineItem =
  | { type: "running_line_image"; value: { file?: string }; id: string }
  | { type: "running_line_text"; value: string; id: string };

export type LegalImageItem = {
  type: "legal_image";
  value: {
    image?: { file?: string };
    url?: string;
    included_countries?: (string | null | { name?: string; code?: string })[];
    excluded_countries?: (string | null | { name?: string; code?: string })[];
  };
  id: string;
};
