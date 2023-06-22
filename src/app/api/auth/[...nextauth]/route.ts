import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { SigninClientUseCase } from '../../../../../domain/usecases/user/signin-client.usecase'
import { config } from '../../../../../config/repository'

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
        const userRepository = config.userRepository
        const signinUseCase = new SigninClientUseCase(userRepository)

        try {
          const userConnection = await signinUseCase.handle({
            email,
            password,
          })

          return userConnection
        } catch (err) {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update' && session?.avatarUrl) {
        token.avatarUrl = session.avatarUrl
      }
      if (trigger === 'update' && (session?.name || session?.email)) {
        token.name = session.name ?? token.name
        token.email = session.email ?? token.email
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
