import { InMemoryUserRepository } from '../../../infrastructure/repositories/in-memory-user'
import {
  SignupClientCommand,
  SignupClientUseCase,
} from '../user/signup-client.usecase'

export const createUserFixture = () => {
  const userRepository = new InMemoryUserRepository()

  const signupClientUseCase = new SignupClientUseCase(userRepository)
  return {
    async whenUserSignup(command: SignupClientCommand) {
      await signupClientUseCase.handle(command)
    },
    thenUserAccountShouldExist(expectedAccount: {
      email: string
      password: string
      name: string
    }) {
      const foundAccount = userRepository.getAccount({
        email: expectedAccount.email,
        password: expectedAccount.password,
      })

      expect(foundAccount).toEqual(
        expect.objectContaining({
          email: expectedAccount.email,
          name: expectedAccount.name,
        })
      )
    },
  }
}

export type UserFixture = ReturnType<typeof createUserFixture>
