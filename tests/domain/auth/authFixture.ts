import { Auth } from '@/domain/auth/entities/auth'
import { ProfileDTO } from '@/infrastructure/profile/dtos/profileDTO'
import {
  SignUpClientParams,
  SignupClientUseCase
} from '@/domain/auth/usecases/signupClient'
import { InMemoryAuthRepository } from '@/infrastructure/auth/repositories/inMemoryAuthRepository'
import { InMemoryProfileRepository } from '@/infrastructure/profile/repositories/InMemoryProfile'
import {
  SignInUseCase,
  SignInUseCaseParams
} from '@/domain/auth/usecases/signIn'
import { Role } from '@/domain/auth/entities/role'
import {
  UpdatePasswordUseCase,
  UpdatePasswordUseCaseParams
} from '@/domain/auth/usecases/updatePassword'

export const createAuthFixture = () => {
  let authenticatedUser: Auth

  const authRepository = new InMemoryAuthRepository()
  const profileRepository = new InMemoryProfileRepository()
  const signUpClientUseCase = new SignupClientUseCase(
    authRepository,
    profileRepository
  )
  const signInUseCase = new SignInUseCase(profileRepository, authRepository)
  const updatePasswordUseCase = new UpdatePasswordUseCase(profileRepository)

  return {
    givenUserExists (users: { profile: ProfileDTO; role: Role }[]) {
      profileRepository.givenUsers(users.map(u => u.profile))
      authRepository.givenUsers(
        users.map(u => ({ id: u.profile.id, role: u.role }))
      )
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
      const searchedProfile = profileRepository.findById(expectedProfile.id)
      expect(searchedProfile).toEqual(expectedProfile)
    },
    thenAuthenticatedUserShouldBe (expectedAuth: Auth) {
      expect(authenticatedUser).toEqual(expectedAuth)
    }
  }
}

export type AuthFixture = ReturnType<typeof createAuthFixture>
