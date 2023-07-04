import { inject, injectable } from 'inversify'
import { Book } from '../entities/book'
import type { BookRepository } from '../repositories/book'
import { TYPES } from '@/application/@shared/container/types'

export class GetSpecificForSaleBook {
  constructor (
    @inject(TYPES.BookRepository)
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
