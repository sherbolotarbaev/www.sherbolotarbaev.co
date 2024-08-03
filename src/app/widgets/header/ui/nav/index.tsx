'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import clsx from 'clsx';
import Button from 'components/button';
import Link from 'next/link';

import { GoArrowUpRight } from 'react-icons/go';
import { links as items } from '~/content/header';
import styles from './styles.module.scss';

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <ul className={clsx('list-reset', styles.list)}>
        {React.Children.toArray(
          items.map(({ name, href }) => {
            const isCurrentPage = pathname === href;

            return (
              <li className={styles.item} key={name}>
                <Link
                  className={clsx('link', styles.link, isCurrentPage && styles.isCurrent)}
                  href={href}
                >
                  {name}
                </Link>
              </li>
            );
          }),
        )}
      </ul>

      <Button width={135} open="/cv/sherbolot-arbaev.pdf" pulseAnimation theme="blue">
        Download CV <GoArrowUpRight size={19} />
      </Button>
    </nav>
  );
};
export default Nav;
