import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';

import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';

import { components } from './components';

import './atom-one-dark-reasonable.scss';

type MDXContentProps = Omit<MDXRemoteProps, 'components'>;

const rawCodePlugin = () => (tree: any) => {
  visit(tree, 'element', (node) => {
    if (node.tagName === 'pre') {
      const [codeEl] = node.children;
      if (codeEl.tagName === 'code') {
        node.raw = codeEl.children?.[0]?.value;
      }
    }
  });

  visit(tree, 'element', (node) => {
    if (node.tagName === 'pre') {
      for (const child of node.children) {
        if (child.tagName === 'code') {
          child.properties['raw'] = node.raw;
        }
      }
    }
  });
};

const MDXContent: React.FC<MDXContentProps> = (props) => {
  return (
    // @ts-expect-error
    <MDXRemote
      {...props}
      components={components}
      options={{
        parseFrontmatter: true,
        mdxOptions: {
          rehypePlugins: [rawCodePlugin, rehypeHighlight, rehypeSlug],
          remarkPlugins: [remarkGfm],
        },
      }}
    />
  );
};
export default MDXContent;
