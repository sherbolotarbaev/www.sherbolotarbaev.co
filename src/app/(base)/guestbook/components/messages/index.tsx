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
  'updatedAt' | 'isEdited' | 'likesCount' | 'hasLiked'
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
  const [addLike, { isLoading: isLiking }] = useAddMessageLikeMutation();
  const [removeLike, { isLoading: isLikeRemoving }] = useRemoveMessageLikeMutation();

  const [messageLikes, setMessageLikes] = useState<
    Map<number, { count: number; liked: boolean }>
  >(new Map());

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
      } catch (error) {
        setMessageLikes((prev) =>
          new Map(prev).set(id, {
            count: isLiked ? currentLikes : currentLikes > 0 ? currentLikes - 1 : 0,
            liked: isLiked,
          }),
        );
        console.error('Failed to update like:', error);
      }
    },
    [me, addLike, isLiking, removeLike, isLikeRemoving],
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
      data.items.map(({ id, message, createdAt, author, likesCount, hasLiked }) => {
        const localLikes = messageLikes.get(id) || { count: likesCount, liked: hasLiked };

        return (
          <div className={styles.message_wrapper}>
            <div key={id} className={styles.message}>
              {author.photo && (
                <div className={clsx('logo_wrapper', styles.logo_wrapper)}>
                  <Image
                    className="logo"
                    width={30}
                    height={30}
                    src={author.photo}
                    alt={author.name || 'User'}
                    loading="lazy"
                  />
                </div>
              )}

              <div className={styles.info}>
                <div className={styles.name}>
                  {author.name}

                  {author.isVerified && (
                    <MdVerified color="var(--color-code-markup-heading)" />
                  )}

                  <span className={styles.created_at}>{formatDate(createdAt)}</span>
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
              </div>
            </div>

            {me && me.email === author.email && (
              <span
                className={styles.del}
                onClick={() => {
                  handleSelectMessage({ id, message, author, createdAt });
                }}
              >
                <MdDeleteOutline size={18} />
              </span>
            )}
          </div>
        );
      }),
    );
  }, [me, data, isLoading, isError, handleLike, messageLikes]);

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

      {selectedMessage && (
        <Popup className={styles.modal} close={handleCloseModal} isOpen={isModalOpen}>
          <div className={clsx('text', styles.text)}>
            <h2 className="title">Are you sure you want to delete this message?</h2>

            <p className="desc">{selectedMessage.message}</p>
          </div>

          <div className={styles.buttons}>
            <Button
              theme="blue"
              onClick={() => handleDeleteMessage(selectedMessage.id)}
              load={isDeleting}
            >
              Yes
            </Button>

            <Button
              onClick={() => {
                handleCloseModal();
                handleSelectMessage(null);
              }}
              theme="red"
            >
              Cancel
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
              <div className={styles.logo_wrapper}></div>

              <div className={styles.info}>
                <span className={styles.name}></span>

                <span className={styles.text}></span>
              </div>
            </div>
          </div>
        )),
      )}
    </div>
  );
};
