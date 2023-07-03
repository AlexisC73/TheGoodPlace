import { InMemoryAuthRepository } from '@/infrastructure/auth/repositories/inMemoryAuthRepository'
import { ApiBookRepository } from '../infrastructure/catalog/repositories/api-book-repository'
import { Container } from 'inversify'
import { AuthRepository } from '@/domain/auth/repositories/authRepository'
import { AuthService } from './usecases/AuthService'
import { TYPES } from './types'
import { InMemoryProfileDataSource } from '@/infrastructure/@shared/datasources/InMemoryProfile'
import { InMemoryAuthDataSource } from '@/infrastructure/auth/datasources/InMemoryAuthDataSource'
import 'reflect-metadata'

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

export const createTestAuthContainer = () => {
  const testAuthContainer = new Container()
  testAuthContainer
    .bind<AuthRepository>(TYPES.AuthRepository)
    .to(InMemoryAuthRepository)
    .inSingletonScope()
  testAuthContainer
    .bind(TYPES.LocalProfileDataSource)
    .to(InMemoryProfileDataSource)
    .inSingletonScope()
  testAuthContainer
    .bind(TYPES.LocalAuthDataSource)
    .to(InMemoryAuthDataSource)
    .inSingletonScope()
  testAuthContainer
    .bind<AuthService>(TYPES.AuthService)
    .to(AuthService)
    .inSingletonScope()
  return testAuthContainer
}
