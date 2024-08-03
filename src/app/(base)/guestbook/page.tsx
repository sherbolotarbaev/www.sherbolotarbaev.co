import type { Metadata } from 'next';

import { getMe } from '~/app/redux/api/me/ssr';
import GuestbookClient from './page.uc';

export const metadata: Metadata = {
  title: 'Guestbook',
};

export default async function Guestbook() {
  const me = await getMe();
  return <GuestbookClient me={me} />;
}
