interface ILink {
  name: string;
  href: string;
}

export const links: ILink[] = [
  {
    name: 'home',
    href: '/',
  },
  {
    name: 'blog',
    href: '/blog',
  },
  {
    name: 'guestbook',
    href: '/guestbook',
  },
];
