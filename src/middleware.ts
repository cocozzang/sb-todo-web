import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, USER_INFO_COOKIE_NAME } from "./const";

const protectedRoutes = ["/", "/user"];

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME);
  const userCookie = cookies().get(USER_INFO_COOKIE_NAME);

  if (isProtectedRoute && (!sessionCookie || !userCookie)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
