'use client';

import React, { useCallback, useMemo, useState } from 'react';

import { useGetGuestbookMessagesQuery } from '@/redux/api/guestbook';
import clsx from 'clsx';
import { formatDate } from 'shared/lib/date';
import { MAX_LOAD_MESSAGES_COUNT, MIN_LOAD_MESSAGES_COUNT } from './constants';

import Image from 'next/image';

import { BiChevronDown } from 'react-icons/bi';
import { MdVerified } from 'react-icons/md';
import styles from './styles.module.scss';

interface MessagesProps {
  me?: User | undefined;
}

const Messages: React.FC<MessagesProps> = ({ me }) => {
  const [take, setTake] = useState<number>(MAX_LOAD_MESSAGES_COUNT);
  const { data, isLoading, isError, isFetching, refetch } = useGetGuestbookMessagesQuery({
    take,
  });

  const handleLoadMore = useCallback(() => {
    setTake(
      (prevTake) =>
        prevTake +
        (data
          ? Math.min(MIN_LOAD_MESSAGES_COUNT, data.totalCount - data.count)
          : MIN_LOAD_MESSAGES_COUNT),
    );
    refetch();
  }, [refetch]);

  const messages = useMemo(() => {
    if (!data || isLoading || isError) return null;
    return React.Children.toArray(
      data.items.map(({ message, createdAt, author }) => (
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
        </div>
      )),
    );
  }, [data, isLoading, isError]);

  return (
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
