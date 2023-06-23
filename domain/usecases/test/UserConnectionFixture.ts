import { ConnectInfoDTO } from '../../../infrastructure/dtos/connectInfoDto'
import { InMemoryUserRepository } from '../../../infrastructure/repositories/in-memory-user'
import { UserConnection } from '../../entities/connection'
import {
  SigninClientCommand,
  SigninClientUseCase,
} from '../user/signin-client.usecase'

export const createUserConnectionFixture = () => {
  let userConnection: UserConnection

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
      userConnection = await signinUseCase.handle(command)
    },

    thenExpectedUserConnected(expectedUserConnected: { email: string }) {
      expect(userConnection.email).toEqual(expectedUserConnected.email)
    },
  }
}

export type UserConnectionFixture = ReturnType<
  typeof createUserConnectionFixture
>
