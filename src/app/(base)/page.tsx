import React from 'react';
import { siteConfig } from '~/config/site';
import clsx from 'clsx';

import { getBase64 } from 'shared/lib/blur-data-url';
import { getImagesWithBlur } from 'shared/lib/images';

import Image from 'next/image';
import Badge, { LanguageBadge } from 'components/badge';
import Link from 'next/link';
import Grid from 'components/grid';

import { skills } from '~/content/home';
import sherbolot from 'public/images/sherbolot.webp';
import { BiLogoGithub, BiLogoLinkedin } from 'react-icons/bi';
import { X } from 'public/svg';
import styles from './styles.module.scss';

export default async function Home() {
  const sherbolotBlurDataUrl = await getBase64('sherbolot.webp');
  const images = await getImagesWithBlur();

  return (
    <>
      <div className={clsx('wrapper', styles.wrapper)} style={{ minHeight: '100vh' }}>
        <div className={clsx('container', styles.container)}>
          <div className={styles.content_container}>
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

            <div className="text">
              <h2 className="title">
                Sher Arbaev
                <Badge href="https://www.wedevx.co">
                  <X style={{ width: '1rem', margin: ' 0.25rem 0' }} />
                </Badge>
              </h2>

              <p className="desc">Software Engineer | Full Stack Developer</p>
            </div>

            <p className="desc">
              <Badge href="https://github.com/sherbolotarbaev">
                <BiLogoGithub size={15} /> GitHub
              </Badge>

              <Badge href="https://www.linkedin.com/in/sherbolotarbaev">
                <BiLogoLinkedin size={15} /> LinkedIn
              </Badge>
            </p>
          </div>

          <p
            className="desc"
            dangerouslySetInnerHTML={{
              __html: `I'm a software engineer from Kyrgyzstan 🇰🇬. <br />
              I'm fascinated by large-scale, high-impact products and contributed to major feature launches in industry-leading services.`,
            }}
          ></p>
        </div>

        <div className={clsx('container', styles.container)}>
          <h2 className="title highlight">currently cooking 👨‍🍳</h2>

          <div className="text">
            <Link className="subtitle link" href="">
              Some project
            </Link>

            <p className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>

          <div className="text">
            <Link className="subtitle link" href="">
              Some project
            </Link>

            <p className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>

          <div className="text">
            <Link className="subtitle link" href="">
              Some project
            </Link>

            <p className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>

        <div className={clsx('container', styles.container)}>
          <h2 className="title highlight">tech stack 🦾</h2>

          <p className="desc">
            {React.Children.toArray(
              skills.map((skill) => (
                <LanguageBadge href={skill.href}>
                  {<skill.icon size={12} />} {skill.name}
                </LanguageBadge>
              )),
            )}
          </p>
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
