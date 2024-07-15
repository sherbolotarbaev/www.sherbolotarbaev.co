'use client';

import clsx from 'clsx';
import { useHeaderFixed } from '../lib';

import { Nav } from './nav';

import styles from './styles.module.scss';

export function Header() {
  const { isFixed } = useHeaderFixed();

  return (
    <header
      className={clsx(styles.header, {
        [styles.fixed]: isFixed,
      })}
    >
      <div className="wrapper">
        <div className={clsx('container', styles.container)}>
          <div className={styles.row}>
            <Nav />
          </div>
        </div>
      </div>
    </header>
  );
}
