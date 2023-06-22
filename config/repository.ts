import { InMemoryBookRepository } from '../infrastructure/repositories/in-memory-book'
import { InMemoryUserRepository } from '../infrastructure/repositories/in-memory-user'

const userRepository = new InMemoryUserRepository()
const bookRepository = new InMemoryBookRepository()

export const config = {
  userRepository,
  bookRepository,
}
