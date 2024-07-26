'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import { links as items } from '~/content/header';
import styles from './styles.module.scss';

export const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <ul className={clsx('list-reset', styles.list)}>
        {React.Children.toArray(
          items.map((item) => {
            const isCurrentPage = pathname === item.href;

            return (
              <li className={styles.item} key={item.name}>
                <Link
                  className={clsx('link', styles.link, isCurrentPage && styles.isCurrent)}
                  href={item.href}
                >
                  {item.name}
                </Link>
              </li>
            );
          }),
        )}
      </ul>
    </nav>
  );
};
export default Nav;
