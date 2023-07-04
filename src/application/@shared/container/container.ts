import 'reflect-metadata'
import { InMemoryProfileDataSource } from '@/infrastructure/@shared/datasources/InMemoryProfile'
import { Container } from 'inversify'
import { TYPES } from './types'
import { ProfileService } from '@/application/profile/services/profileService'
import { AuthRepository } from '@/domain/auth/repositories/authRepository'
import { InMemoryAuthRepository } from '@/infrastructure/auth/repositories/inMemoryAuthRepository'
import { InMemoryAuthDataSource } from '@/infrastructure/auth/datasources/InMemoryAuthDataSource'
import { AuthService } from '@/application/auth/services/AuthService'
import { ProfileRepository } from '@/domain/profile/repositories/profileRepository'
import { InMemoryProfileRepository } from '@/infrastructure/profile/repositories/profileRepository'
import { CatalogService } from '@/application/catalog/services/catalogService'
import { BookRepository } from '@/domain/catalog/repositories/book'
import { InMemoryBookRepository } from '@/infrastructure/catalog/repositories/in-memory-book-repository'

export const appContainer = new Container()
appContainer
  .bind<ProfileRepository>(TYPES.ProfileRepository)
  .to(InMemoryProfileRepository)
  .inSingletonScope()
appContainer
  .bind<ProfileService>(TYPES.ProfileService)
  .to(ProfileService)
  .inSingletonScope()
appContainer
  .bind<AuthRepository>(TYPES.AuthRepository)
  .to(InMemoryAuthRepository)
  .inSingletonScope()
appContainer
  .bind(TYPES.LocalProfileDataSource)
  .to(InMemoryProfileDataSource)
  .inSingletonScope()
appContainer
  .bind(TYPES.LocalAuthDataSource)
  .to(InMemoryAuthDataSource)
  .inSingletonScope()
appContainer
  .bind<AuthService>(TYPES.AuthService)
  .to(AuthService)
  .inSingletonScope()
appContainer
  .bind<BookRepository>(TYPES.BookRepository)
  .to(InMemoryBookRepository)
  .inSingletonScope()
appContainer
  .bind<CatalogService>(TYPES.CatalogService)
  .to(CatalogService)
  .inSingletonScope()
