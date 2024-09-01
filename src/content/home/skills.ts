import type { IconType } from 'react-icons/lib';
import {
  SiAmazonaws,
  SiDocker,
  SiExpress,
  SiFastify,
  SiGit,
  SiJavascript,
  SiKubernetes,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedux,
  SiSass,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';

interface ISkills {
  name: string;
  icon: IconType;
  href: string;
  iconColor?: string;
}

export const skills: ISkills[] = [
  {
    name: 'JavaScript',
    icon: SiJavascript,
    href: 'https://www.javascript.com',
    iconColor: '#f0db4f',
  },
  {
    name: 'TypeScript',
    icon: SiTypescript,
    href: 'https://www.typescriptlang.org',
    iconColor: '#007acc',
  },
  {
    name: 'Node.js',
    icon: SiNodedotjs,
    href: 'https://nodejs.org',
    iconColor: '#68a063',
  },
  {
    name: 'Nest.js',
    icon: SiNestjs,
    href: 'https://nestjs.com',
    iconColor: '#e0234e',
  },
  {
    name: 'Fastify',
    icon: SiFastify,
    href: 'https://fastify.dev',
    iconColor: 'white',
  },
  {
    name: 'Express',
    icon: SiExpress,
    href: 'https://expressjs.com',
    iconColor: 'white',
  },
  {
    name: 'PostgreSQL',
    icon: SiPostgresql,
    href: 'https://www.postgresql.org',
    iconColor: '#0064a5',
  },
  {
    name: 'MongoDB',
    icon: SiMongodb,
    href: 'https://www.mongodb.com',
    iconColor: '#4db33d',
  },
  {
    name: 'Prisma',
    icon: SiPrisma,
    href: 'https://www.prisma.io',
    iconColor: 'white',
  },
  {
    name: 'AWS',
    icon: SiAmazonaws,
    href: 'https://aws.amazon.com',
    iconColor: '#ff9900',
  },
  {
    name: 'Docker',
    icon: SiDocker,
    href: 'https://www.docker.com',
    iconColor: '#1d63ed',
  },
  {
    name: 'Kubernetes',
    icon: SiKubernetes,
    href: 'https://kubernetes.io',
    iconColor: '#296de8',
  },
  {
    name: 'Git',
    icon: SiGit,
    href: 'https://git-scm.com',
    iconColor: '#f1502f',
  },
  {
    name: 'React',
    icon: SiReact,
    href: 'https://react.dev',
    iconColor: '#61dbfb',
  },
  {
    name: 'Redux',
    icon: SiRedux,
    href: 'https://redux.js.org',
    iconColor: '#764abc',
  },
  {
    name: 'Next.js',
    icon: SiNextdotjs,
    href: 'https://nextjs.org',
    iconColor: 'white',
  },
  {
    name: 'Sass',
    icon: SiSass,
    href: 'https://sass-lang.com',
    iconColor: '#c69',
  },
  {
    name: 'Tailwind',
    icon: SiTailwindcss,
    href: 'https://tailwindcss.com',
    iconColor: '#06b6d4',
  },
];
