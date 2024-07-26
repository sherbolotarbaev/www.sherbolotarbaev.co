import { api as index } from '..';

const api = index.injectEndpoints({
  endpoints: (build) => ({
    addView: build.query<AddViewResponse, AddViewRequest>({
      query: (params) => ({
        url: `/views/${params.slug}`,
        method: 'GET',
      }),
      providesTags: ['blog'],
    }),

    getViews: build.query<GetViewsResponse, GetViewsRequest>({
      query: () => ({
        url: '/views',
        method: 'GET',
      }),
      providesTags: ['blog'],
    }),

    addLike: build.mutation<AddLikeResponse, AddLikeRequest>({
      query: (params) => ({
        url: `/likes/${params.slug}`,
        method: 'POST',
      }),
      invalidatesTags: ['blog'],
    }),

    removeLike: build.mutation<RemoveLikeResponse, RemoveLikeRequest>({
      query: (params) => ({
        url: `/likes/${params.slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['blog'],
    }),

    getLikes: build.query<GetLikeResponse, GetLikeRequest>({
      query: (params) => ({
        url: `/likes/${params.slug}`,
        method: 'GET',
      }),
      providesTags: ['blog'],
    }),
  }),
});

export const {
  useAddViewQuery,
  useGetViewsQuery,
  useAddLikeMutation,
  useRemoveLikeMutation,
  useGetLikesQuery,
} = api;
export default api;
