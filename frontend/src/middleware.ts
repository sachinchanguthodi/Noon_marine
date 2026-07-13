import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Access gate.
//   SITE_LOCKED=true  -> whole site returns a bare 503 (Service Unavailable).
//   SITE_LOCKED unset/false -> normal behaviour.
//
// Private bypass (so the owner can still view/demo while it's locked):
//   Set UNLOCK_KEY=<some-secret> in the environment, then visit any URL with
//   ?unlock=<some-secret> once. That drops a cookie so future visits pass
//   through until SITE_LOCKED is cleared. Anyone without the key still gets 503.
const COOKIE = 'site_unlock';

export function middleware(request: NextRequest) {
  const locked = process.env.SITE_LOCKED === 'true';
  if (!locked) {
    return NextResponse.next();
  }

  const key = process.env.UNLOCK_KEY;

  // Owner unlocking via ?unlock=<key>: set the bypass cookie and let through.
  const provided = request.nextUrl.searchParams.get('unlock');
  if (key && provided && provided === key) {
    const res = NextResponse.next();
    res.cookies.set(COOKIE, key, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return res;
  }

  // Already unlocked via cookie.
  if (key && request.cookies.get(COOKIE)?.value === key) {
    return NextResponse.next();
  }

  return new NextResponse('Service Unavailable', {
    status: 503,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'retry-after': '86400',
      'cache-control': 'no-store',
    },
  });
}

export const config = {
  // Run on every route except Next.js internals and static asset files.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
