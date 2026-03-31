import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/v2",
});

/**
 * API страницы Poker School (Blog).
 * Endpoint: GET /api/v2/{lang}/poker-school
 *
 * Структура ответа (school.PokerSchoolPage):
 * - title, button_text ("Read article")
 * - tags: [{ type: "tag", value: { tag: number, title: string }, id: uuid }]
 * - cards: [{ type: "text"|"video", id: uuid, value: { tags: number[], card_slug?, cover: { file }, title, subtitle?, text (HTML), video_url? } }]
 */
export const pokerSchoolPageApi = createApi({
  reducerPath: "pokerSchoolPageApi",
  baseQuery,
  endpoints: (builder) => ({
    getPokerSchoolPage: builder.query<any, string | undefined>({
      query: (lang) => `${lang || "en"}/poker-school`,
    }),
  }),
});

export const { useGetPokerSchoolPageQuery } = pokerSchoolPageApi;
