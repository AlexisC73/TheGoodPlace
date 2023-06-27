import { InMemoryUserRepository } from '../../../../infrastructure/@shared/repositories/in-memory-user'
import { User } from '../../../user/entities/user'
import {
  UpdateUserPasswordCommand,
  UpdateUserPasswordUseCase
} from '../../../user/usecases/update-password.usecase'

export const createUserFixture = ({
  userRepository = new InMemoryUserRepository()
}: { userRepository?: any } = {}) => {
  const updateUserPasswordUseCase = new UpdateUserPasswordUseCase(
    userRepository
  )
  return {
    givenUsersExist (users: { data: User; password: string }[]) {
      userRepository.setUsers(users)
    },
    async whenUserUpdateHisPassword (command: UpdateUserPasswordCommand) {
      await updateUserPasswordUseCase.handle(command)
    },
    thenUserPasswordShouldBe (expectedUser: { id: string; password: string }) {
      const { password } = userRepository.getUserById(expectedUser.id)
      expect(password).toEqual(expectedUser.password)
    },
    thenUserShouldExist (expectedUser: User) {
      const { data: user } = userRepository.getUserById(expectedUser.id)
      expect(user).toEqual(expectedUser)
    }
  }
}

export type UserFixture = ReturnType<typeof createUserFixture>
