import { UserConnection } from '../../domain/entities/connection'
import { Role, User } from '../../domain/entities/user'
import { UserRepository } from '../../domain/repositories/user'
import { ConnectInfoDTO } from '../dtos/connectInfoDto'
import { SigninClientDto } from '../dtos/signinClientDto'
import { SignupClientDTO } from '../dtos/signupDto'
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
    const signinDto = SigninClientDto.fromData({email, password})
    if(!signinDto.isValid()) {
      throw new Error("Invalid user data")
    }

    const existingUser = this.users.get(signinDto.email + '-' + signinDto.password)
    if (!existingUser) {
      throw new Error('User not found')
    }

    const userConnection = ConnectInfoDTO.fromData({
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      access_token: existingUser.toStringJSON(),
      role: existingUser.role,
      avatarUrl: existingUser.avatarUrl
    })

    return Promise.resolve(userConnection.toDomain())
  }

  signupClient(command: {
    email: string
    password: string
    name: string
    passwordConfirmation: string
  }): Promise<void> {
    const isExistUser = this.users.get(command.email + '-' + command.password)
    if (isExistUser) {
      throw new Error('User already exists')
    }

    const newUser = SignupClientDTO.fromData({
      email: command.email,
      password: command.password,
      name: command.name,
      passwordConfirmation: command.passwordConfirmation,
    })

    if(!newUser.isValid()) {
      throw new Error('Invalid user data')
    }

    this._createUser({
      email: newUser.email,
      name: newUser.name,
      password: newUser.password,
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
        password: user.password,
      })
    })
  }

  _createUser(userInfo: {
    email: string
    name: string
    password: string
  }) {
    const newUser = UserDTO.fromData({
      id: Math.floor(Math.random() * 1000).toString(),
      email: userInfo.email,
      name: userInfo.name,
      role: Role.CLIENT.toString(),
      avatarUrl: "default-avatar.png",
    })
    this.users.set(userInfo.email + '-' + userInfo.password, newUser)
    return
  }
}
