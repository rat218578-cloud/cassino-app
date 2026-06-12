import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value || request.headers.get('authorization');
  const { pathname } = request.nextUrl;

  // Rotas públicas
  if (pathname === '/login' || pathname === '/cadastro') {
    if (token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Rotas protegidas
  if (!token && pathname !== '/login' && pathname !== '/cadastro') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
