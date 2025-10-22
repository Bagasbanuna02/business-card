/* eslint-disable @typescript-eslint/no-explicit-any */
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req: any) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    console.log("[TOKEN]", token);
    console.log("[PATHNAME]", pathname);
    // Add any additional middleware logic here

    if (token && pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (token && pathname === "/auth/signin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (
      !token &&
      (pathname.startsWith("/dashboard") ||
        pathname.startsWith("/api/profile") ||
        pathname.startsWith("/api/socials"))
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow access to home page and signin page for everyone
        if (pathname === "/" || pathname === "/auth/signin") {
          return true;
        }

        // Require authentication for protected routes
        if (
          pathname.startsWith("/dashboard") ||
          pathname.startsWith("/api/profile") ||
          pathname.startsWith("/api/socials")
        ) {
          return !!token;
        }

        // Allow access to public profile pages
        if (pathname.startsWith("/p/")) {
          return true;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/auth/signin",
    "/dashboard/:path*",
    "/api/profile/:path*",
    "/api/socials/:path*",
  ],
};
