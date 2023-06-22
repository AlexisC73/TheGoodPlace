import { Role, UserConnection } from '../../entities/connection'
import { UserRepository } from '../../repositories/user'

export class SigninClientUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async handle(command: SigninClientCommand): Promise<UserConnection> {
    const client = await this.userRepository.signinClient(command)
    return client
  }
}

export type SigninClientCommand = {
  email: string
  password: string
}
