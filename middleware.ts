import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Get the path
  const path = request.nextUrl.pathname;

  // 2. Define public routes that don't need protection
  const isPublicPath = path === '/login' || path === '/signup';

  // 3. Get the token from cookies (assuming you store your JWT in a cookie)
  const token = request.cookies.get('token')?.value || '';

  // 4. Redirect Logic
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/admin', request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

// 5. Configure which paths this middleware applies to
export const config = {
  matcher: [
    '/admin/:path*'
    
  ],
};