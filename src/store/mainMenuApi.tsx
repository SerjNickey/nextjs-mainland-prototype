import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { MainMenuResponse } from "../shared/mainMenu/types";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/v2",
});

export const mainMenuApi = createApi({
  reducerPath: "mainMenuApi",
  baseQuery,
  endpoints: (builder) => ({
    getMainMenu: builder.query<MainMenuResponse, string | undefined>({
      query: (lang) => `${lang || "en"}/landing/main-menu`,
    }),
  }),
});

export const { useGetMainMenuQuery } = mainMenuApi;
