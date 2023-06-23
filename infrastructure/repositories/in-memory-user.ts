import { UserConnection } from '../../domain/entities/connection'
import { Role, User } from '../../domain/entities/user'
import { UserRepository } from '../../domain/repositories/user'
import { ConnectInfoDTO } from '../dtos/connectInfoDto'
import { UserDTO } from '../dtos/userDto'

export class InMemoryUserRepository implements UserRepository {
  users = new Map<string, UserDTO>()

  signinClient({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<UserConnection> {
    const existingUser = this.users.get(email + '-' + password)
    if (!existingUser) {
      throw new Error('User not found')
    }

    const userConnection = new ConnectInfoDTO(
      existingUser.id,
      existingUser.name,
      existingUser.email,
      existingUser.toStringJSON(),
      existingUser.role,
      existingUser.avatarUrl
    )

    return Promise.resolve(userConnection.toDomain())
  }

  signupClient(command: {
    email: string
    password: string
    name: string
    role: string
  }): Promise<void> {
    const isExistUser = this.users.get(command.email + '-' + command.password)
    if (isExistUser) {
      throw new Error('User already exists')
    }

    this._createUser({
      email: command.email,
      name: command.name,
      role: command.role,
      avatarUrl: 'default-avatar.png',
      password: command.password,
    })

    return Promise.resolve()
  }

  getAccount({ email, password }: { email: string; password: string }): User {
    const foundAccount = this.users.get(email + '-' + password)
    if (!foundAccount) throw new Error('User not found')
    return foundAccount!
  }

  _setUsers(
    users: {
      email: string
      password: string
      name: string
    }[]
  ) {
    users.forEach((user) => {
      this._createUser({
        email: user.email,
        name: user.name,
        role: Role.CLIENT.toString(),
        avatarUrl: 'default-avatar.png',
        password: user.password,
      })
    })
  }

  _createUser(userInfo: {
    email: string
    name: string
    role: string
    avatarUrl: string
    password: string
  }) {
    const newUser = UserDTO.fromData({
      id: Math.floor(Math.random() * 1000).toString(),
      email: userInfo.email,
      name: userInfo.name,
      role: userInfo.role,
      avatarUrl: userInfo.avatarUrl,
    })
    this.users.set(userInfo.email + '-' + userInfo.password, newUser)
    return
  }
}
