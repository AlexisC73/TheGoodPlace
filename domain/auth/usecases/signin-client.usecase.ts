import { Auth } from '../entities/auth'
import { UserRepository } from '../../@shared/repositories/user'

export class SigninClientUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(command: SigninClientCommand): Promise<Auth> {
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
