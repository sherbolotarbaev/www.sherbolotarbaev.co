'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { cookies, headers } from 'next/headers';

export async function getMe(_request: GetMeRequest): Promise<GetMeResponse | undefined> {
  const session = cookies().get('session');

  if (!session) return;

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
