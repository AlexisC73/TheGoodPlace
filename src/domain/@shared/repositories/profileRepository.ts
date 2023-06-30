import { SignInPayload } from '@/domain/auth/entities/payload/signInPayload'
import { SignUpClientPayload } from '@/domain/auth/entities/payload/signUpClientPayload'
import { UpdatePasswordPayload } from '@/domain/auth/entities/payload/updatePassword'

export interface ProfileRepository {
  createProfile: (signupClientPayload: SignUpClientPayload) => Promise<void>
  signIn: (signinClientPayload: SignInPayload) => Promise<string>
  updatePassword: (
    updatePasswordPayload: UpdatePasswordPayload
  ) => Promise<void>
}
