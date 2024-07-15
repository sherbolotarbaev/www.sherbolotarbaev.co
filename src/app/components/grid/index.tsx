import React from 'react';

import { TImage } from 'shared/lib/images';

import Image from 'next/image';
import Link from 'next/link';

import styles from './styles.module.scss';

interface GridProps {
  images: TImage[];
}

export default function Grid({ images }: Readonly<GridProps>) {
  return (
    <div className={styles.grid}>
      {React.Children.toArray(
        images.map(({ src, alt, blurDataURL }) => (
          <Link
            href={src}
            // target="_blank"
            className={styles.item}
          >
            <Image
              className={styles.image}
              src={src}
              alt={alt}
              width={1080}
              height={1080}
              loading="lazy"
              blurDataURL={blurDataURL}
            />
          </Link>
        )),
      )}
    </div>
  );
}
