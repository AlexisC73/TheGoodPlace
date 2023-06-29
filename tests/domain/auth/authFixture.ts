import { SignupClientUseCase } from '@/domain/auth/usecases/signupClient'
import { InMemoryAuthRepository } from '@/infrastructure/auth/repositories/inMemoryAuthRepository'
import { Auth } from '@/domain/auth/entities/auth'
import { SignUpClientParams } from '@/domain/auth/usecases/signupClient'
import { SignInParams, SignInUseCase } from '@/domain/auth/usecases/signIn'
import { AuthDTO } from '@/infrastructure/auth/dtos/auth'
import {
  UpdatePassword,
  UpdatePasswordParams
} from '@/domain/auth/usecases/updatePassword'

export const createAuthFixture = () => {
  let currentAuth: Auth

  const authRepository = new InMemoryAuthRepository()
  const signUpClientUseCase = new SignupClientUseCase(authRepository)
  const signInUseCase = new SignInUseCase(authRepository)
  const updatePassword = new UpdatePassword(authRepository)

  return {
    givenAuthAccounts (givenAuth: AuthDTO[]) {
      authRepository.setAuths(givenAuth)
    },
    async whenUserSignUpWithCredentials (credentials: SignUpClientParams) {
      currentAuth = await signUpClientUseCase.handle(credentials)
    },
    async whenUserUpdatePassword (params: UpdatePasswordParams) {
      await updatePassword.handle(params)
    },
    async whenUserSignInWithCredentials (credentials: SignInParams) {
      currentAuth = await signInUseCase.handle(credentials)
    },
    thenAuthenticatedUserShouldBe (expectedAuth: Auth) {
      expect(currentAuth).toEqual(expectedAuth)
    },
    thenAccountShouldBe (expectedAccount: AuthDTO) {
      const auth = authRepository.getAuthById(expectedAccount.id)
      expect(auth).toEqual(expectedAccount)
    }
  }
}

export type AuthFixture = ReturnType<typeof createAuthFixture>
