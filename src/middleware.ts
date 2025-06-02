import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdmin = token?.role === "ADMIN"
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin")

    // Protect admin routes
    if (isAdminPage && !isAdmin) {
      return NextResponse.redirect(new URL("/auth/signin", req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    "/admin/:path*",
    "/profile/:path*",
    "/dashboard/:path*"
  ]
}
