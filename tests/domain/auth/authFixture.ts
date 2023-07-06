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
import { Profile } from '@/domain/profile/entities/profile'

export const createAuthFixture = () => {
  let authUser: Auth | undefined
  let profileUser: Profile | undefined
  let thrownError: Error | undefined

  const testAuthContainer = createTestAppContainer()

  const authRepositoryImpl = testAuthContainer.get(
    TYPES.AuthRepository
  ) as InMemoryAuthRepository
  const authRemoteDataSource =
    authRepositoryImpl.remoteAuthDataSource as InMemoryRemoteAuthDataSource
  const profileRemoteDataSource =
    authRepositoryImpl.remoteProfileDataSource as InMemoryRemoteProfileDataSource

  const cacheAuthDataSource = authRepositoryImpl.cacheAuthDataSource
  const cacheProfileDataSource = authRepositoryImpl.cacheProfileDataSource

  const authService = testAuthContainer.get(TYPES.AuthService) as AuthService

  const signUpClientUseCase = authService.GetSignUpUseCase()
  const signInUseCase = authService.GetSignInUseCase()
  const updatePasswordUseCase = authService.GetUpdatePasswordUseCase()
  const lookForCachedAuthUseCase = authService.GetLookForCachedAuthUseCase()
  const signOutUseCase = authService.GetSignOutUseCase()
  const getProfileUseCase = authService.GetGetProfileUseCase()

  return {
    givenUserExists (users: { profile: ProfileDTO; role: Role }[]) {
      authRemoteDataSource.givenAuths(
        users.map(u => ({ id: u.profile.id, role: u.role }))
      )
      profileRemoteDataSource.givenProfiles(users.map(u => u.profile))
    },
    givenAuthIsAuthenticated (authInfo: { id: string; role: Role }) {
      cacheAuthDataSource.cacheAuth(authInfo)
      authUser = Auth.fromData({
        id: authInfo.id,
        access_token: JSON.stringify({ id: authInfo.id }),
        role: authInfo.role
      })
    },
    givenNoAuthIsCached () {
      cacheAuthDataSource.removeCachedAuth()
    },
    givenProfileIsCached (profile: Profile) {
      cacheProfileDataSource.saveProfile(profile)
    },
    async whenUserSignUp (params: SignUpClientParams) {
      try {
        authUser = await signUpClientUseCase.handle(params)
      } catch (err: any) {
        thrownError = err
      }
    },
    async whenUserSignIn (params: SignInUseCaseParams) {
      try {
        authUser = await signInUseCase.handle(params)
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
    whenGetCachedAuthIsCalled () {
      authUser = lookForCachedAuthUseCase.handle()
    },
    async whenAuthGetProfile () {
      try {
        profileUser = await getProfileUseCase.handle({ auth: authUser! })
      } catch (err: any) {
        thrownError = err
      }
    },
    whenAuthSignOut () {
      signOutUseCase.handle()
      authUser = undefined
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
      expect(authUser).toEqual(expectedAuth)
    },
    thenAuthenticatedUserShouldBeCached (expectedAuth: Auth) {
      const cachedAuth = cacheAuthDataSource.getCachedAuth()
      expect(cachedAuth).toEqual(expectedAuth)
    },
    thenErrorShouldBeThrown () {
      expect(thrownError).toBeInstanceOf(Error)
    },
    thenAuthenticatedShouldBeUndefined () {
      expect(authUser).toBeUndefined()
    },
    thenAuthCacheShouldBeEmpty () {
      expect(cacheAuthDataSource.getCachedAuth()).toBeUndefined()
    },
    thenProfileCacheShouldBeEmpty () {
      expect(cacheProfileDataSource.getProfile()).toBeUndefined()
    },
    thenProfileShouldBe (expectedProfile: Profile) {
      expect(profileUser).toEqual(expectedProfile)
    }
  }
}

export type AuthFixture = ReturnType<typeof createAuthFixture>
