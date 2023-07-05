import { CacheAuthDataSource } from '@/infrastructure/auth/datasources/CacheAuthDataSource'
import { Auth } from '../entities/auth'
import { AuthRepository } from '../repositories/authRepository'

export class LookForCachedAuthUseCase {
  constructor (private readonly authRepository: AuthRepository) {}

  handle (): Auth | undefined {
    return this.authRepository.getCachedAuth()
  }
}
