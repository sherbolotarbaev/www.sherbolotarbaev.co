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

    addPostLike: build.mutation<AddPostLikeResponse, AddPostLikeRequest>({
      query: (params) => ({
        url: `/likes/post/${params.slug}`,
        method: 'POST',
      }),
      invalidatesTags: ['blog'],
    }),

    removePostLike: build.mutation<RemovePostLikeResponse, RemovePostLikeRequest>({
      query: (params) => ({
        url: `/likes/post/${params.slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['blog'],
    }),

    getPostLikes: build.query<GetPostLikesResponse, GetPostLikesRequest>({
      query: (params) => ({
        url: `/likes/post/${params.slug}`,
        method: 'GET',
      }),
      providesTags: ['blog'],
    }),
  }),
});

export const {
  useAddViewQuery,
  useGetViewsQuery,
  useAddPostLikeMutation,
  useRemovePostLikeMutation,
  useGetPostLikesQuery,
} = api;
export default api;
