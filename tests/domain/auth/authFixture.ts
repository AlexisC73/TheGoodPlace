import { createTestAppContainer } from '@tests/application/@shared/container/container'
import { Auth } from '@/domain/auth/entities/auth'
import { ProfileDTO } from '@/infrastructure/@shared/dtos/profileDTO'
import {
  SignUpClientParams,
  SignupClientUseCase
} from '@/domain/auth/usecases/signupClient'
import {
  SignInUseCase,
  SignInUseCaseParams
} from '@/domain/auth/usecases/signIn'
import { Role } from '@/domain/auth/entities/role'
import {
  UpdatePasswordUseCase,
  UpdatePasswordUseCaseParams
} from '@/domain/auth/usecases/updatePassword'
import { InMemoryAuthRepository } from '@/infrastructure/auth/repositories/inMemoryAuthRepository'
import { InMemoryRemoteAuthDataSource } from '@/infrastructure/auth/datasources/InMemoryRemoteAuthDataSource'
import { InMemoryRemoteProfileDataSource } from '@/infrastructure/profile/datasources/InMemoryRemoteDataSource'
import { Profile } from '@/domain/profile/entities/profile'
import { AuthRepository } from '@/domain/auth/repositories/authRepository'
import { GetCachedAuthUseCase } from '@/domain/auth/usecases/getCachedAuth'
import { SignOutUseCase } from '@/domain/auth/usecases/signOutUseCase'
import { GetProfileUseCase } from '@/domain/auth/usecases/getProfile'

export const createAuthFixture = () => {
  let authUser: Auth | undefined
  let profileUser: Profile | undefined
  let thrownError: Error | undefined

  const appContainer = createTestAppContainer()

  const authRepositoryImpl = appContainer.get(
    AuthRepository
  ) as InMemoryAuthRepository

  const authRemoteDataSource =
    authRepositoryImpl.remoteAuthDataSource as InMemoryRemoteAuthDataSource
  const profileRemoteDataSource =
    authRepositoryImpl.remoteProfileDataSource as InMemoryRemoteProfileDataSource

  const cacheAuthDataSource = authRepositoryImpl.cacheAuthDataSource
  const cacheProfileDataSource = authRepositoryImpl.cacheProfileDataSource

  const signUpClientUseCase = appContainer.get(SignupClientUseCase)
  const signInUseCase = appContainer.get(SignInUseCase)
  const updatePasswordUseCase = appContainer.get(UpdatePasswordUseCase)
  const lookForCachedAuthUseCase = appContainer.get(GetCachedAuthUseCase)
  const signOutUseCase = appContainer.get(SignOutUseCase)
  const getProfileUseCase = appContainer.get(GetProfileUseCase)

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
