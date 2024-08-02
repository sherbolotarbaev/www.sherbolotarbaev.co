'use client';

import clsx from 'clsx';
import type { Post } from 'shared/lib/blog';
import { formatDate, getDiffHours } from 'shared/lib/date';

import Link from 'next/link';
import Views from '../views';

import styles from './styles.module.scss';

interface PostsProps {
  items: Post[];
  views: View[];
}

const Posts: React.FC<PostsProps> = ({ items, views }) => {
  return (
    <div className={styles.posts}>
      {items
        .filter((post) => post.metadata.private === 'false')
        .map((post, index) => (
          <Link
            className={clsx('link', styles.post)}
            href={`/blog/${post.slug}`}
            key={index}
          >
            <h3 className={clsx('title', styles.title)}>
              {post.metadata.title}
              {getDiffHours(post.metadata.publishedAt) <= 24 && (
                <span className={styles.new}>today</span>
              )}
            </h3>

            <p className={clsx('desc', styles.date)}>
              {formatDate(post.metadata.publishedAt)}

              <Views slug={post.slug} allViews={views} />
            </p>
          </Link>
        ))}
    </div>
  );
};
export default Posts;
