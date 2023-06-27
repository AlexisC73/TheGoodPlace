import { Role } from '../../../domain/auth/entities/role'
import { User } from '../../../domain/user/entities/user'
import { UserRepository } from '../../../domain/@shared/repositories/user'
import { AuthDTO } from '../../auth/dtos/authDto'
import { UserDTO } from '../../user/dtos/userDto'
import { SigninClientDto } from '../../auth/dtos/signinClientDto'
import { SignupClientDTO } from '../../auth/dtos/signupDto'
import { Auth } from '../../../domain/auth/entities/auth'

export class InMemoryUserRepository implements UserRepository {
  users = new Map<string, UserDTO>()

  signinClient (command: { email: string; password: string }): Promise<Auth> {
    const signinClientDto = SigninClientDto.fromData({
      email: command.email,
      password: command.password
    })

    if (!signinClientDto.isValid()) {
      throw new Error('Invalid user data')
    }

    const existingUser = this.users.get(
      signinClientDto.email + '-' + signinClientDto.password
    )
    if (!existingUser) {
      throw new Error('User not found')
    }

    const auth = AuthDTO.fromData({
      id: existingUser.id,
      access_token: JSON.stringify(existingUser.data),
      role: Role[existingUser.role as keyof typeof Role],
      avatarUrl: existingUser.avatarUrl
    })

    return Promise.resolve(auth.toDomain())
  }

  signupClient (command: {
    email: string
    password: string
    name: string
    passwordConfirmation: string
  }): Promise<void> {
    const signupClientDTO = SignupClientDTO.fromData({
      email: command.email,
      password: command.password,
      name: command.name,
      passwordConfirmation: command.passwordConfirmation
    })

    if (!signupClientDTO.isValid()) {
      throw new Error('Invalid user data')
    }

    const isExistUser = this.users.get(
      signupClientDTO.email + '-' + signupClientDTO.password
    )
    if (isExistUser) {
      throw new Error('User already exists')
    }

    this._createUser({
      email: signupClientDTO.email,
      name: signupClientDTO.name,
      password: signupClientDTO.password
    })
    return Promise.resolve()
  }

  getAccount ({
    email,
    password
  }: {
    email: string
    password: string
  }): UserDTO {
    const foundAccount = this.users.get(email + '-' + password)
    if (!foundAccount) throw new Error('User not found')
    return foundAccount!
  }

  _setUsers (
    users: {
      email: string
      password: string
      name: string
    }[]
  ) {
    users.forEach(user => {
      this._createUser({
        email: user.email,
        name: user.name,
        password: user.password
      })
    })
  }

  _createUser (userInfo: { email: string; name: string; password: string }) {
    const newUser = UserDTO.fromData({
      id: Math.floor(Math.random() * 1000).toString(),
      email: userInfo.email,
      name: userInfo.name,
      role: Role.CLIENT.toString(),
      avatarUrl: 'default-avatar.png'
    })
    this.users.set(userInfo.email + '-' + userInfo.password, newUser)
    return
  }

  getUserById (id: string): UserDTO | null {
    let foundUser: UserDTO | null = null

    this.users.forEach(user => {
      if (user.id === id) {
        foundUser = user
      }
    })
    return foundUser
  }
}
