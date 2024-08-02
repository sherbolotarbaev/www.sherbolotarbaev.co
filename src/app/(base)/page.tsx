import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { siteConfig } from '~/config/site';

import Badge from 'components/badge';
import { GridLoad } from 'components/grid';
import Image from 'next/image';
import Link from 'next/link';
import Skills from './components/skills';

import sherbolot from 'public/images/sherbolot.webp';
import { BiLogoGithub, BiLogoLinkedin } from 'react-icons/bi';
import { images } from '~/content/home';
import styles from './styles.module.scss';

const Grid = dynamic(() => import('components/grid'), {
  ssr: false,
  loading: () => <GridLoad images={images} />,
});

export default function Home() {
  return (
    <>
      <div className={clsx('wrapper', styles.wrapper)}>
        <div className={clsx('container', styles.container)}>
          <div className={styles.content_container}>
            <div className="logo_wrapper">
              <Image
                className="logo"
                src={sherbolot}
                alt={siteConfig.name}
                loading="lazy"
                layout="fill"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAAMklEQVR4nAEnANj/ANTe4JSQkOvl21diZQC/rqNwZmvItraVn6kAAAwYdpqq8O/z8/j3vaUXBBJEHV0AAAAASUVORK5CYII="
              />
            </div>

            <div className="text">
              <h2 className="title">Sher Arbaev</h2>

              <p className="desc">Software Engineer | Full Stack Developer</p>
            </div>

            <p className={clsx('desc', styles.desc)}>
              <Badge href="https://github.com/sherbolotarbaev">
                <BiLogoGithub size={15} /> GitHub
              </Badge>

              <Badge href="https://www.linkedin.com/in/sherbolotarbaev">
                <BiLogoLinkedin size={15} /> LinkedIn
              </Badge>
            </p>
          </div>

          <p className="desc">
            {`I'm a software engineer from Kyrgyzstan 🇰🇬. I'm fascinated by large-scale, high-impact products and contributed to major
            feature launches in industry-leading services.`}
          </p>
        </div>

        <div className={clsx('container', styles.container)}>
          <h2 className="title highlight">tech stack 🦾</h2>

          <Skills />
        </div>

        <div className={clsx('container', styles.container)}>
          <h2 className="title highlight">currently cooking 👨‍🍳</h2>

          <div className="text">
            <Link
              className="subtitle link"
              target="_blank"
              href="https://github.com/sherbolotarbaev/api"
            >
              Personal API
            </Link>

            <p className="desc">
              built with Nest JS, TypeScript, Prisma, PostgreSQL and Supabase.
            </p>
          </div>

          <div className="text">
            <Link
              className="subtitle link"
              target="_blank"
              href="https://github.com/sherbolotarbaev/chinatradex"
            >
              China TradeX
            </Link>

            <p className="desc">Business with China - Alibaba | 1688 | Poizon | Taobao</p>
          </div>
        </div>

        <div className={clsx('container', styles.container)}>
          <h2 className="title highlight">gallery 🏞️</h2>

          <div className="text">
            <p className="desc">
              {
                "I love capturing beautiful places around me. Here are some of the pictures I've taken."
              }
            </p>
          </div>

          <Grid images={images} />
        </div>
      </div>
    </>
  );
}
