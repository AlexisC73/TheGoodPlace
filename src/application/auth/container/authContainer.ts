import 'reflect-metadata'
import { InMemoryAuthRepository } from '@/infrastructure/auth/repositories/inMemoryAuthRepository'
import { ApiBookRepository } from '../../../infrastructure/catalog/repositories/api-book-repository'
import { Container } from 'inversify'
import { AuthRepository } from '@/domain/auth/repositories/authRepository'
import { AuthService } from '@/application/auth/services/AuthService'
import { TYPES } from './types'
import { InMemoryProfileDataSource } from '@/infrastructure/@shared/datasources/InMemoryProfile'
import { InMemoryAuthDataSource } from '@/infrastructure/auth/datasources/InMemoryAuthDataSource'

export function Dependencies () {
  return {
    bookRepository: new ApiBookRepository()
  }
}

export const authContainer = new Container()
authContainer
  .bind<AuthRepository>(TYPES.AuthRepository)
  .to(InMemoryAuthRepository)
  .inSingletonScope()
authContainer
  .bind(TYPES.LocalProfileDataSource)
  .to(InMemoryProfileDataSource)
  .inSingletonScope()
authContainer
  .bind(TYPES.LocalAuthDataSource)
  .to(InMemoryAuthDataSource)
  .inSingletonScope()
authContainer
  .bind<AuthService>(TYPES.AuthService)
  .to(AuthService)
  .inSingletonScope()
