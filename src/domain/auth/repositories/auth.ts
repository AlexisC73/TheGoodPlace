import { Auth } from '@/domain/auth/entities/auth'
import { SignUpClientPayload } from '../entities/payload/signUpClientPayload'
import { SignInPayload } from '../entities/payload/signInPayload'
import { UpdatePasswordPayload } from '../entities/payload/updatePassword'

export interface AuthRepository {
  signupClient(payload: SignUpClientPayload): Promise<Auth>
  signIn(payload: SignInPayload): Promise<Auth>
  updatePassword(payload: UpdatePasswordPayload): Promise<void>
}
