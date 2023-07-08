import { inject, injectable } from 'inversify'
import { Auth } from '../entities/auth'
import { AuthRepository } from '../repositories/authRepository'

@injectable()
export class GetCachedAuthUseCase {
  constructor (
    @inject(AuthRepository) private readonly authRepository: AuthRepository
  ) {}

  handle (): Auth | undefined {
    return this.authRepository.getCachedAuth()
  }
}
