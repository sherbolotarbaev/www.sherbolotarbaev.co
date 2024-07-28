import clsx from 'clsx';
import type { MDXComponents } from 'mdx/types';
import type { ImageProps } from 'next/image';
import type { ComponentPropsWithoutRef } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import Copy from './copy';

import { geistMono, geistSans } from 'shared/lib/fonts';
import styles from './styles.module.scss';

interface DivProps extends ComponentPropsWithoutRef<'div'> {
  'data-language'?: string;
  'data-rehype-pretty-code-fragment'?: string;
  'data-rehype-pretty-code-title'?: string;
  raw?: string;
}

const slugify = (str: string) => {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
};

export const components: MDXComponents = {
  Image: ({ alt, className, ...props }: ImageProps) => {
    return (
      <div className={styles.image_wrapper}>
        <Image
          className={styles.image}
          style={{ border: 0 }}
          width={700}
          height={350}
          alt={alt}
          loading="lazy"
          {...props}
        />
      </div>
    );
  },
  a: ({ href, ...props }) =>
    href ? (
      <Link className={clsx('link', styles.link)} href={href} target="_blank">
        {props.children}
      </Link>
    ) : null,
  code: ({ className, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const languageMatch = className?.match(/language-(\w+)/);
    const language = languageMatch ? languageMatch[1] : undefined;

    return (
      <code
        className={clsx(styles.code, language && styles.lang)}
        style={{
          ...geistSans.style,
          ...geistMono.style,
        }}
        {...props}
      />
    );
  },
  div: ({ children, className, raw, ...props }: DivProps) => {
    const language = props['data-language'];

    if (props['data-rehype-pretty-code-title'] !== undefined || language !== undefined) {
      return <div>{children}</div>;
    }

    if (props['data-rehype-pretty-code-fragment'] !== undefined && raw) {
      return <div {...props}>{children}</div>;
    }

    return <div {...props}>{children}</div>;
  },
  h1: ({ children }: ComponentPropsWithoutRef<'h1'>) => {
    const slug = children ? slugify(children.toString()) : '';

    return (
      <a key={`link-${slug}`} href={`#${slug}`}>
        <h1 id={slug} className={styles.h1}>
          {children}
        </h1>
      </a>
    );
  },
  h2: ({ children }: ComponentPropsWithoutRef<'h2'>) => {
    const slug = children ? slugify(children.toString()) : '';

    return (
      <a key={`link-${slug}`} href={`#${slug}`}>
        <h2 id={slug} className={styles.h2}>
          {children}
        </h2>
      </a>
    );
  },
  h3: ({ children }: ComponentPropsWithoutRef<'h3'>) => {
    const slug = children ? slugify(children.toString()) : '';

    return (
      <a key={`link-${slug}`} href={`#${slug}`}>
        <h3 id={slug} className={styles.h3}>
          {children}
        </h3>
      </a>
    );
  },
  h4: ({ children }: ComponentPropsWithoutRef<'h4'>) => {
    const slug = children ? slugify(children.toString()) : '';

    return (
      <a key={`link-${slug}`} href={`#${slug}`}>
        <h4 id={slug} className={styles.h4}>
          {children}
        </h4>
      </a>
    );
  },
  h5: () => null,
  h6: () => null,
  p: ({ children }: ComponentPropsWithoutRef<'p'>) => {
    return <p className={styles.p}>{children}</p>;
  },
  pre: ({ children }: ComponentPropsWithoutRef<'pre'>) => {
    const codeContent = (children as any).props.raw || '';

    return (
      <div className={styles.code_wrapper}>
        <Copy content={codeContent} />

        <pre className={styles.pre} style={geistMono.style}>
          {children}
        </pre>
      </div>
    );
  },
  ul: ({ children }: ComponentPropsWithoutRef<'ul'>) => {
    return <ul className={styles.ul}>{children}</ul>;
  },
  ol: ({ children }: ComponentPropsWithoutRef<'ol'>) => {
    return <ol className={styles.ol}>{children}</ol>;
  },
  li: ({ children }: ComponentPropsWithoutRef<'li'>) => {
    return <li className={styles.li}>{children}</li>;
  },
  strong: ({ children }: ComponentPropsWithoutRef<'strong'>) => {
    return <strong className={styles.strong}>{children}</strong>;
  },
  blockquote: ({ children }: ComponentPropsWithoutRef<'blockquote'>) => {
    return <blockquote className={styles.blockquote}>{children}</blockquote>;
  },
  del: ({ children }: ComponentPropsWithoutRef<'del'>) => {
    return <del className={styles.del}>{children}</del>;
  },
};
