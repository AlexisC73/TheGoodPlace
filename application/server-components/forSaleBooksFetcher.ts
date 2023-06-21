import { GetForSaleBooksUseCase } from '../../domain/usecases/get-for-sale-books'
import { InMemoryBookRepository } from '../../infrastructure/repositories/in-memory-book'
import { BookModel } from '../models/bookModel'

export const forSaleBooksFetcher = async (): Promise<BookModel[]> => {
  const BookRepository = new InMemoryBookRepository()
  const getForSaleBooksUseCase = new GetForSaleBooksUseCase(BookRepository)
  const domainBook = await getForSaleBooksUseCase.handle()
  return domainBook.map((book) => BookModel.fromDomain(book))
}
