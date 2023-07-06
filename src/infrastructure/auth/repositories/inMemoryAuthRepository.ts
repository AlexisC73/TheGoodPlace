import type { AuthRepository } from '@/domain/auth/repositories/authRepository'
import { Auth } from '@/domain/auth/entities/auth'
import { SignUpClientPayload } from '@/domain/auth/entities/payload/signUpClientPayload'
import { SignInPayload } from '@/domain/auth/entities/payload/signInPayload'
import { UpdatePasswordPayload } from '@/domain/auth/entities/payload/updatePassword'
import { injectable } from 'inversify'
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

  async signUp (payload: SignUpClientPayload): Promise<Auth> {
    try {
      const auth = await this.remoteAuthDataSource.signUp(payload)
      this.cacheAuthDataSource.saveAuthInCache(auth)
      return auth
    } catch (err) {
      throw err
    }
  }

  async signIn (payload: SignInPayload): Promise<Auth> {
    const auth = await this.remoteAuthDataSource.signInAccount(payload)
    this.cacheAuthDataSource.saveAuthInCache(auth)
    return auth
  }

  async updatePassword (payload: UpdatePasswordPayload): Promise<void> {
    await this.remoteProfileDataSource.updatePassword(payload)
    return Promise.resolve()
  }

  async getProfile (token: string): Promise<Profile> {
    const { id } = JSON.parse(token) as { id: string }
    let profile = this.cacheProfileDataSource.getProfile()
    if (!profile || profile.id !== id) {
      this.cacheProfileDataSource.removeProfile()
      profile = (
        await this.remoteProfileDataSource.getProfile(token)
      ).toDomain()
      this.cacheProfileDataSource.saveProfile(profile)
    }
    if (!profile) throw new Error('Profile not found')
    return profile
  }

  getCachedAuth (): Auth | undefined {
    return this.cacheAuthDataSource.getCachedAuth()
  }

  signOut (): void {
    this.cacheAuthDataSource.removeCachedAuth()
    this.cacheProfileDataSource.removeProfile()
  }
}
