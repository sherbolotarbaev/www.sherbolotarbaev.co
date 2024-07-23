import type { Metadata } from 'next';

import styles from './styles.module.scss';

export const metadata: Metadata = {
  title: 'Authorization',
};

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Readonly<AuthLayoutProps>) {
  return (
    <>
      <main className={styles.main}>{children}</main>
    </>
  );
}
