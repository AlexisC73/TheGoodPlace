import { inject } from 'inversify'
import { Book } from '../entities/book'
import type { BookRepository } from '../repositories/book'
import { TYPES } from '@/application/catalog/container/types'

export class GetForSaleBooksUseCase {
  constructor (
    @inject(TYPES.BookRepository)
    private readonly bookRepository: BookRepository
  ) {}

  async handle (): Promise<Book[]> {
    return this.bookRepository.getForSaleBooks()
  }
}
