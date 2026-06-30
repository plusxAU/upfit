import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken, SESSION_COOKIE } from "@/lib/adminAuth";

// Paths that require admin auth — matched against pathname prefix
const PROTECTED_PREFIXES = [
  "/admin",
  "/api/admin",
  "/api/payment/charge-balance",
];

// Paths inside the protected prefixes that are exempt (login page itself)
const EXEMPT_PREFIXES = ["/admin/login", "/api/admin/login"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  const isExempt = EXEMPT_PREFIXES.some((p) => pathname.startsWith(p));
  if (isExempt) return NextResponse.next();

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const valid = token ? await verifyAdminToken(token) : false;

  if (!valid) {
    // API routes return 401 JSON so callers (curl, fetch) get a clear rejection
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // Page routes redirect to login
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/payment/charge-balance",
  ],
};
