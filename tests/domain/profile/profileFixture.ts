import { ProfileService } from '@/application/profile/services/profileService'
import { InMemoryProfileDataSource } from '@/infrastructure/@shared/datasources/InMemoryProfile'
import { ProfileDTO } from '@/infrastructure/@shared/dtos/profileDTO'
import { Profile } from '@/domain/profile/entities/profile'
import { UpdateProfileParams } from '@/domain/profile/usecases/updateProfile'
import { createTestAppContainer } from '@tests/application/@shared/container/container'
import { TYPES } from '@/application/@shared/container/types'

export const createProfileFixture = () => {
  const profileContainer = createTestAppContainer()

  const profileService = profileContainer.get(
    TYPES.ProfileService
  ) as ProfileService

  const profileDataSource = profileContainer.get(
    TYPES.LocalProfileDataSource
  ) as InMemoryProfileDataSource

  const updateProfileUseCase = profileService.GetUpdateProfileUseCase()

  return {
    givenProfilesExist (profiles: ProfileDTO[]) {
      profileDataSource.profiles = profiles
    },
    whenUserUpdateHisProfile (params: UpdateProfileParams) {
      updateProfileUseCase.handle(params)
    },
    thenProfileShouldBe (expectedProfile: Profile) {
      const foundProfile = profileDataSource.profiles.find(
        p => p.id === expectedProfile.id
      )
      expect(foundProfile?.toDomain()).toEqual(expectedProfile)
    }
  }
}

export type ProfileFixture = ReturnType<typeof createProfileFixture>
