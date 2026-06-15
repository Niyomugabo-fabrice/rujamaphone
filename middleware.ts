import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function decodeJwtPayload(token: string): { exp?: number } | null {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;

    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');

    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

function isTokenExpired(token: string) {
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) return true;

  return payload.exp <= Math.floor(Date.now() / 1000);
}

function redirectToLogin(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/login', request.nextUrl));
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(0),
    path: '/',
  });
  return response;
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup';
  const token = request.cookies.get('token')?.value || '';
  const hasValidToken = Boolean(token) && !isTokenExpired(token);

  if (token && !hasValidToken) {
    if (isPublicPath) {
      const response = NextResponse.next();
      response.cookies.set('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: new Date(0),
        path: '/',
      });
      return response;
    }

    return redirectToLogin(request);
  }

  if (!isPublicPath && !hasValidToken) {
    return redirectToLogin(request);
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/login',
    '/signup',
  ],
};
