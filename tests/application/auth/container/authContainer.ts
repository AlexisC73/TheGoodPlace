import 'reflect-metadata'
import { TYPES } from '@/application/auth/container/types'
import { AuthService } from '@/application/auth/services/AuthService'
import { AuthRepository } from '@/domain/auth/repositories/authRepository'
import { InMemoryProfileDataSource } from '@/infrastructure/@shared/datasources/InMemoryProfile'
import { InMemoryAuthDataSource } from '@/infrastructure/auth/datasources/InMemoryAuthDataSource'
import { InMemoryAuthRepository } from '@/infrastructure/auth/repositories/inMemoryAuthRepository'
import { Container } from 'inversify'

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
