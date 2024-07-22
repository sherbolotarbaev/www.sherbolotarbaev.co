import type { IconType } from 'react-icons';
import {
  SiAmazonaws,
  SiDocker,
  SiExpress,
  SiFastify,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTypescript,
} from 'react-icons/si';

interface ISkills {
  name: string;
  icon: IconType;
  href: string;
}

export const skills: ISkills[] = [
  {
    name: 'TypeScript',
    icon: SiTypescript,
    href: 'https://www.typescriptlang.org',
  },
  {
    name: 'Node.js',
    icon: SiNodedotjs,
    href: 'https://nodejs.org',
  },
  {
    name: 'Nest.js',
    icon: SiNestjs,
    href: 'https://nestjs.com',
  },
  {
    name: 'Fastify',
    icon: SiFastify,
    href: 'https://fastify.dev',
  },
  {
    name: 'Express',
    icon: SiExpress,
    href: 'https://expressjs.com',
  },
  {
    name: 'PostgreSQL',
    icon: SiPostgresql,
    href: 'https://www.postgresql.org',
  },
  {
    name: 'AWS',
    icon: SiAmazonaws,
    href: 'https://aws.amazon.com',
  },
  {
    name: 'Docker',
    icon: SiDocker,
    href: 'https://www.docker.com',
  },
  {
    name: 'React',
    icon: SiReact,
    href: 'https://react.dev',
  },
  {
    name: 'Next.js',
    icon: SiNextdotjs,
    href: 'https://nextjs.org',
  },
];
