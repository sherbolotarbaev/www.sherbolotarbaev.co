import path from 'node:path';

import { getMDXData, getRecentMDXData } from './mdx/get-mdx-data';
import type { Metadata } from './mdx/parse-frontmatter';

export interface Post {
  metadata: Metadata;
  slug: string;
  content: string;
}

export function getBlogPosts(): Post[] {
  const dir = 'src/content/blog';
  return getMDXData(path.join(process.cwd(), dir));
}

export function getRecentBlogPosts(): Post[] {
  const dir = 'src/content/blog';
  return getRecentMDXData(path.join(process.cwd(), dir));
}
