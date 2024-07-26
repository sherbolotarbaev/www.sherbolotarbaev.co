import clsx from 'clsx';
import type { Metadata } from 'next';
import { getBlogPosts } from 'shared/lib/blog';

import Posts from './components/posts';

import styles from './styles.module.scss';

export const metadata: Metadata = {
  title: 'Blog',
};

export default function Blog() {
  const blogPosts = getBlogPosts();

  return (
    <>
      <div className={clsx('wrapper', styles.wrapper)}>
        <div className={clsx('container', styles.container)}>
          <h2 className="title">Personal blog</h2>

          <Posts items={blogPosts} />
        </div>
      </div>
    </>
  );
}
