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

export const container = new Container()
container.bind<AuthRepository>(TYPES.AuthRepository).to(InMemoryAuthRepository)
container.bind(TYPES.LocalProfileDataSource).to(InMemoryProfileDataSource)
container.bind(TYPES.LocalAuthDataSource).to(InMemoryAuthDataSource)
container.bind<AuthService>(TYPES.AuthService).to(AuthService)

const authDataSource = new InMemoryAuthDataSource()
const profileDataSource = new InMemoryProfileDataSource()

export const testContainer = new Container()
testContainer
  .bind<AuthRepository>(TYPES.AuthRepository)
  .to(InMemoryAuthRepository)
testContainer
  .bind(TYPES.LocalProfileDataSource)
  .toConstantValue(profileDataSource)
testContainer.bind(TYPES.LocalAuthDataSource).toConstantValue(authDataSource)
testContainer.bind<AuthService>(TYPES.AuthService).to(AuthService)
