import { inject, injectable } from 'inversify'
import { AuthRepository } from '../repositories/authRepository'

@injectable()
export class SignOutUseCase {
  constructor (
    @inject(AuthRepository) private readonly authRepository: AuthRepository
  ) {}

  handle () {
    return this.authRepository.signOut()
  }
}
