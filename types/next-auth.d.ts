import { UserConnection } from '../domain/@shared/entities/connection'
import { User } from './interfaces'

declare module 'next-auth' {
  interface Session {
    user: User
  }
}
