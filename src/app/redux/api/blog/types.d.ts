type AddViewRequest = {
  slug: string;
};

type AddViewResponse = View;

type GetViewsRequest = void;

type GetViewsResponse = View[];

type AddPostLikeRequest = {
  slug: string;
};

type AddPostLikeResponse = LikePost;

type RemovePostLikeRequest = {
  slug: string;
};

type RemovePostLikeResponse = LikePost;

type GetPostLikesRequest = {
  slug: string;
};

type GetPostLikesResponse = LikePost[];
