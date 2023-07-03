import { Auth } from '@/domain/auth/entities/auth'
import { ProfileDTO } from '@/infrastructure/@shared/dtos/profileDTO'
import { SignUpClientParams } from '@/domain/auth/usecases/signupClient'
import { SignInUseCaseParams } from '@/domain/auth/usecases/signIn'
import { Role } from '@/domain/auth/entities/role'
import { UpdatePasswordUseCaseParams } from '@/domain/auth/usecases/updatePassword'
import { InMemoryAuthDataSource } from '@/infrastructure/auth/datasources/InMemoryAuthDataSource'
import { AuthService } from '@/application/auth/services/AuthService'
import { TYPES } from '@/application/auth/container/types'
import { InMemoryProfileDataSource } from '@/infrastructure/@shared/datasources/InMemoryProfile'
import { createTestAuthContainer } from '@tests/application/auth/container/authContainer'

export const createAuthFixture = () => {
  let authenticatedUser: Auth
  let thrownError: Error | undefined

  const testAuthContainer = createTestAuthContainer()

  const authDataSource = testAuthContainer.get(
    TYPES.LocalAuthDataSource
  ) as InMemoryAuthDataSource
  const profileDataSource = testAuthContainer.get(
    TYPES.LocalProfileDataSource
  ) as InMemoryProfileDataSource

  const authService = testAuthContainer.get(TYPES.AuthService) as AuthService

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
        thrownError = err
      }
    },
    async whenUserSignIn (params: SignInUseCaseParams) {
      try {
        authenticatedUser = await signInUseCase.handle(params)
      } catch (err: any) {
        thrownError = err
      }
    },
    async whenUserUpdateHisPassword (params: UpdatePasswordUseCaseParams) {
      try {
        await updatePasswordUseCase.handle(params)
      } catch (err: any) {
        thrownError = err
      }
    },
    thenProfileShouldExist (expectedProfile: ProfileDTO) {
      const searchedProfile = profileDataSource.findById(expectedProfile.id)
      expect(searchedProfile).toEqual(expectedProfile)
    },
    thenProfileShouldNotExist (id: string) {
      const searchedProfile = profileDataSource.findById(id)
      expect(searchedProfile).toBeUndefined()
    },
    thenAuthenticatedUserShouldBe (expectedAuth: Auth) {
      expect(authenticatedUser).toEqual(expectedAuth)
    },
    thenErrorShouldBe (expectedError: new () => Error) {
      expect(thrownError).toBeInstanceOf(expectedError)
    },
    thenUserShouldNotBeAuthenticated () {
      expect(authenticatedUser).toBeUndefined()
    }
  }
}

export type AuthFixture = ReturnType<typeof createAuthFixture>
