import { api as index } from '..';

const api = index.injectEndpoints({
  endpoints: (build) => ({
    logInOtp: build.mutation<LogInOtpResponse, LogInOtpRequest>({
      query: ({ email, otp, next }) => ({
        url: '/login',
        method: 'POST',
        body: {
          email,
          otp,
        },
        params: {
          next,
        },
      }),
      invalidatesTags: ['auth'],
    }),

    sendOtp: build.mutation<SendOtpResponse, SendOtpRequest>({
      query: (body) => ({
        url: '/send-otp',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['auth'],
    }),

    logout: build.mutation<LogoutResponse, LogoutRequest>({
      query: () => ({
        url: '/logout',
        method: 'POST',
        invalidatesTags: ['auth'],
      }),
    }),
  }),
});

export const { useLogInOtpMutation, useSendOtpMutation, useLogoutMutation } = api;
export default api;
