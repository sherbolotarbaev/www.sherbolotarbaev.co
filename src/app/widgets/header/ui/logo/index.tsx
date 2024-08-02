'use client';

import { siteConfig } from '~/config/site';

import clsx from 'clsx';
import { useMenu } from 'providers/menu';

import Image from 'next/image';
import Link from 'next/link';

import logo from 'public/images/logo.png';
import styles from './styles.module.scss';

const Logo = () => {
  const { isOpen, toggle } = useMenu();

  return (
    <Link
      className={clsx('logo_wrapper', styles.logo_wrapper)}
      href="/"
      onClick={isOpen ? toggle : undefined}
    >
      <Image
        className="logo"
        src={logo}
        alt={siteConfig.name}
        loading="lazy"
        layout="fill"
      />
    </Link>
  );
};
export default Logo;
