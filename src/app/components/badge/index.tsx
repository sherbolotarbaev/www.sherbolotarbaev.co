'use client';

import Link from 'next/link';

import { geistMono } from '~/app/shared/lib/fonts';
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

export function LanguageBadge({ children, href }: Readonly<BadgeProps>) {
  return (
    <Link className={styles.badge} href={href} target="_blank" style={geistMono.style}>
      {children}
    </Link>
  );
}
