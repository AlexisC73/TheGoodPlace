import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const apiUrl = process.env.NEXTAUTH_URL

const authOptions: AuthOptions = {
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
        const fetchConnect = await fetch(apiUrl + '/auth/signin', {
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
        return null
      },
    }),
  ],
}

export default NextAuth(authOptions)
