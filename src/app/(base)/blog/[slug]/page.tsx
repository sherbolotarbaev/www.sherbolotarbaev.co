import type { Metadata } from 'next';
import { siteConfig } from '~/config/site';

import { getViews } from '@/redux/api/blog/server';
import clsx from 'clsx';
import { notFound, redirect } from 'next/navigation';

import { getMe } from '@/redux/api/me/server';
import { getBlogPosts } from 'shared/lib/blog';
import { formatDate, formatDate2 } from 'shared/lib/date';

import MDXContent from 'components/mdx';
import Image from 'next/image';
import { ViewsForPost } from '../components/views';

import styles from './styles.module.scss';

interface GenerateMetadataProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params: { slug },
}: Readonly<GenerateMetadataProps>): Promise<Metadata | undefined> {
  const post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;

  const ogImage = image
    ? `${siteConfig.url}${image}`
    : `${siteConfig.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${siteConfig.url}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
  };
}

interface PostProps {
  params: { slug: string };
}

export default async function Post({ params: { slug } }: Readonly<PostProps>) {
  const post = getBlogPosts().find((post) => post.slug === slug);
  const views = await getViews();

  if (!post) {
    return notFound();
  }

  if (post.metadata.private === 'true') {
    const me = await getMe();

    if (!me) {
      return redirect(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/sign-in?next=/blog/${post.slug}`,
      );
    }

    if (me.email && !me.email.endsWith('@wedevx.co')) {
      return (
        <>
          <section className={clsx('wrapper', styles.wrapper)}>
            <div className={clsx('container', styles.container)}>
              <div className="text">
                <h2 className="title">Access Denied 🥲</h2>

                <p className="desc">
                  Oh no! It seems you do not have permission to access this resource.
                </p>
              </div>
            </div>
          </section>
        </>
      );
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${siteConfig.url}${post.metadata.image}`
              : `${siteConfig.url}/og?title=${post.metadata.title}`,
            url: `${siteConfig.url}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: post.metadata.author,
            },
          }),
        }}
      />

      <section className={clsx('wrapper', styles.wrapper)}>
        <div className={clsx('container', styles.container)}>
          <div className={clsx('text', styles.text)}>
            <h2 className={clsx('title', styles.title)}>{post.metadata.title}</h2>

            <p className={clsx('desc', styles.date)}>
              {formatDate2(post.metadata.publishedAt)} (
              {formatDate(post.metadata.publishedAt)})
              <ViewsForPost slug={post.slug} allViews={views} />
            </p>
          </div>

          {post.metadata.image && (
            <div className={styles.image_wrapper}>
              <Image
                className={styles.image}
                width={700}
                height={350}
                src={`${siteConfig.url}${post.metadata.image}`}
                alt={post.metadata.title}
                loading="lazy"
              />
            </div>
          )}

          <div className={clsx('text', styles.text)}>
            <p className={clsx('desc', styles.desc)}>{post.metadata.summary}</p>
          </div>

          <MDXContent source={post.content} />
        </div>
      </section>
    </>
  );
}
