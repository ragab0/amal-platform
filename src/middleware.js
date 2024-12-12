import { NextResponse } from "next/server";

export const authRoutes = {
  public: [
    "/login",
    "/signup",
    "/forgotPassword",
    "/resetPassword",
    "/auth/callback",
  ],
  protected: ["/profile", "/cv", "/customize", "/notifications", "/dashboard"],
};

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("jwt")?.value;

  console.log("Middleware tokennnnnnnnnnnnnnnnnnnnn:", token);

  function matchesPath(paths, currentPath) {
    return paths.some((path) => currentPath.startsWith(path));
  }

  const isPublicPath = matchesPath(authRoutes.public, pathname);
  const isProtectedPath = matchesPath(authRoutes.protected, pathname);

  if (isProtectedPath && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    // Create response with redirect
    const response = NextResponse.redirect(loginUrl);
    // Clear any existing invalid cookies
    response.cookies.delete("jwt");
    return response;
  }

  // Login/Signup page handling when already authenticated
  if (token && (pathname === "/login" || pathname === "/signup")) {
    const response = NextResponse.redirect(new URL("/profile", request.url));
    // Preserve the token
    response.cookies.set("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    return response;
  }

  // For all other routes, pass through but ensure cookie is preserved
  const response = NextResponse.next();
  if (token) {
    response.cookies.set("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
  }
  return response;
}

export const config = {
  //Match all paths except (API routes & Next.js internals & static files & public files)
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml).*)"],
};
