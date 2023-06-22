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
      existingUsers: [
        { connectionInformation: string; connectInfoDto: ConnectInfoDTO }
      ]
    ) {
      userRepository.users = existingUsers
    },

    async whenUserSignin(command: SigninClientCommand) {
      userConnection = await signinUseCase.handle(command)
    },

    thenReturnedUserConnectionShouldBe(expectedUserConnection: UserConnection) {
      expect(userConnection).toEqual(expectedUserConnection)
    },
  }
}

export type UserConnectionFixture = ReturnType<
  typeof createUserConnectionFixture
>
