import { Auth } from '../entities/auth'
import { UserRepository } from '../../@shared/repositories/user'

export class SigninClientUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  async handle (command: SigninClientCommand): Promise<Auth> {
    const auth = await this.userRepository.signinClient(command)
    if (!auth) {
      throw new Error('User not found')
    }
    return auth
  }
}

export type SigninClientCommand = {
  email: string
  password: string
}
