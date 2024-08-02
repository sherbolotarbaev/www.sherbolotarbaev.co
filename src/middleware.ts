import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const url = request.nextUrl;
  const pathname = url.pathname;
  const xff = `${(request.headers.get('x-forwarded-for') ?? '127.0.0.1')?.split(',')[0]}`;

  const responseCookies = response.cookies;

  if (pathname.startsWith('/images') || pathname === '/favicon.ico') {
    return response;
  }

  responseCookies.set('x-forwarded-for', xff);

  return response;
}

export const config = {
  matcher: '/((?!api|_next/static|favicon.ico).*)',
};
