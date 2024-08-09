'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import clsx from 'clsx';
import Button from 'components/button';
import Link from 'next/link';

import { useMenu } from 'providers/menu';
import { useLockedBody } from 'shared/lib/modal';

import { GoArrowUpRight } from 'react-icons/go';
import { links as items } from '~/content/header';
import styles from './styles.module.scss';

const Menu = () => {
  const pathname = usePathname();
  const { isOpen, toggle } = useMenu();

  useLockedBody(isOpen);

  return (
    <div className={clsx(styles.menu, isOpen && styles.opened)}>
      <div className="wrapper">
        <div className={clsx('container', styles.container)}>
          <ul className={clsx('list-reset', styles.list)}>
            {React.Children.toArray(
              items.map(({ name, href }) => {
                const isCurrentPage = pathname === href;

                return (
                  <li className={styles.item} key={name}>
                    <Link
                      className={clsx(
                        'link',
                        styles.link,
                        isCurrentPage && styles.isCurrent,
                      )}
                      onClick={toggle}
                      href={href}
                    >
                      {name}
                    </Link>
                  </li>
                );
              }),
            )}
          </ul>

          <Button open="/cv/Sherbolot-Arbaev.pdf" pulseAnimation theme="blue">
            Download CV <GoArrowUpRight size={19} />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Menu;
