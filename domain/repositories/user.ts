import { UserConnection } from '../entities/connection'
import { User } from '../entities/user'

export interface UserRepository {
  signinClient({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<UserConnection>

  signupClient({ email, password }: User): Promise<void>
}
