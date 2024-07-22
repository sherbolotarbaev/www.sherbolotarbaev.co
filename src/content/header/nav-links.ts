interface ILink {
  name: string;
  href: string;
}

export const links: ILink[] = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Blog',
    href: '/blog',
  },
  {
    name: 'Guestbook',
    href: '/guestbook',
  },
];
