import { inject, injectable } from 'inversify'
import { Book } from '../entities/book'
import { BookRepository } from '../repositories/book'

@injectable()
export class GetForSaleBooksUseCase {
  constructor (
    @inject(BookRepository)
    private readonly bookRepository: BookRepository
  ) {}

  async handle (): Promise<Book[]> {
    return this.bookRepository.getForSaleBooks()
  }
}
