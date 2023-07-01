import { Auth } from '@/domain/auth/entities/auth'
import { ProfileDTO } from '@/infrastructure/@shared/dtos/profileDTO'
import { SignUpClientParams } from '@/domain/auth/usecases/signupClient'
import { SignInUseCaseParams } from '@/domain/auth/usecases/signIn'
import { Role } from '@/domain/auth/entities/role'
import { UpdatePasswordUseCaseParams } from '@/domain/auth/usecases/updatePassword'
import { InMemoryAuthDataSource } from '@/infrastructure/auth/datasources/InMemoryAuthDataSource'
import { AuthService } from '@/config/usecases/AuthService'
import { TYPES } from '@/config/types'
import { InMemoryProfileDataSource } from '@/infrastructure/@shared/datasources/InMemoryProfile'
import { testContainer } from '@/config/dependencies'

export const createAuthFixture = () => {
  let authenticatedUser: Auth

  const authDataSource = testContainer.get(
    TYPES.LocalAuthDataSource
  ) as InMemoryAuthDataSource
  const profileDataSource = testContainer.get(
    TYPES.LocalProfileDataSource
  ) as InMemoryProfileDataSource

  const authService = testContainer.get(TYPES.AuthService) as AuthService

  const signUpClientUseCase = authService.GetSignUpUseCase()
  const signInUseCase = authService.GetSignInUseCase()
  const updatePasswordUseCase = authService.GetUpdatePasswordUseCase()

  return {
    givenUserExists (users: { profile: ProfileDTO; role: Role }[]) {
      authDataSource.givenUsers(
        users.map(u => ({ id: u.profile.id, role: u.role }))
      )
      profileDataSource.givenProfiles(users.map(u => u.profile))
    },
    async whenUserSignUp (params: SignUpClientParams) {
      try {
        authenticatedUser = await signUpClientUseCase.handle(params)
      } catch (err: any) {
        console.log(err.message)
      }
    },
    async whenUserSignIn (params: SignInUseCaseParams) {
      try {
        authenticatedUser = await signInUseCase.handle(params)
      } catch (err: any) {
        console.log(err.message)
      }
    },
    async whenUserUpdateHisPassword (params: UpdatePasswordUseCaseParams) {
      try {
        await updatePasswordUseCase.handle(params)
      } catch (err: any) {
        console.log(err.message)
      }
    },
    thenProfileShouldExist (expectedProfile: ProfileDTO) {
      const searchedProfile = profileDataSource.findById(expectedProfile.id)
      expect(searchedProfile).toEqual(expectedProfile)
    },
    thenAuthenticatedUserShouldBe (expectedAuth: Auth) {
      expect(authenticatedUser).toEqual(expectedAuth)
    }
  }
}

export type AuthFixture = ReturnType<typeof createAuthFixture>
