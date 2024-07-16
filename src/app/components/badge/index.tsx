'use client';

import Link from 'next/link';

import styles from './styles.module.scss';

interface BadgeProps {
  children: React.ReactNode;
  href: string;
}

export default function Badge({ children, href }: Readonly<BadgeProps>) {
  return (
    <Link className={styles.badge} href={href} target="_blank">
      {children}
    </Link>
  );
}
