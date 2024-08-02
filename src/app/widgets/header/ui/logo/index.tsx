'use client';

import { siteConfig } from '~/config/site';

import { useMenu } from 'providers/menu';

import Image from 'next/image';
import Link from 'next/link';

import logo from 'public/images/logo.png';

const Logo = () => {
  const { isOpen, toggle } = useMenu();

  return (
    <Link
      className="logo_wrapper"
      href="/"
      onClick={isOpen ? toggle : undefined}
      style={{
        width: '2.2rem',
        height: '2.2rem',
        zIndex: '3 !important',
      }}
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
