import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const registrationApi = createApi({
  reducerPath: "registrationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.plnpw.com/api/web/",
  }),
  endpoints: (builder) => ({
    register: builder.mutation<
      any,
      {
        nick: string;
        email: string;
        password: string;
        confirmPassword: string;
        countryId: string | number;
        bonusCode?: string;
        confirmRules: boolean;
        formToken: string;
      }
    >({
      query: (body) => ({
        url: "v2/registration",
        method: "POST",
        params: {
          clientId: "pokerplanets",
        },
        body,
      }),
    }),
    getFormToken: builder.query<any, void>({
      query: () => ({
        url: "v2/registration",
        params: {
          clientId: "pokerplanets",
        },
      }),
      transformResponse: (response: any) => {
        const token = response.data[0].attributes.attributes.token;
        return {
          token,
          fullData: response,
        };
      },
    }),
    resendVerificationCode: builder.mutation<any, { formToken: string }>({
      query: (body) => ({
        url: "forms/data/email/verification/code/send",
        method: "POST",
        params: {
          clientId: "pokerplanets",
        },
        body,
      }),
    }),
    checkVerificationCode: builder.mutation<
      any,
      { formToken: string; verificationCode: string }
    >({
      query: (body) => ({
        url: "v2/registration/Act2",
        method: "POST",
        params: {
          clientId: "pokerplanets",
        },
        body,
      }),
    }),
    sendEmail: builder.mutation<
      any,
      { value: string; type: string; formToken: string }
    >({
      query: (body) => ({
        url: "users/me/password-restore",
        method: "POST",
        params: {
          clientId: "pokerplanets",
        },
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useGetFormTokenQuery,
  useResendVerificationCodeMutation,
  useCheckVerificationCodeMutation,
  useSendEmailMutation,
} = registrationApi;
