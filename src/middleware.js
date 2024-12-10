import { NextResponse } from "next/server";

const publickPaths = ["/login", "/signup", "/forgotPassword"];

export function middleware(request) {
  const isPublicPath = publickPaths.includes(request.nextUrl.pathname);
  const token = request.cookies.get("jwt")?.value;

  // Redirect to login if accessing protected route without token
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to home if accessing auth pages with valid token
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // "/profile/:path*",
    // "/cv/:path*",
    // "/customize/:path*",
    // "/notifications/:path*",
  ],
};
