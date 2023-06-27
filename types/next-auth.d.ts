import { AuthUser } from './interfaces'

declare module 'next-auth' {
  interface Session {
    user: AuthUser
  }
}