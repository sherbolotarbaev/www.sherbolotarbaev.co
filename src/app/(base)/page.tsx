import { siteConfig } from '~/config/site';
import clsx from 'clsx';

import { getBase64 } from 'shared/lib/blur-data-url';
import { getImagesWithBlur } from 'shared/lib/images';

import Image from 'next/image';
import Button from 'components/button';
import Grid from 'components/grid';
import Badge from 'components/badge';

import sherbolot from 'public/images/sherbolot.webp';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { SiNestjs, SiNextdotjs, SiTypescript } from 'react-icons/si';
import styles from './styles.module.scss';

export default async function Home() {
  const sherbolotBlurDataUrl = await getBase64('sherbolot.webp');
  const images = await getImagesWithBlur();

  return (
    <>
      <div className={clsx('wrapper', styles.wrapper)}>
        <div className={clsx('container', styles.container)}>
          <div className="logo_wrapper gradient">
            <Image
              className="logo"
              src={sherbolot}
              alt={siteConfig.name}
              loading="lazy"
              layout="fill"
              placeholder="blur"
              blurDataURL={sherbolotBlurDataUrl}
            />
          </div>

          <h2 className="title">{"hey, I'm Sher 👋"}</h2>

          <p className="desc">
            {
              "I'm a software engineer from Kyrgyzstan 🇰🇬. I'm fascinated by large-scale, high-impact products and contributed to major feature launches in industry-leading services."
            }
          </p>

          <Button width={195} open="/cv/sherbolot-arbaev.pdf">
            📢 Available for Work <IoIosArrowRoundForward size={19} />
          </Button>
        </div>

        <div className={clsx('container', styles.container)}>
          <p className="desc">
            {"I'm good at"}
            <Badge href="https://nextjs.org/">
              <SiNextdotjs /> Next.js
            </Badge>
            ,
            <Badge href="https://nestjs.com/">
              <SiNestjs /> Nest.js
            </Badge>
            ,
            <Badge href="https://www.typescriptlang.org/">
              <SiTypescript /> TypeScript
            </Badge>
          </p>
        </div>

        <div className={clsx('container', styles.container)}>
          <h2 className="title">Gallery</h2>

          <p className="desc">
            {
              "I love capturing beautiful places around me. Here are some of the pictures I've taken."
            }
          </p>

          <Grid images={images} />
        </div>
      </div>
    </>
  );
}
