import type { Metadata } from 'next';

import styles from './styles.module.scss';
import { getMe } from '@/redux/api/me/server';

export const metadata: Metadata = {
  title: 'Authorization',
};

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: Readonly<AuthLayoutProps>) {
  const me = await getMe();
  console.log({ me });
  return (
    <>
      <main className={styles.main}>{children}</main>
    </>
  );
}
