import { inject, injectable } from 'inversify'
import { TYPES } from '../container/types'
import type { BookRepository } from '@/domain/catalog/repositories/book'
import { GetForSaleBooksUseCase } from '@/domain/catalog/usecases/get-for-sale-books'
import { GetSpecificForSaleBook } from '@/domain/catalog/usecases/get-for-sale-book'

@injectable()
export class CatalogService {
  constructor (
    @inject(TYPES.BookRepository)
    private readonly bookRepository: BookRepository
  ) {}

  public FetchForSaleBooksUseCase (): GetForSaleBooksUseCase {
    return new GetForSaleBooksUseCase(this.bookRepository)
  }

  public FetchForSaleBookUseCase (): GetSpecificForSaleBook {
    return new GetSpecificForSaleBook(this.bookRepository)
  }
}
