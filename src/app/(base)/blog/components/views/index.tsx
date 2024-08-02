'use client';

import { useAddViewQuery } from '@/redux/api/blog';
import { useMemo } from 'react';

import styles from './styles.module.scss';

interface ViewsProps {
  slug: string;
  allViews: View[];
}

const Views: React.FC<ViewsProps> = ({ slug, allViews }) => {
  const viewsForPost = useMemo(
    () => allViews.find((view) => view.slug === slug),
    [slug, allViews],
  );
  const count = viewsForPost?.count || 0;

  return <span className={styles.views}>{count.toLocaleString()} views</span>;
};
export default Views;

export const ViewsForPost: React.FC<ViewsProps> = ({ slug, allViews }) => {
  const { data } = useAddViewQuery({ slug });
  const fetchedCount = data?.count;
  const viewsForPost = useMemo(
    () => allViews.find((view) => view.slug === slug),
    [slug, allViews],
  );
  const count = fetchedCount ?? viewsForPost?.count ?? 0;

  return <span className={styles.views}>{count.toLocaleString()} views</span>;
};
