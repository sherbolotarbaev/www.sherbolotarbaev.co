'use client';

import { useSearchParams } from 'next/navigation';
import { siteConfig } from '~/config/site';

import Image from 'next/image';
import Link from 'next/link';

import logo from 'public/images/logo.png';

const Logo = () => {
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/';

  return (
    <Link
      className={'logo_wrapper'}
      href={next}
      style={{
        width: '2.56rem',
        height: '2.56rem',
      }}
    >
      <Image
        className="logo"
        src={logo}
        alt={siteConfig.name}
        loading="lazy"
        layout="fill"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAT0lEQVR4nAFEALv/AAAAAADJyckztra2RgAAAAIAxMTEP+Li4vb9/f3/xsbGgwDDw8OK6+vr/83Nze2YmJiDAFxcXBtqampdQEBAGwAAAACyHSHCm4RaSAAAAABJRU5ErkJggg=="
      />
    </Link>
  );
};
export default Logo;
