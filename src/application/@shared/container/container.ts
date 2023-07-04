import 'reflect-metadata'
import { Container } from 'inversify'
import { TYPES } from './types'
import { ProfileService } from '@/application/profile/services/profileService'
import { AuthRepository } from '@/domain/auth/repositories/authRepository'
import { InMemoryAuthRepository } from '@/infrastructure/auth/repositories/inMemoryAuthRepository'
import { AuthService } from '@/application/auth/services/AuthService'
import { ProfileRepository } from '@/domain/profile/repositories/profileRepository'
import { CatalogService } from '@/application/catalog/services/catalogService'
import { BookRepository } from '@/domain/catalog/repositories/book'
import { ProfileRepositoryImpl } from '@/infrastructure/profile/repositories/profileRepository'
import { BookRepositoryImpl } from '@/infrastructure/catalog/repositories/BookRepositoryImpl'

export const appContainer = new Container()
appContainer
  .bind<ProfileRepository>(TYPES.ProfileRepository)
  .to(ProfileRepositoryImpl)
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
  .bind<AuthService>(TYPES.AuthService)
  .to(AuthService)
  .inSingletonScope()
appContainer
  .bind<BookRepository>(TYPES.BookRepository)
  .to(BookRepositoryImpl)
  .inSingletonScope()
appContainer
  .bind<CatalogService>(TYPES.CatalogService)
  .to(CatalogService)
  .inSingletonScope()
