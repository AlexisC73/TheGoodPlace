import { Auth } from '@/domain/auth/entities/auth'
import { SignUpClientPayload } from '../entities/payload/signUpClientPayload'
import { SignInPayload } from '../entities/payload/signInPayload'

export interface AuthRepository {
  signupClient(payload: SignUpClientPayload): Promise<Auth>
  signIn(payload: SignInPayload): Promise<Auth>
}
