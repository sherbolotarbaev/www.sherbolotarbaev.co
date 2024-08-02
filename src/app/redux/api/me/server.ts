'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { cookies, headers } from 'next/headers';
import { userAgent as getUserAgent } from 'next/server';

export async function getMe(_request: GetMeRequest): Promise<GetMeResponse | undefined> {
  const session = cookies().get('session');
  if (!session) return;

  noStore();

  const { os, device } = getUserAgent({ headers: headers() });
  const userAgent = `${os.name} ${os.version} (${device.vendor}, ${device.model})`;

  headers().set('user-agent', userAgent);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
      method: 'GET',
      headers: Object.fromEntries(headers()),
      credentials: 'include',
    });
    if (!response.ok) return;
    const me = await response.json();
    return me;
  } catch (error) {
    return;
  }
}
