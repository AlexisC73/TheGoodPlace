import { UserRepository } from '../../@shared/repositories/user'

export class SignupClientUseCase {
  constructor (private readonly userRepository: UserRepository) {}
  async handle (command: SignupClientCommand) {
    if (command.password !== command.passwordConfirmation)
      throw new Error('Password and password confirmation must be the same')

    await this.userRepository.signupClient({
      id: command.id,
      email: command.email,
      password: command.password,
      name: command.name
    })
  }
}

export type SignupClientCommand = {
  id: string
  email: string
  password: string
  name: string
  passwordConfirmation: string
}
