'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { cookies, headers } from 'next/headers';

export async function getMe(_request: GetMeRequest): Promise<GetMeResponse | undefined> {
  const session = cookies().get('session');

  if (!session) return;

  // const { os, device } = getUserAgent({ headers: requestHeaders() });
  // const userAgent = `${os.name} ${os.version} (${device.vendor}, ${device.model})`;
  // const xff = `${(cookies().get('x-forwarded-for')?.value ?? '127.0.0.1').split(',')[0]}`;

  // const headers = new Headers();

  // headers.append('x-forwarded-for', xff);
  // headers.append('user-agent', userAgent);
  // headers.append('cookie', `session=${session.value}`);

  noStore();

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
