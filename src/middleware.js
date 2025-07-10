// middleware.js
import { NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/login', '/signup']; // 로그인 없이 접근 가능한 경로들

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // 공개 경로면 그냥 통과
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // 로그인 쿠키(auth-token) 체크
  const token = req.cookies.get('auth-token')?.value;

  if (!token) {
    // 로그인 안 되어 있으면 /login 페이지로 리다이렉트
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  // 로그인 되어 있으면 요청 진행
  return NextResponse.next();
}

// matcher 설정: 모든 경로에 적용
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
