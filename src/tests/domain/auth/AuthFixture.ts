import { InMemoryUserRepository } from '@/infrastructure/@shared/repositories/in-memory-user'
import { Auth } from '@/domain/auth/entities/auth'
import { SigninClientUseCase } from '@/domain/auth/usecases/signin-client.usecase'
import { SignupClientUseCase } from '@/domain/auth/usecases/signup-client.usecase'

export const createAuthFixture = ({
  userRepository = new InMemoryUserRepository()
}: {
  userRepository?: any
} = {}) => {
  const signupClientUseCase = new SignupClientUseCase(userRepository)
  const signinClientUseCase = new SigninClientUseCase(userRepository)

  let authUser: Auth

  return {
    async whenAUserSigninWith (command: { email: string; password: string }) {
      authUser = await signinClientUseCase.handle(command)
    },
    async whenUserSignup (command: {
      id: string
      name: string
      email: string
      password: string
      passwordConfirmation: string
    }) {
      await signupClientUseCase.handle({
        id: command.id,
        email: command.email,
        password: command.password,
        name: command.name,
        passwordConfirmation: command.passwordConfirmation
      })
    },
    thenConnectedUserShouldBe (expectedAuth: Auth) {
      expect(authUser).toEqual(expectedAuth)
    }
  }
}

export type AuthFixture = ReturnType<typeof createAuthFixture>
