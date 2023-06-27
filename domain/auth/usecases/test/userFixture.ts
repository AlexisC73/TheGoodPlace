import { InMemoryUserRepository } from '../../../../infrastructure/@shared/repositories/in-memory-user'
import {
  SignupClientCommand,
  SignupClientUseCase
} from '../signup-client.usecase'

export const createUserFixture = () => {
  let thrownError: Error

  const userRepository = new InMemoryUserRepository()
  const signupClientUseCase = new SignupClientUseCase(userRepository)

  return {
    async whenUserSignup (command: SignupClientCommand) {
      try {
        await signupClientUseCase.handle(command)
      } catch (err: any) {
        thrownError = err
      }
    },
    thenUserAccountShouldExist (expectedAccount: {
      email: string
      password: string
      name: string
    }) {
      const foundAccount = userRepository.getAccount({
        email: expectedAccount.email,
        password: expectedAccount.password
      })

      expect(foundAccount).toEqual(
        expect.objectContaining({
          email: expectedAccount.email,
          name: expectedAccount.name
        })
      )
    },

    thenErrorShoudBeThrown (expectedErrorMessage: string) {
      expect(thrownError.message).toBe(expectedErrorMessage)
    }
  }
}

export type UserFixture = ReturnType<typeof createUserFixture>
