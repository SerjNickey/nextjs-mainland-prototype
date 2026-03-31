import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/v2",
});

export const promosPageApi = createApi({
  reducerPath: "promosPageApi",
  baseQuery,
  endpoints: (builder) => ({
    getPromosPage: builder.query<any, string | undefined>({
      query: (lang) => `${lang || "en"}/promos`,
    }),
  }),
});

export const { useGetPromosPageQuery } = promosPageApi;
