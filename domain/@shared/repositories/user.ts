import { Auth } from '../../auth/entities/auth'

export interface UserRepository {
  signinClient({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<Auth>

  signupClient({
    email,
    password,
    name,
    passwordConfirmation,
  }: {
    email: string
    password: string
    name: string
    passwordConfirmation: string
  }): Promise<void>
}
