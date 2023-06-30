import { InMemoryAuthRepository } from '@/infrastructure/auth/repositories/inMemoryAuthRepository'
import { ApiBookRepository } from '../infrastructure/catalog/repositories/api-book-repository'
import { InMemoryProfileRepository } from '@/infrastructure/profile/repositories/InMemoryProfile'

export function Dependencies () {
  return {
    authRepository: new InMemoryAuthRepository(),
    bookRepository: new ApiBookRepository(),
    profileRepository: new InMemoryProfileRepository()
  }
}
