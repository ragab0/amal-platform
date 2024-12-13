import { NextResponse } from "next/server";

export const authRoutes = {
  public: [
    "/login",
    "/signup",
    "/forgotPassword",
    "/resetPassword",
    // "/auth/callback",
  ],
  protected: ["/profile", "/cv", "/customize", "/notifications", "/dashboard"],
};

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("jwt")?.value;

  function matchesPath(paths, currentPath) {
    return paths.some((path) => currentPath.startsWith(path));
  }

  const isPublicPath = matchesPath(authRoutes.public, pathname);
  const isProtectedPath = matchesPath(authRoutes.protected, pathname);

  console.log("MIDDLEWAREEEE TOKEN:", token);

  if (isProtectedPath && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  } else if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  //Match all paths except (API routes & Next.js internals & static files & public files)
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml).*)"],
};
