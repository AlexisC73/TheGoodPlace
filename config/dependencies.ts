import { InMemoryBookRepositoryImpl } from "../infrastructure/catalog/repositories/in-memory-book-repository-impl"
import { InMemoryUserRepository } from "../infrastructure/@shared/repositories/in-memory-user"

export function Dependencies() {
  return {
    userRepository: new InMemoryUserRepository(),
    bookRepository: new InMemoryBookRepositoryImpl()
  }
}
