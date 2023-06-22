import { UserRepository } from '../../repositories/user'

export class SignupClientUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async handle(command: SignupClientCommand) {
    await this.userRepository.signupClient({
      email: command.email,
      password: command.password,
      name: command.name,
    })
  }
}

export type SignupClientCommand = {
  email: string
  password: string
  name: string
}
