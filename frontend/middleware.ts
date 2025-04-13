import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { publicPages } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isPublicPage = publicPages.includes(request.nextUrl.pathname)

  if (!token && !isPublicPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next/static|favicon.ico).*)',
}
