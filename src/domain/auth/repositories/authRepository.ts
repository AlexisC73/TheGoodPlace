import { Profile } from '@/domain/profile/entities/profile'
import { Auth } from '../entities/auth'
import { SignInPayload } from '../entities/payload/signInPayload'
import { SignUpClientPayload } from '../entities/payload/signUpClientPayload'
import { UpdatePasswordPayload } from '../entities/payload/updatePassword'
export interface AuthRepository {
  signUp(
    payload: SignUpClientPayload
  ): Promise<{ auth: Auth; profile: Profile }>
  signIn(payload: SignInPayload): Promise<{ auth: Auth; profile: Profile }>
  updatePassword(payload: UpdatePasswordPayload): Promise<void>
}
