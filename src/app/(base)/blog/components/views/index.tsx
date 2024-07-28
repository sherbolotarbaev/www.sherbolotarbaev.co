'use client';

import { useAddViewQuery, useGetViewsQuery } from '@/redux/api/blog';

import styles from './styles.module.scss';

interface ViewsProps {
  slug: string;
}

const Views: React.FC<ViewsProps> = ({ slug }) => {
  const { data: allViews } = useGetViewsQuery();

  const viewsForPost = allViews && allViews.find((view) => view.slug === slug);
  const views = new Number(viewsForPost?.count || 0);

  return <span className={styles.views}>{views.toLocaleString()} views</span>;
};
export default Views;

export const ViewsForPost: React.FC<ViewsProps> = ({ slug }) => {
  const { data: viewsForPost } = useAddViewQuery({ slug });
  const views = new Number(viewsForPost?.count || 0);

  return <span className={styles.views}>{views.toLocaleString()} views</span>;
};
