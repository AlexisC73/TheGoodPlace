import { AuthRepository } from '@/domain/auth/repositories/authRepository'
import { LocalProfileDataSource } from '@/infrastructure/@shared/datasources/InMemoryProfile'
import {
  InMemoryAuthDataSource,
  LocalAuthDataSource
} from '../datasources/InMemoryAuthDataSource'
import { Auth } from '@/domain/auth/entities/auth'
import { SignUpClientPayload } from '@/domain/auth/entities/payload/signUpClientPayload'
import { SignInPayload } from '@/domain/auth/entities/payload/signInPayload'
import { UpdatePasswordPayload } from '@/domain/auth/entities/payload/updatePassword'
import { inject, injectable } from 'inversify'
import { TYPES } from '@/config/types'
import 'reflect-metadata'
import { profile } from 'console'

@injectable()
export class InMemoryAuthRepository implements AuthRepository {
  constructor (
    @inject(TYPES.LocalProfileDataSource)
    private readonly profileDataSource: LocalProfileDataSource,
    @inject(TYPES.LocalAuthDataSource)
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
