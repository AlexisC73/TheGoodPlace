import { UserRepository } from '../../../domain/@shared/repositories/user'
import { Auth } from '../../../domain/auth/entities/auth'
import { Role } from '../../../domain/auth/entities/role'
import { User } from '../../../domain/user/entities/user'
import { UserDTO } from '../../user/dtos/userDto'

export class InMemoryUserRepository implements UserRepository {
  users = new Map<string, { data: UserDTO; password: string }>()

  signinClient ({
    email,
    password
  }: {
    email: string
    password: string
  }): Promise<Auth> {
    const user = this.getUserByEmail(email)
    if (!user) {
      throw new Error('User not found')
    }
    if (user.password !== password) {
      throw new Error('Wrong password')
    }
    return Promise.resolve(
      Auth.fromData({
        id: user.data.id,
        access_token: JSON.stringify({ id: user.data.id }),
        avatarUrl: user.data.avatarUrl,
        role: Role.CLIENT
      })
    )
  }

  signupClient ({
    id,
    email,
    password,
    name
  }: {
    id: string
    email: string
    password: string
    name: string
  }): Promise<void> {
    const newUser = UserDTO.fromData({
      id,
      email,
      name,
      avatarUrl: 'default/avatar.png'
    })

    this._save({ user: newUser, password })

    return Promise.resolve()
  }

  updateUserPassword ({
    id,
    newPassword,
    oldPassword
  }: {
    id: string
    newPassword: string
    oldPassword: string
  }): Promise<void> {
    const user = this.getUserById(id)
    if (!user) {
      throw new Error('User not found')
    }
    if (user.password !== oldPassword) {
      throw new Error('Wrong password')
    }
    this._save({ user: UserDTO.fromDomain(user.data), password: newPassword })
    return Promise.resolve()
  }

  _save ({ user, password }: { user: UserDTO; password: string }) {
    this.users.set(user.id, { data: user, password })
  }

  getUserById (id: string): { data: User; password: string } {
    const { data, password } = this.users.get(id)!

    return { data: data.toDomain(), password }
  }

  getUserByEmail (email: string): { data: UserDTO; password: string } | null {
    const user = Array.from(this.users.values()).find(
      ({ data }) => data.email === email
    )

    if (!user) {
      return null
    }

    return user
  }

  setUsers (users: { data: User; password: string }[]) {
    users.forEach(({ data, password }) => {
      this._save({ user: UserDTO.fromDomain(data), password })
    })
  }
}
