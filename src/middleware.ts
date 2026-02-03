import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /fa/citizens/HM-200001
  const match = pathname.match(/^\/([a-z]{2})\/citizens\/(HM-\d+)$/);

  if (match) {
    const lang = match[1];
    const id = match[2].toLowerCase();

    const url = request.nextUrl.clone();
    url.pathname = `/${lang}/citizens/${id}`;

    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

/**
 * ⬇⬇⬇ خیلی مهم
 * مشخص می‌کنیم middleware فقط روی این مسیرها اجرا شود
 */
export const config = {
  matcher: [
    '/:lang/citizens/:id*',
  ],
};
