import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // News routes are localized under a two-letter language segment.
  // Reject legacy/malformed prefixes (for example /home-blogs.html/news/...) as real HTTP 404s.
  const localizedNewsPath = pathname.match(/^\/([^/]+)\/news(?:\/|$)/);
  if (localizedNewsPath && !/^[a-z]{2}$/.test(localizedNewsPath[1])) {
    return new NextResponse("Not Found", { status: 404 });
  }

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

export const config = {
  matcher: ["/:lang/news/:path*", "/:lang/citizens/:id*"],
};