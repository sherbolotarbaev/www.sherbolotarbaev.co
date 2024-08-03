import clsx from 'clsx';
import type { Metadata } from 'next';
import { getBlogPosts } from 'shared/lib/blog';

import { getViews } from '~/app/redux/api/blog/ssr';

import Posts from './components/posts';

import styles from './styles.module.scss';

export const metadata: Metadata = {
  title: 'Blog',
};

export default async function Blog() {
  const blogPosts = getBlogPosts();
  const views = await getViews();

  return (
    <>
      <div className={clsx('wrapper', styles.wrapper)}>
        <div className={clsx('container', styles.container)}>
          <h2 className="title">personal blog</h2>

          <Posts items={blogPosts} views={views} />
        </div>
      </div>
    </>
  );
}
