import { injectable } from 'inversify'
import { Auth } from '../entities/auth'
import { SignInPayload } from '../entities/payload/signInPayload'
import { SignUpClientPayload } from '../entities/payload/signUpClientPayload'
import { UpdatePasswordPayload } from '../entities/payload/updatePassword'

@injectable()
export abstract class AuthRepository {
  abstract signUp(payload: SignUpClientPayload): Promise<Auth>
  abstract signIn(payload: SignInPayload): Promise<Auth>
  abstract updatePassword(payload: UpdatePasswordPayload): Promise<void>
}
