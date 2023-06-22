import { UserConnection } from '../../domain/entities/connection'
import { Role, User } from '../../domain/entities/user'
import { UserRepository } from '../../domain/repositories/user'

export class InMemoryUserRepository implements UserRepository {
  users: User[] = []

  signinClient({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<UserConnection> {
    const user = this.users.find(
      (user) => user.email === email && user.password === password
    )
    if (!user) {
      throw new Error('User not found')
    }
    return Promise.resolve(
      new UserConnection(
        user.id,
        user.name,
        user.email,
        JSON.stringify(user.data),
        user.role,
        user.avatarUrl
      )
    )
  }

  signupClient({ email, password, name }: User): Promise<void> {
    const isExistUser = this.users.find((user) => user.email === email)
    if (isExistUser) {
      throw new Error('User already exists')
    }
    this.users.push(
      new User('1', name, email, password, 'default-avatar.png', Role.CLIENT)
    )
    return Promise.resolve()
  }
}
