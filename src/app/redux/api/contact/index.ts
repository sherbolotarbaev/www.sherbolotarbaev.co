import { api as index } from '..';

const api = index.injectEndpoints({
  endpoints: (build) => ({
    sendContactMessage: build.mutation<
      NewContactMessageResponse,
      NewContactMessageRequest
    >({
      query: (body) => ({
        url: '/contact',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['contact'],
    }),
  }),
});

export const { useSendContactMessageMutation } = api;
export default api;
