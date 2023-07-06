import { AuthRepository } from '../repositories/authRepository'

export class SignOutUseCase {
  constructor (private readonly authRepository: AuthRepository) {}

  handle () {
    return this.authRepository.signOut()
  }
}
