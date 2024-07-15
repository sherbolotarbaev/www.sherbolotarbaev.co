'use client';

import React from 'react';

import clsx from 'clsx';

import Link from 'next/link';

import { links as items } from '~/content/footer';
import { GoArrowUpRight } from 'react-icons/go';
import styles from './styles.module.scss';

export function SocialLinks() {
  return (
    <ul className={clsx('list-reset', styles.list)}>
      {React.Children.toArray(
        items.map((item) => (
          <li className={styles.item} key={item.name}>
            <Link className={styles.link} href={item.href} target="_blank">
              <GoArrowUpRight size={19} />
              {item.name}
            </Link>
          </li>
        )),
      )}
    </ul>
  );
}
