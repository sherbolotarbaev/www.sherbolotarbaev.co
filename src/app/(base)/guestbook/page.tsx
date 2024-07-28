import type { Metadata } from 'next';

import { getMe } from '@/redux/api/me/server';
import GuestbookClient from './page.uc';

export const metadata: Metadata = {
  title: 'Guestbook',
};

export default async function Guestbook() {
  const me = await getMe();
  return <GuestbookClient me={me} />;
}
