import { InMemoryBookRepositoryImpl } from '../infrastructure/catalog/repositories/in-memory-book-repository-impl'
import { InMemoryUserRepository } from '../infrastructure/@shared/repositories/in-memory-user'
import { ApiBookRepository } from '../infrastructure/catalog/repositories/api-book-repository'

export function Dependencies () {
  return {
    userRepository: new InMemoryUserRepository(),
    bookRepository: new ApiBookRepository()
  }
}
