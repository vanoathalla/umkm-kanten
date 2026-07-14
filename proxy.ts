import { NextRequest, NextResponse } from "next/server";

// Next.js 16: middleware.ts renamed to proxy.ts
// https://nextjs.org/docs/messages/middleware-to-proxy
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Proteksi semua route /admin kecuali /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = req.cookies.get("admin_token")?.value;
    if (!token || token !== process.env.ADMIN_PASSWORD) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
