'use client';

import Link from 'next/link';

import { geistMono } from 'shared/lib/fonts';
import styles from './styles.module.scss';

interface BadgeProps {
  children: React.ReactNode;
  href: string;
}

const Badge: React.FC<BadgeProps> = ({ children, href }) => {
  return (
    <Link className={styles.badge} href={href} target="_blank">
      {children}
    </Link>
  );
};
export default Badge;

export const LanguageBadge: React.FC<BadgeProps> = ({ children, href }) => {
  return (
    <Link className={styles.badge} href={href} target="_blank" style={geistMono.style}>
      {children}
    </Link>
  );
};
