import { Book } from '../entities/book'
import { BookRepository } from '../repositories/book'

export class GetForSaleBooksUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async handle(): Promise<Book[]> {
    return this.bookRepository.getForSaleBooks()
  }
}
