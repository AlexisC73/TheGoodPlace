import { UserConnection } from '../entities/connection'

export interface UserRepository {
  signinClient({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<UserConnection>

  signupClient({
    email,
    password,
    name,
  }: {
    email: string
    password: string
    name: string
  }): Promise<void>
}
