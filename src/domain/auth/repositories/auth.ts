import { Auth } from '@/domain/auth/entities/auth'
import { SignUpClientPayload } from '../entities/signUpClientPayload'

export interface AuthRepository {
  signupClient(payload: SignUpClientPayload): Promise<Auth>
}
