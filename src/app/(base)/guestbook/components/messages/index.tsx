'use client';

import React, { useCallback, useMemo, useState } from 'react';

import {
  useDeleteGuestbookMessageMutation,
  useGetGuestbookMessagesQuery,
} from '@/redux/api/guestbook';
import clsx from 'clsx';
import { formatDate } from 'shared/lib/date';
import { toast } from 'sonner';
import { MAX_LOAD_MESSAGES_COUNT, MIN_LOAD_MESSAGES_COUNT } from './constants';

import Button from 'components/button';
import Popup from 'components/popup';
import Image from 'next/image';

import { BiChevronDown } from 'react-icons/bi';
import { MdDeleteOutline, MdVerified } from 'react-icons/md';
import styles from './styles.module.scss';

type SelectedMessage = Omit<GuestbookMessage, 'updatedAt' | 'isEdited'>;

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
    setSelectedMessage(message);
  };

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDeleteMessage = (id: number) => {
    toast.promise(deleteMessage(id).unwrap(), {
      position: 'bottom-right',
      loading: 'Deleting...',
      success: () => {
        setIsModalOpen(false);
        setSelectedMessage(null);
        return 'Successfully deleted';
      },
      error: (error) => {
        return error.data?.message || 'Try again. Something happened on our end';
      },
    });
  };

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
      data.items.map(({ id, message, createdAt, author }) => (
        <div className={styles.message}>
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

          {me && me.email === author.email && (
            <span
              className={styles.del}
              onClick={() => {
                setIsModalOpen(true);
                handleSelectMessage({ id, message, author, createdAt });
              }}
            >
              <MdDeleteOutline />
            </span>
          )}
        </div>
      )),
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

      {selectedMessage && (
        <Popup className={styles.modal} close={handleOpenModal} isOpen={isModalOpen}>
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
                handleOpenModal();
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
        Array.from({ length: count }).map((_, index) => (
          <div key={index} className={styles.message}>
            <div className={styles.logo_wrapper}></div>

            <div className={styles.info}>
              <span className={styles.name}></span>

              <span className={styles.text}></span>
            </div>
          </div>
        )),
      )}
    </div>
  );
};
