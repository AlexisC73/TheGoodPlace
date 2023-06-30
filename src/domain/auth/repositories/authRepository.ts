import { Auth } from '../entities/auth'

export interface AuthRepository {
  createAuthClient(id: string): Promise<Auth>
  signIn(id: string): Promise<Auth>
}
