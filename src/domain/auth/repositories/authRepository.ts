import { Profile } from '@/domain/profile/entities/profile'
import { Auth } from '../entities/auth'
import { SignInPayload } from '../entities/payload/signInPayload'
import { SignUpClientPayload } from '../entities/payload/signUpClientPayload'
import { UpdatePasswordPayload } from '../entities/payload/updatePassword'
export abstract class AuthRepository {
  abstract signUp(payload: SignUpClientPayload): Promise<Auth>
  abstract signIn(payload: SignInPayload): Promise<Auth>
  abstract updatePassword(payload: UpdatePasswordPayload): Promise<void>
  abstract getCachedAuth(): Auth | undefined
  abstract getProfile(token: string): Promise<Profile>
  abstract signOut(): void
}
