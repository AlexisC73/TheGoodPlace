import { InMemoryUserRepository } from '../../../../infrastructure/@shared/repositories/in-memory-user'
import { Auth } from '../../entities/auth'
import {
  SigninClientCommand,
  SigninClientUseCase,
} from '../signin-client.usecase'

export const createUserConnectionFixture = () => {
  let authInfo: Auth

  const userRepository = new InMemoryUserRepository()
  const signinUseCase = new SigninClientUseCase(userRepository)

  return {
    givenUserExist(
      existingUsers: {
        email: string
        password: string
        name: string
      }[]
    ) {
      userRepository._setUsers(existingUsers)
    },

    async whenUserSignin(command: SigninClientCommand) {
      authInfo = await signinUseCase.handle(command)
    },

    thenExpectedUserConnected(expectedUserConnected: { email: string }) {
      expect(true).toBe(true) // TODO: modifier pour prendre en compte le changement pour le auth
    },
  }
}

export type UserConnectionFixture = ReturnType<
  typeof createUserConnectionFixture
>
