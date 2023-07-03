import { TYPES } from '@/application/profile/container/types'
import { ProfileService } from '@/application/profile/services/profileService'
import { InMemoryProfileDataSource } from '@/infrastructure/@shared/datasources/InMemoryProfile'
import { ProfileDTO } from '@/infrastructure/@shared/dtos/profileDTO'
import { createProfileContainer } from '@tests/application/profile/container/profileContainer'
import { Profile } from '@/domain/profile/entities/profile'
import { UpdateProfileParams } from '@/domain/profile/usecases/updateProfile'

export const createProfileFixture = () => {
  const profileContainer = createProfileContainer()
  const profileService = profileContainer.get(
    TYPES.ProfileService
  ) as ProfileService

  const profileDataSource = profileContainer.get(
    TYPES.ProfileDataSource
  ) as InMemoryProfileDataSource

  let profile: ProfileDTO

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
