import { AuthRepository } from '@/domain/auth/repositories/authRepository'
import { LocalProfileDataSource } from '@/infrastructure/@shared/datasources/InMemoryProfile'
import { LocalAuthDataSource } from '../datasources/InMemoryAuthDataSource'
import { Auth } from '@/domain/auth/entities/auth'
import { SignUpClientPayload } from '@/domain/auth/entities/payload/signUpClientPayload'
import { SignInPayload } from '@/domain/auth/entities/payload/signInPayload'
import { UpdatePasswordPayload } from '@/domain/auth/entities/payload/updatePassword'

export class InMemoryAuthRepository implements AuthRepository {
  constructor (
    private readonly profileDataSource: LocalProfileDataSource,
    private readonly authDataSource: LocalAuthDataSource
  ) {}

  signUp (payload: SignUpClientPayload): Promise<Auth> {
    this.profileDataSource.createProfile(payload)
    return this.authDataSource.createAuthClient(payload.id)
  }

  signIn (payload: SignInPayload): Promise<Auth> {
    const userId = this.profileDataSource.verifyAccount(payload)
    return Promise.resolve(this.authDataSource.signIn(userId))
  }

  updatePassword (payload: UpdatePasswordPayload): Promise<void> {
    this.profileDataSource.updatePassword(payload)
    return Promise.resolve()
  }
}
