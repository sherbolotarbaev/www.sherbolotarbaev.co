'use client';

import clsx from 'clsx';
import { useHeaderFixed } from '../lib';

import Nav from './nav';
import Button from '@/components/button';

import { GoArrowUpRight } from 'react-icons/go';
import styles from './styles.module.scss';

export function Header() {
  const { isFixed, isStarted } = useHeaderFixed();

  return (
    <header
      className={clsx(styles.header, {
        [styles.fixed]: isFixed,
        [styles.started]: isStarted,
      })}
    >
      <div className="wrapper">
        <div className={clsx('container', styles.container)}>
          <div className={styles.row}>
            <Nav />
          </div>

          <div className={styles.row}>
            <Button
              width={195}
              open="/cv/sherbolot-arbaev.pdf"
              pulseAnimation
              theme="blue"
            >
              Download CV <GoArrowUpRight size={19} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
