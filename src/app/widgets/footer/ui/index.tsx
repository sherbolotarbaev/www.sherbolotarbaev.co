'use client';

import clsx from 'clsx';
import { useCurrentYear } from '../lib';

import { SocialLinks } from './social-links';

import styles from './styles.module.scss';

export function Footer() {
  const currentYear = useCurrentYear();

  return (
    <footer className={styles.footer}>
      <div className="wrapper">
        <div className={clsx('container', styles.container)}>
          <SocialLinks />

          <div className="desc">© {currentYear} Sherbolot Arbaev</div>
        </div>
      </div>
    </footer>
  );
}
