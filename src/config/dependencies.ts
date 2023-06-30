import { InMemoryAuthRepository } from '@/infrastructure/auth/repositories/inMemoryAuthRepository'
import { ApiBookRepository } from '../infrastructure/catalog/repositories/api-book-repository'
import { InMemoryAuthDataSource } from '@/infrastructure/auth/datasources/InMemoryAuthDataSource'
import { InMemoryProfileDataSource } from '@/infrastructure/@shared/datasources/InMemoryProfile'

const authDataSource = new InMemoryAuthDataSource()
const profileDataSource = new InMemoryProfileDataSource()

export function Dependencies () {
  return {
    authRepository: new InMemoryAuthRepository(
      profileDataSource,
      authDataSource
    ),
    bookRepository: new ApiBookRepository()
  }
}
