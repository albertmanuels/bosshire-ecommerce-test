import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { authRoutes, protectedRoutes } from "./constants/navigation";


export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  console.log(path)
  const isProtectedRoute = protectedRoutes.includes(path)
  const isAuthRoute = authRoutes.includes(path)

  const cookie = (await cookies()).get("token")?.value

  if(isAuthRoute && cookie) {
    return NextResponse.redirect(new URL("/", req.nextUrl))
  }

  if(isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL("/login", req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/cart/:path*', '/login'],
}