import { UserConnection } from '../../domain/entities/connection'
import { Role } from '../../domain/entities/user'
import { UserRepository } from '../../domain/repositories/user'
import { ConnectInfoDTO } from '../dtos/connectInfoDto'

export class InMemoryUserRepository implements UserRepository {
  users: { connectionInformation: string; connectInfoDto: ConnectInfoDTO }[] =
    []

  signinClient({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<UserConnection> {
    const existingUser = this.users.find(
      (user) => user.connectionInformation === email + '-' + password
    )
    if (!existingUser) {
      throw new Error('User not found')
    }

    return Promise.resolve(existingUser.connectInfoDto.toDomain())
  }

  signupClient(command: {
    email: string
    password: string
    name: string
  }): Promise<void> {
    const isExistUser = this.users.find(
      (user) =>
        user.connectionInformation === command.email + '-' + command.password
    )
    if (isExistUser) {
      throw new Error('User already exists')
    }

    const newUser = new ConnectInfoDTO(
      Math.floor(Math.random() * 1000).toString(),
      command.name,
      command.email,
      'testing-token',
      Role.CLIENT.toString(),
      'default-avatar.png'
    )

    this.users.push({
      connectionInformation: command.email + '-' + command.password,
      connectInfoDto: newUser,
    })
    return Promise.resolve()
  }

  getAccount({
    email,
    password,
  }: {
    email: string
    password: string
  }): ConnectInfoDTO {
    const foundAccount = this.users.find(
      (user) => user.connectionInformation === email + '-' + password
    )
    return foundAccount?.connectInfoDto!
  }
}
