import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { publicPages } from '@/lib/auth'
import { jwtDecode } from 'jwt-decode'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isPublicPage = publicPages.includes(request.nextUrl.pathname)

  if (!token && !isPublicPage) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  const authToken = token?.jwt ? jwtDecode(token?.jwt) : null
  const isAuthTokenValid =
    authToken && authToken.exp && Date.now() < authToken.exp * 1000

  if (authToken && !isAuthTokenValid) {
    const response = NextResponse.redirect(new URL('/auth/login', request.url))

    response.cookies.delete('next-auth.session-token')
    response.cookies.delete('next-auth.callback-url')
    response.cookies.delete('next-auth.csrf-token')

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next/static|favicon.ico).*)',
}
