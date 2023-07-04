import { Profile } from '@/domain/profile/entities/profile'
import { Auth } from '../entities/auth'
import { SignInPayload } from '../entities/payload/signInPayload'
import { SignUpClientPayload } from '../entities/payload/signUpClientPayload'
import { UpdatePasswordPayload } from '../entities/payload/updatePassword'
export interface AuthRepository {
  signUp(payload: SignUpClientPayload): Promise<Auth>
  signIn(payload: SignInPayload): Promise<Auth>
  updatePassword(payload: UpdatePasswordPayload): Promise<void>
}
