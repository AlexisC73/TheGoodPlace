import { Book } from '../entities/book'
import { BookRepository } from '../repositories/book'

export class GetSpecificForSaleBook {
  constructor(private readonly bookRepository: BookRepository) {}

  async handle(command: GetForSaleBookCommand): Promise<Book> {
    const foundBook = await this.bookRepository.getBookById(command.bookId)
    if (!foundBook) throw new Error('Book not found')
    if (foundBook.status !== 'FOR_SALE') throw new Error('Book is not for sale')
    return foundBook
  }
}

export type GetForSaleBookCommand = {
  bookId: string
}
