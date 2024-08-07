import { readdirSync } from 'node:fs';

export const getMDXFiles = (dir: string) => {
  return readdirSync(dir).filter((path) => /\.mdx?$/.test(path));
};
