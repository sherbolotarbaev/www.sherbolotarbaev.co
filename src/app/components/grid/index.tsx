import React from 'react';

import { IImage } from '~/content/home';

import Image from 'next/image';
import Link from 'next/link';

import styles from './styles.module.scss';

interface GridProps {
  images: IImage[];
}

const Grid: React.FC<GridProps> = ({ images }) => {
  return (
    <div className={styles.grid}>
      {React.Children.toArray(
        images.map(({ src, alt, blurDataURL }) => (
          <Link href={src} className={styles.item}>
            <Image
              className={styles.image}
              src={src}
              alt={alt}
              width={1080}
              height={1080}
              loading="lazy"
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          </Link>
        )),
      )}
    </div>
  );
};
export default Grid;
