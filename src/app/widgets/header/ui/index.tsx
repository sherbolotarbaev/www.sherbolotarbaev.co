'use client';

import clsx from 'clsx';
import { useHeaderFixed } from '../lib';

import Burger from './burger';
import Logo from './logo';
import Menu from './menu';
import Nav from './nav';

import styles from './styles.module.scss';

export const Header = () => {
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
          <Logo />
          <Nav />

          <Burger />
        </div>
      </div>

      <Menu />
    </header>
  );
};
