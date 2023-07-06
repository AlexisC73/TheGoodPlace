import { Auth } from '../entities/auth'
import { AuthRepository } from '../repositories/authRepository'

export class LookForCachedAuthUseCase {
  constructor (private readonly authRepository: AuthRepository) {}

  handle (): Auth | undefined {
    return this.authRepository.getCachedAuth()
  }
}
