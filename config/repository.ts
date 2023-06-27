import { InMemoryBookRepositoryImpl } from "../infrastructure/catalog/repositories/in-memory-book-repository-impl"
import { InMemoryUserRepository } from "../infrastructure/@shared/repositories/in-memory-user"

const userRepository = new InMemoryUserRepository()
const bookRepository = new InMemoryBookRepositoryImpl()

export const config = {
  userRepository,
  bookRepository,
}
