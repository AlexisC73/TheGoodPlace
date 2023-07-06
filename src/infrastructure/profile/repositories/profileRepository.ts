import { UpdateProfilePayload } from '@/domain/profile/entities/payload/updateProfilePayload'
import { ProfileRepository } from '@/domain/profile/repositories/profileRepository'
import { injectable } from 'inversify'
import { CacheProfileDataSource } from '../datasources/cacheDataSource'
import { InMemoryRemoteProfileDataSource } from '../datasources/InMemoryRemoteDataSource'
import { UpdateAvatarPayload } from '@/domain/profile/entities/payload/updateAvatarPayload'
import { Profile } from '@/domain/profile/entities/profile'

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

  async updateAvatar (payload: UpdateAvatarPayload): Promise<string> {
    const newAvatarUrl = await this.remoteProfileDataSource.updateAvatar(
      payload
    )
    this.cacheProfileDataSource.updateAvatar(newAvatarUrl)
    return 'https://www.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej-760x400.webp'
  }

  async getProfile (): Promise<Profile> {
    let profile = this.cacheProfileDataSource.getProfile()
    if (!profile) {
      profile = (
        await this.remoteProfileDataSource.getProfile('12345678')
      ).toDomain()
      this.cacheProfileDataSource.saveProfile(profile)
    }
    return profile
  }
}
