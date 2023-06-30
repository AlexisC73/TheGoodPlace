import { Auth } from '@/domain/auth/entities/auth'
import { ProfileDTO } from '@/infrastructure/@shared/dtos/profileDTO'
import {
  SignUpClientParams,
  SignupClientUseCase
} from '@/domain/auth/usecases/signupClient'
import { InMemoryAuthRepository } from '@/infrastructure/auth/repositories/inMemoryAuthRepository'
import {
  SignInUseCase,
  SignInUseCaseParams
} from '@/domain/auth/usecases/signIn'
import { Role } from '@/domain/auth/entities/role'
import {
  UpdatePasswordUseCase,
  UpdatePasswordUseCaseParams
} from '@/domain/auth/usecases/updatePassword'
import { InMemoryProfileDataSource } from '@/infrastructure/@shared/datasources/InMemoryProfile'
import { InMemoryAuthDataSource } from '@/infrastructure/auth/datasources/InMemoryAuthDataSource'

export const createAuthFixture = () => {
  let authenticatedUser: Auth

  const profileDataSource = new InMemoryProfileDataSource()
  const authDataSource = new InMemoryAuthDataSource()

  const authRepository = new InMemoryAuthRepository(
    profileDataSource,
    authDataSource
  )

  const signUpClientUseCase = new SignupClientUseCase(authRepository)
  const signInUseCase = new SignInUseCase(authRepository)
  const updatePasswordUseCase = new UpdatePasswordUseCase(authRepository)

  return {
    givenUserExists (users: { profile: ProfileDTO; role: Role }[]) {
      authDataSource.givenUsers(
        users.map(u => ({ id: u.profile.id, role: u.role }))
      )
      profileDataSource.givenProfiles(users.map(u => u.profile))
    },
    async whenUserSignUp (params: SignUpClientParams) {
      authenticatedUser = await signUpClientUseCase.handle(params)
    },
    async whenUserSignIn (params: SignInUseCaseParams) {
      authenticatedUser = await signInUseCase.handle(params)
    },
    async whenUserUpdateHisPassword (params: UpdatePasswordUseCaseParams) {
      await updatePasswordUseCase.handle(params)
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
