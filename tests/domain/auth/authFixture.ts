import { SignupClientUseCase } from '@/domain/auth/usecases/signup-client'
import { InMemoryAuthRepository } from '@/infrastructure/auth/repositories/inMemoryAuthRepository'
import { Auth } from '@/domain/auth/entities/auth'
import { SignUpClientParams } from '@/domain/auth/usecases/signup-client'
import { SignInParams, SignInUseCase } from '@/domain/auth/usecases/signIn'
import { AuthDTO } from '@/infrastructure/auth/dtos/auth'

export const createAuthFixture = () => {
  let currentAuth: Auth

  const authRepository = new InMemoryAuthRepository()
  const signUpClientUseCase = new SignupClientUseCase(authRepository)
  const signInUseCase = new SignInUseCase(authRepository)

  return {
    givenAuthAccounts (givenAuth: AuthDTO[]) {
      authRepository.setAuths(givenAuth)
    },
    async whenUserSignUpWithCredentials (credentials: SignUpClientParams) {
      currentAuth = await signUpClientUseCase.handle(credentials)
    },
    async whenUserSignInWithCredentials (credentials: SignInParams) {
      currentAuth = await signInUseCase.handle(credentials)
    },
    thenAuthenticatedUserShouldBe (expectedAuth: Auth) {
      expect(currentAuth).toEqual(expectedAuth)
    }
  }
}

export type AuthFixture = ReturnType<typeof createAuthFixture>
