import type { Metadata } from 'next';

import GuestbookClient from './page.uc';

export const metadata: Metadata = {
  title: 'Guestbook',
};

export default async function Guestbook() {
  return <GuestbookClient />;
}
