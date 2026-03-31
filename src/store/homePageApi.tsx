import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/v2",
});

export const homePageApi = createApi({
  reducerPath: "homePageApi",
  baseQuery,
  endpoints: (builder) => ({
    getHomePage: builder.query<any, string | undefined>({
      query: (lang) => `${lang || "en"}/home`,
    }),
  }),
});

export const { useGetHomePageQuery } = homePageApi;
