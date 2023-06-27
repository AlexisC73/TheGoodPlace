import { Auth } from '../../auth/entities/auth'

export interface UserRepository {
  signinClient({
    email,
    password
  }: {
    email: string
    password: string
  }): Promise<Auth>

  signupClient({
    id,
    email,
    password,
    name
  }: {
    id: string
    email: string
    password: string
    name: string
  }): Promise<void>
}
