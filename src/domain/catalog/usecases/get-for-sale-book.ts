import { inject, injectable } from 'inversify'
import { Book } from '../entities/book'
import { BookRepository } from '../repositories/book'

@injectable()
export class GetForSaleBookUseCase {
  constructor (
    @inject(BookRepository)
    private readonly bookRepository: BookRepository
  ) {}

  async handle (command: GetForSaleBookCommand): Promise<Book> {
    const foundBook = await this.bookRepository.getForSaleBookById(
      command.bookId
    )
    if (!foundBook) throw new Error('Book not found')
    return foundBook
  }
}

export type GetForSaleBookCommand = {
  bookId: string
}
