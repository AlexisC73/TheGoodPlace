import { ProfileService } from '@/application/profile/services/profileService'
import { ProfileDTO } from '@/infrastructure/@shared/dtos/profileDTO'
import { Profile } from '@/domain/profile/entities/profile'
import { UpdateProfileParams } from '@/domain/profile/usecases/updateProfile'
import { createTestAppContainer } from '@tests/application/@shared/container/container'
import { TYPES } from '@/application/@shared/container/types'
import { ProfileRepositoryImpl } from '@/infrastructure/profile/repositories/profileRepository'
import { CacheProfileDataSource } from '@/infrastructure/profile/datasources/cacheDataSource'
import { InMemoryRemoteProfileDataSource } from '@/infrastructure/profile/datasources/InMemoryRemoteDataSource'

export const createProfileFixture = () => {
  const profileContainer = createTestAppContainer()

  const profileService = profileContainer.get(
    TYPES.ProfileService
  ) as ProfileService

  const profileRepository = profileContainer.get(
    TYPES.ProfileRepository
  ) as ProfileRepositoryImpl

  const profileLocalDataSource =
    profileRepository.cacheProfileDataSource as CacheProfileDataSource
  const profileRemoteDataSource =
    profileRepository.remoteProfileDataSource as InMemoryRemoteProfileDataSource

  const updateProfileUseCase = profileService.GetUpdateProfileUseCase()

  return {
    givenProfilesExistInRemote (profiles: ProfileDTO[]) {
      profileRemoteDataSource.givenProfiles(profiles)
    },
    whenUserUpdateHisProfile (params: UpdateProfileParams) {
      updateProfileUseCase.handle(params)
    },
    thenProfileShouldBe (expectedProfile: Profile) {
      const foundProfile = profileRemoteDataSource._getProfile(
        expectedProfile.id
      )
      expect(foundProfile?.toDomain()).toEqual(expectedProfile)
    }
  }
}

export type ProfileFixture = ReturnType<typeof createProfileFixture>
