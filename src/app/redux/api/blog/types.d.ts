type AddViewRequest = {
  slug: string;
};

type AddViewResponse = View;

type GetViewsRequest = void;

type GetViewsResponse = View[];

type AddLikeRequest = {
  slug: string;
};

type AddLikeResponse = Like;

type RemoveLikeRequest = {
  slug: string;
};

type RemoveLikeResponse = Like;

type GetLikeRequest = {
  slug: string;
};

type GetLikeResponse = Like[];
