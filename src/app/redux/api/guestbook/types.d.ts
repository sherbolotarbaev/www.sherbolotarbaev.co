type NewGuestbookMessageRequest = {
  message: string;
};

type NewGuestbookMessageResponse = GuestbookMessage;

type DeleteGuestbookMessageRequest = number;

type DeleteGuestbookMessageResponse = GuestbookMessage;

type UpdateGuestbookMessageRequest = number;

type UpdateGuestbookMessageResponse = GuestbookMessage;

type GetGuestbookMessagesRequest = {
  take?: number;
} | void;

type GetGuestbookMessagesResponse = {
  totalCount: number;
  count: number;
  items: GuestbookMessage[];
};

type AddMessageLikeRequest = {
  id: number;
};

type AddMessageLikeResponse = LikeMessage;

type RemoveMessageLikeRequest = {
  id: number;
};

type RemoveMessageLikeResponse = LikeMessage;

type GetMessageLikesRequest = {
  id: number;
};

type GetMessageLikesResponse = LikeMessage[];
