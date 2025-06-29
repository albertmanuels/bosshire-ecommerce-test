import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isLoginPage = path === "/login";
  const isProtectedPage = path !== "/login";

  const token = (await cookies()).get("token")?.value;

  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
 
  return NextResponse.next();
}

export const config = {
  matcher: ['/login', "/((?!api|_next|static).*)"],
};