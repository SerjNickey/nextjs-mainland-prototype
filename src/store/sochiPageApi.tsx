import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/v2",
});

/** Блок таймлайна с API (Wagtail streamfield) */
export type SochiPageTimelineBlock = {
  type: "timeline";
  value: {
    date?: string;
    title?: string;
    description?: string;
  };
  id?: string;
};

/** Блок вопроса/ответа с API (Wagtail streamfield) */
export type SochiPageQuestionBlock = {
  type: "question";
  value: {
    question?: string;
    answer?: string;
  };
  id?: string;
};

/** Ответ API страницы Sochi */
export type SochiPageData = {
  id?: number;
  title?: string;
  info_title?: string;
  info_subtitle?: string;
  timeline?: SochiPageTimelineBlock[];
  questions?: SochiPageQuestionBlock[];
  meta?: unknown;
} | null;

export const sochiPageApi = createApi({
  reducerPath: "sochiPageApi",
  baseQuery,
  endpoints: (builder) => ({
    getSochiPage: builder.query<any, string | undefined>({
      query: (lang) => `${lang || "en"}/sochi`,
    }),
  }),
});

export const { useGetSochiPageQuery } = sochiPageApi;
