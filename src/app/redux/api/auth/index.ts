import { api as index } from '..';

const api = index.injectEndpoints({
  endpoints: (build) => ({
    logout: build.mutation<LogoutResponse, LogoutRequest>({
      query: () => ({
        url: '/logout',
        method: 'POST',
        invalidatesTags: ['auth'],
      }),
    }),
  }),
});

export const { useLogoutMutation } = api;
export default api;
