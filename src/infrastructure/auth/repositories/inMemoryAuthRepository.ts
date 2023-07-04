import type { AuthRepository } from '@/domain/auth/repositories/authRepository'
import { Auth } from '@/domain/auth/entities/auth'
import { SignUpClientPayload } from '@/domain/auth/entities/payload/signUpClientPayload'
import { SignInPayload } from '@/domain/auth/entities/payload/signInPayload'
import { UpdatePasswordPayload } from '@/domain/auth/entities/payload/updatePassword'
import { inject, injectable } from 'inversify'
import { TYPES } from '@/application/@shared/container/types'
import { CacheProfileDataSource } from '@/infrastructure/profile/datasources/cacheDataSource'
import { InMemoryRemoteProfileDataSource } from '@/infrastructure/profile/datasources/InMemoryRemoteDataSource'
import { InMemoryRemoteAuthDataSource } from '../datasources/InMemoryRemoteAuthDataSource'
import { Profile } from '@/domain/profile/entities/profile'
import { CacheAuthDataSource } from '../datasources/CacheAuthDataSource'

@injectable()
export class InMemoryAuthRepository implements AuthRepository {
  cacheProfileDataSource = new CacheProfileDataSource()
  remoteProfileDataSource = new InMemoryRemoteProfileDataSource()
  remoteAuthDataSource = new InMemoryRemoteAuthDataSource()
  cacheAuthDataSource = new CacheAuthDataSource()

  async signUp (
    payload: SignUpClientPayload
  ): Promise<{ auth: Auth; profile: Profile }> {
    try {
      const { profile, auth } = await this.remoteAuthDataSource.signUp(payload)
      this.cacheProfileDataSource.saveProfileInCache(profile)
      this.cacheAuthDataSource.saveAuthInCache(auth)
      return { auth, profile }
    } catch (err) {
      throw err
    }
  }

  async signIn (
    payload: SignInPayload
  ): Promise<{ auth: Auth; profile: Profile }> {
    const { auth, profile } = await this.remoteAuthDataSource.signInAccount(
      payload
    )
    this.cacheProfileDataSource.saveProfileInCache(profile)
    this.cacheAuthDataSource.saveAuthInCache(auth)
    return { auth, profile }
  }

  async updatePassword (payload: UpdatePasswordPayload): Promise<void> {
    await this.remoteProfileDataSource.updatePassword(payload)
    return Promise.resolve()
  }
}
