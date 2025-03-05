import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

declare module 'next-auth' {
  interface Session {
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
    async jwt({ token, user }: { token: any; user: any }) {
      if (user?.token) {
        token.jwt = user.token // Store Rails JWT
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      session.jwt = token.jwt // Make Rails JWT available in session
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
