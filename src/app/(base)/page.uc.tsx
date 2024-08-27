'use client';

import { memo, useEffect, useState } from 'react';

import clsx from 'clsx';
import { siteConfig } from '~/config/site';

import Badge from 'components/badge';
import Button from 'components/button';
import Popup from 'components/popup';
import Image from 'next/image';
import Link from 'next/link';
import Experience from './components/experience';
import Form from './components/form';
import Skills from './components/skills';

import sherbolot from 'public/images/sherbolot.webp';
import { BiEnvelope, BiLogoGithub, BiLogoLinkedin } from 'react-icons/bi';
import styles from './styles.module.scss';

// const Grid = dynamic(() => import('components/grid'), {
//   ssr: false,
//   loading: () => <GridLoad images={images} />,
// });

const SocialMediaIcons = memo(() => {
  return (
    <p className={clsx('desc', styles.desc)}>
      <Badge href="https://github.com/sherbolotarbaev">
        <BiLogoGithub size={15} /> GitHub
      </Badge>

      <Badge href="https://www.linkedin.com/in/sherbolotarbaev">
        <BiLogoLinkedin size={15} /> LinkedIn
      </Badge>

      <Badge href="mailto:arbaevsherbolot@gmail.com">
        <BiEnvelope size={15} /> Email
      </Badge>
    </p>
  );
});

export default function HomeClient() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#contact') {
        setIsModalOpen(true);
      } else {
        setIsModalOpen(false);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

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

            <SocialMediaIcons />
          </div>

          <p className="desc">
            {`I'm a software engineer from Kyrgyzstan 🇰🇬. I'm fascinated by large-scale, high-impact products and contributed to major
            feature launches in industry-leading services.`}
          </p>

          <Button width={120} onClick={() => setIsModalOpen(true)}>
            Contact
          </Button>
        </div>

        <div className={clsx('container', styles.container)}>
          <h2 className="title highlight">Tech stack 🦾</h2>

          <Skills />
        </div>

        <div className={clsx('container', styles.container)}>
          <h2 className="title highlight">My experience 🧠</h2>

          <Experience />
        </div>

        <div className={clsx('container', styles.container)}>
          <h2 className="title highlight">Currently cooking 👨‍🍳</h2>

          <div className="text">
            <Link
              className="title link"
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
              className="title link"
              target="_blank"
              href="https://github.com/sherbolotarbaev/chinatradex"
            >
              China TradeX
            </Link>

            <p className="desc">Business with China - Alibaba | 1688 | Poizon | Taobao</p>
          </div>
        </div>

        {/* <div className={clsx('container', styles.container)}>
          <h2 className="title highlight">gallery 🏞️</h2>

          <div className="text">
            <p className="desc">
              {
                "I love capturing beautiful places around me. Here are some of the pictures I've taken."
              }
            </p>
          </div>

          <Grid images={images} />
        </div> */}
      </div>

      <Popup className={styles.modal} close={handleCloseModal} isOpen={isModalOpen}>
        <Form handleCloseModal={handleCloseModal} />
      </Popup>
    </>
  );
}
