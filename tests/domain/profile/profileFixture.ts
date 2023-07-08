import { createTestAppContainer } from '@tests/application/@shared/container/container'
import { ProfileDTO } from '@/infrastructure/@shared/dtos/profileDTO'
import { Profile } from '@/domain/profile/entities/profile'
import {
  UpdateProfileParams,
  UpdateProfileUseCase
} from '@/domain/profile/usecases/updateProfile'
import { ProfileRepositoryImpl } from '@/infrastructure/profile/repositories/profileRepository'
import { CacheProfileDataSource } from '@/infrastructure/profile/datasources/cacheDataSource'
import { InMemoryRemoteProfileDataSource } from '@/infrastructure/profile/datasources/InMemoryRemoteDataSource'
import {
  UpdateAvatarParams,
  UpdateAvatarUseCase
} from '@/domain/profile/usecases/updateAvatar'
import { ProfileRepository } from '@/domain/profile/repositories/profileRepository'

export const createProfileFixture = () => {
  const appContainer = createTestAppContainer()

  const profileRepository = appContainer.get(
    ProfileRepository
  ) as ProfileRepositoryImpl

  const profileLocalDataSource =
    profileRepository.cacheProfileDataSource as CacheProfileDataSource
  const profileRemoteDataSource =
    profileRepository.remoteProfileDataSource as InMemoryRemoteProfileDataSource

  const updateProfileUseCase = appContainer.get(UpdateProfileUseCase)
  const updateAvatarUseCase = appContainer.get(UpdateAvatarUseCase)

  return {
    givenProfilesExistInRemote (profiles: ProfileDTO[]) {
      profileRemoteDataSource.givenProfiles(profiles)
    },
    async whenUserUpdateHisProfile (params: UpdateProfileParams) {
      await updateProfileUseCase.handle(params)
    },
    async whenUserUpdateProfileAvatar (params: UpdateAvatarParams) {
      await updateAvatarUseCase.handle(params)
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
