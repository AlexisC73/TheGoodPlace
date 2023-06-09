import env from '@/utils/config'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string
          password: string
        }
        try {
          const fetchConnect = await fetch(env.API_URL + '/auth/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
            }),
          })

          if (fetchConnect.ok) {
            const user = await fetchConnect.json()
            if (user) {
              return user
            } else {
              return null
            }
          }

          if (!fetchConnect.ok) {
            throw new Error('Il y a eu un problème lors de la connexion.')
          }
          return null
        } catch (err: any) {
          if (err.message === 'fetch failed')
            throw new Error('Problème de liaison avec le server.')
          else {
            throw new Error(err.message)
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update' && session?.avatarUrl) {
        token.avatarUrl = session.avatarUrl
      }
      return { ...token, ...user }
    },
    async session({ session, token, trigger, newSession }) {
      if (trigger === 'update' && newSession?.avatarUrl) {
        session.user.avatarUrl = newSession.avatarUrl
      }
      session.user = token
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
