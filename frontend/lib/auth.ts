import { Session, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

declare module 'next-auth' {
  interface Session {
    jwt?: string
  }
  interface User {
    token: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    jwt?: string
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/login`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: credentials }),
          }
        )

        if (!response.ok) {
          return null
        }

        const { token } = await response.json()
        return { id: '1', token }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User | undefined }) {
      if (user?.token) {
        token.jwt = user.token
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.jwt = token.jwt
      return session
    },
  },
}

export const publicPages = ['/api/auth/signin', '/api/auth/signup']
