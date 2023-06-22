import { UserConnection } from '../../entities/connection'
import { UserRepository } from '../../repositories/user'

export class SigninClientUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async handle(command: SigninClientCommand): Promise<UserConnection> {
    const client = await this.userRepository.signinClient({
      email: command.email,
      password: command.password,
    })
    if (!client) {
      throw new Error('User not found')
    }

    return client
  }
}

export type SigninClientCommand = {
  email: string
  password: string
}
