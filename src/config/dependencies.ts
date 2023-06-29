import { InMemoryAuthRepository } from '@/infrastructure/auth/repositories/inMemoryAuthRepository'
import { ApiBookRepository } from '../infrastructure/catalog/repositories/api-book-repository'

export function Dependencies () {
  return {
    authRepository: new InMemoryAuthRepository(),
    bookRepository: new ApiBookRepository()
  }
}
