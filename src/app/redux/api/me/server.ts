import { cookies, headers as requestHeaders } from 'next/headers';
import { userAgent as getUserAgent } from 'next/server';

export async function getMe(_request: GetMeRequest): Promise<GetMeResponse | undefined> {
  const session = cookies().get('session');

  const { os, device } = getUserAgent({ headers: requestHeaders() });
  const userAgent = `${os.name} ${os.version} (${device.vendor}, ${device.model})`;
  const xff = `${
    (requestHeaders().get('x-forwarded-for') ?? '127.0.0.1')?.split(',')[0]
  }`;

  const headers = new Headers();

  headers.append('x-forwarded-for', xff);
  headers.append('user-agent', userAgent);

  if (session) {
    headers.append('cookie', `session=${session.value}`);
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
      method: 'GET',
      headers,
      credentials: 'include',
    });
    if (!response.ok) return;
    const me = await response.json();
    return me;
  } catch (error) {
    return;
  }
}
