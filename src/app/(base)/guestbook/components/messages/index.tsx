'use client';

import React, { useCallback, useMemo, useState } from 'react';

import {
  useAddMessageLikeMutation,
  useDeleteGuestbookMessageMutation,
  useGetGuestbookMessagesQuery,
  useRemoveMessageLikeMutation,
} from '@/redux/api/guestbook';
import clsx from 'clsx';
import { formatDate } from 'shared/lib/date';
import { toast } from 'sonner';
import { MAX_LOAD_MESSAGES_COUNT, MIN_LOAD_MESSAGES_COUNT } from './constants';

import Button from 'components/button';
import Popup from 'components/popup';
import Image from 'next/image';

import { BiChevronDown } from 'react-icons/bi';
import { FaRegHeart } from 'react-icons/fa6';
import { MdDeleteOutline, MdVerified } from 'react-icons/md';
import styles from './styles.module.scss';

type SelectedMessage = Omit<
  GuestbookMessage,
  'createdAt' | 'updatedAt' | 'isEdited' | 'author' | 'likesCount' | 'hasLiked'
>;

interface MessagesProps {
  me?: User | undefined;
}

const Messages: React.FC<MessagesProps> = ({ me }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<SelectedMessage | null>(null);
  const [take, setTake] = useState<number>(MAX_LOAD_MESSAGES_COUNT);

  const { data, isLoading, isError, isFetching, refetch } = useGetGuestbookMessagesQuery({
    take,
  });
  const [deleteMessage, { isLoading: isDeleting }] = useDeleteGuestbookMessageMutation();

  const handleSelectMessage = (message: SelectedMessage | null) => {
    setIsModalOpen(true);
    setSelectedMessage(message);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteMessage = useCallback(
    (id: number) => {
      toast.promise(deleteMessage(id).unwrap(), {
        position: 'bottom-right',
        loading: 'Deleting...',
        success: () => {
          setIsModalOpen(false);
          setSelectedMessage(null);
          return 'Successfully deleted';
        },
        error: (error) =>
          error.data?.message || 'Try again. Something happened on our end',
      });
    },
    [deleteMessage],
  );

  const handleLoadMore = useCallback(() => {
    setTake(
      (prevTake) =>
        prevTake +
        (data
          ? Math.min(MIN_LOAD_MESSAGES_COUNT, data.totalCount - data.count)
          : MIN_LOAD_MESSAGES_COUNT),
    );
    refetch();
  }, [data, refetch]);

  const messages = useMemo(() => {
    if (!data || isLoading || isError) return null;
    return React.Children.toArray(
      data.items.map(
        ({
          id,
          message,
          createdAt,
          updatedAt,
          isEdited,
          author,
          likesCount,
          hasLiked,
        }) => {
          return (
            <Message
              me={me}
              id={id}
              message={message}
              author={author}
              isEdited={isEdited}
              createdAt={createdAt}
              updatedAt={updatedAt}
              likesCount={likesCount}
              hasLiked={hasLiked}
              handleSelectMessage={handleSelectMessage}
            />
          );
        },
      ),
    );
  }, [me, data, isLoading, isError]);

  return (
    <>
      <div className={styles.messages}>
        {messages}

        {isLoading && !data && <LoadingMessages count={MIN_LOAD_MESSAGES_COUNT} />}

        {isFetching && data && !isLoading && (
          <LoadingMessages
            count={Math.min(MIN_LOAD_MESSAGES_COUNT, data.totalCount - data.count)}
          />
        )}

        {!isLoading && data && data.count !== data.totalCount && !isFetching && (
          <span className={styles.load_more} onClick={handleLoadMore}>
            Load more <BiChevronDown size={18} />
          </span>
        )}
      </div>

      {selectedMessage && !isDeleting && (
        <Popup className={styles.modal} close={handleCloseModal} isOpen={isModalOpen}>
          <div className={clsx('text', styles.text)}>
            <h2 className="title">Delete message?</h2>

            <p className="desc">
              Are you sure you want to delete your message? This action cannot be undone.
            </p>
          </div>

          <div className={styles.buttons}>
            <Button
              onClick={() => {
                handleCloseModal();
                handleSelectMessage(null);
              }}
            >
              Cancel
            </Button>

            <Button
              theme="blue"
              onClick={() => handleDeleteMessage(selectedMessage.id)}
              load={isDeleting}
            >
              Delete
            </Button>
          </div>
        </Popup>
      )}
    </>
  );
};
export default Messages;

interface LoadingMessagesProps {
  count: number;
}

const LoadingMessages: React.FC<LoadingMessagesProps> = ({ count = 1 }) => {
  return (
    <div className={styles.load}>
      {React.Children.toArray(
        Array.from({ length: count }).map((_) => (
          <div className={styles.message_wrapper}>
            <div className={styles.message}>
              <div className={styles.info}>
                <div className={clsx('loader', styles.logo_wrapper)}></div>

                <div className={styles.user}>
                  <span className={clsx('loader', styles.name)}></span>

                  <p className={clsx('loader', styles.created_at)}></p>
                </div>
              </div>

              <span className={clsx('loader', styles.text)}></span>
            </div>

            <div className={styles.metadata}>
              <span className={clsx('loader', styles.likes)}></span>
            </div>
          </div>
        )),
      )}
    </div>
  );
};

interface MessageProps extends GuestbookMessage {
  me: User | undefined;
  handleSelectMessage: (message: SelectedMessage) => void;
}

const Message: React.FC<MessageProps> = ({
  id,
  author,
  message,
  isEdited,
  createdAt,
  updatedAt,
  likesCount,
  hasLiked,
  me,
  handleSelectMessage,
}) => {
  const [addLike, { isLoading: isLiking }] = useAddMessageLikeMutation();
  const [removeLike, { isLoading: isLikeRemoving }] = useRemoveMessageLikeMutation();

  const [messageLikes, setMessageLikes] = useState<
    Map<number, { count: number; liked: boolean }>
  >(new Map());

  const localLikes = messageLikes.get(id) || {
    count: likesCount,
    liked: hasLiked,
  };

  const handleLike = useCallback(
    async (id: number, currentLikes: number, isLiked: boolean) => {
      if (!me) return;

      setMessageLikes((prev) =>
        new Map(prev).set(id, {
          count: isLiked ? currentLikes - 1 : currentLikes + 1,
          liked: !isLiked,
        }),
      );

      if (isLiking || isLikeRemoving) {
        return;
      }

      try {
        if (isLiked) {
          await removeLike({ id }).unwrap();
        } else {
          await addLike({ id }).unwrap();
        }
      } catch (error: any) {
        if (error.data.status == !409) {
          setMessageLikes((prev) =>
            new Map(prev).set(id, {
              count: isLiked ? currentLikes : currentLikes > 0 ? currentLikes - 1 : 0,
              liked: isLiked,
            }),
          );
        }
        console.error('Failed to update like:', error);
      }
    },
    [me, addLike, isLiking, removeLike, isLikeRemoving],
  );

  return (
    <div key={id} className={styles.message_wrapper}>
      <div className={styles.message}>
        <div className={styles.info}>
          {author.photo && (
            <div className={clsx('logo_wrapper', styles.logo_wrapper)}>
              <Image fill src={author.photo} alt={author.name || 'User'} loading="lazy" />
            </div>
          )}

          <div className={styles.user}>
            <div className={styles.name}>
              {author.name}

              {author.isVerified && (
                <MdVerified color="var(--color-code-markup-heading)" />
              )}
            </div>

            <p className={styles.created_at}>
              {!isEdited ? formatDate(createdAt) : formatDate(updatedAt)}

              {isEdited && <span className={styles.edited}>(edited)</span>}
            </p>
          </div>
        </div>

        {message}
      </div>

      <div className={styles.metadata}>
        <span
          className={clsx(
            styles.likes,
            localLikes.liked && styles.liked,
            !me && styles.disabled,
          )}
          onClick={() => handleLike(id, localLikes.count, localLikes.liked)}
        >
          <FaRegHeart size={15} /> {localLikes.count}
        </span>

        {me && me.email === author.email && (
          <span
            className={styles.del}
            onClick={() => {
              handleSelectMessage({ id, message });
            }}
          >
            <MdDeleteOutline size={18} />
          </span>
        )}
      </div>
    </div>
  );
};
