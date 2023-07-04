import { TYPES } from '@/application/@shared/container/types'
import { UpdateProfilePayload } from '@/domain/profile/entities/payload/updateProfilePayload'
import { ProfileRepository } from '@/domain/profile/repositories/profileRepository'
import { inject, injectable } from 'inversify'
import { CacheProfileDataSource } from '../datasources/cacheDataSource'
import { InMemoryRemoteProfileDataSource } from '../datasources/InMemoryRemoteDataSource'

@injectable()
export class ProfileRepositoryImpl implements ProfileRepository {
  cacheProfileDataSource = new CacheProfileDataSource()
  remoteProfileDataSource = new InMemoryRemoteProfileDataSource()

  async update (payload: UpdateProfilePayload): Promise<void> {
    if (!payload.isValid()) {
      throw new Error('Invalid payload')
    }
    try {
      await this.remoteProfileDataSource.updateProfile(payload)
      this.cacheProfileDataSource.updateProfile(payload)
    } catch (err) {}
  }
}
