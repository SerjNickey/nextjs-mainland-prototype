import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/v2",
});

export const basePageApi = createApi({
  reducerPath: "basePageApi",
  baseQuery,
  endpoints: (builder) => ({
    getBasePage: builder.query<any, string | undefined>({
      query: (lang) => `${lang || "en"}/base`,
    }),
  }),
});

export const { useGetBasePageQuery } = basePageApi;
