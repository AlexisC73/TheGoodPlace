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
authContainer.bind(TYPES.LocalProfileDataSource).to(InMemoryProfileDataSource)
authContainer.bind(TYPES.LocalAuthDataSource).to(InMemoryAuthDataSource)
authContainer.bind<AuthService>(TYPES.AuthService).to(AuthService)

const authDataSource = new InMemoryAuthDataSource()
const profileDataSource = new InMemoryProfileDataSource()

export const testAuthContainer = new Container()
testAuthContainer
  .bind<AuthRepository>(TYPES.AuthRepository)
  .to(InMemoryAuthRepository)
testAuthContainer
  .bind(TYPES.LocalProfileDataSource)
  .toConstantValue(profileDataSource)
testAuthContainer
  .bind(TYPES.LocalAuthDataSource)
  .toConstantValue(authDataSource)
testAuthContainer.bind<AuthService>(TYPES.AuthService).to(AuthService)
