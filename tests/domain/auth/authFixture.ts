import { Auth } from '@/domain/auth/entities/auth'
import { ProfileDTO } from '@/infrastructure/@shared/dtos/profileDTO'
import { SignUpClientParams } from '@/domain/auth/usecases/signupClient'
import { SignInUseCaseParams } from '@/domain/auth/usecases/signIn'
import { Role } from '@/domain/auth/entities/role'
import { UpdatePasswordUseCaseParams } from '@/domain/auth/usecases/updatePassword'
import { AuthService } from '@/application/auth/services/AuthService'
import { createTestAppContainer } from '@tests/application/@shared/container/container'
import { TYPES } from '@/application/@shared/container/types'
import { InMemoryAuthRepository } from '@/infrastructure/auth/repositories/inMemoryAuthRepository'
import { InMemoryRemoteAuthDataSource } from '@/infrastructure/auth/datasources/InMemoryRemoteAuthDataSource'
import { InMemoryRemoteProfileDataSource } from '@/infrastructure/profile/datasources/InMemoryRemoteDataSource'

export const createAuthFixture = () => {
  let authenticatedUser: Auth
  let thrownError: Error | undefined

  const testAuthContainer = createTestAppContainer()

  const authRepositoryImpl = testAuthContainer.get(
    TYPES.AuthRepository
  ) as InMemoryAuthRepository
  const authRemoteDataSource =
    authRepositoryImpl.remoteAuthDataSource as InMemoryRemoteAuthDataSource
  const profileRemoteDataSource =
    authRepositoryImpl.remoteProfileDataSource as InMemoryRemoteProfileDataSource

  const authService = testAuthContainer.get(TYPES.AuthService) as AuthService

  const signUpClientUseCase = authService.GetSignUpUseCase()
  const signInUseCase = authService.GetSignInUseCase()
  const updatePasswordUseCase = authService.GetUpdatePasswordUseCase()

  return {
    givenUserExists (users: { profile: ProfileDTO; role: Role }[]) {
      authRemoteDataSource.givenAuths(
        users.map(u => ({ id: u.profile.id, role: u.role }))
      )
      profileRemoteDataSource.givenProfiles(users.map(u => u.profile))
    },
    async whenUserSignUp (params: SignUpClientParams) {
      try {
        const result = await signUpClientUseCase.handle(params)
        authenticatedUser = result.auth
      } catch (err: any) {
        thrownError = err
      }
    },
    async whenUserSignIn (params: SignInUseCaseParams) {
      try {
        const { auth, profile } = await signInUseCase.handle(params)
        authenticatedUser = auth
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
      const searchedProfile = profileRemoteDataSource.findById(
        expectedProfile.id
      )
      expect(searchedProfile).toEqual(expectedProfile)
    },
    thenProfileShouldNotExist (id: string) {
      const searchedProfile = profileRemoteDataSource.findById(id)
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
