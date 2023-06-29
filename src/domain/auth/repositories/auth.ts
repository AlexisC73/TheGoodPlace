import { Auth } from '@/domain/auth/entities/auth'
import { SignUpClientPayload } from '../entities/signUpClientPayload'
import { SignInPayload } from '../entities/signInPayload'

export interface AuthRepository {
  signupClient(payload: SignUpClientPayload): Promise<Auth>
  signIn(payload: SignInPayload): Promise<Auth>
}
