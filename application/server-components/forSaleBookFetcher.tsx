import { GetSpecificForSaleBook } from '../../domain/usecases/get-for-sale-book'
import { InMemoryBookRepository } from '../../infrastructure/repositories/in-memory-book'
import { BookModel } from '../models/bookModel'
import { BookPresentationModel } from '../models/bookPresentationModel'

export const forSaleBookFetcher = async ({
  bookId,
}: {
  bookId: string
}): Promise<BookPresentationModel> => {
  const BookRepository = new InMemoryBookRepository()
  const getSpecificForSaleBook = new GetSpecificForSaleBook(BookRepository)
  const domainBook = await getSpecificForSaleBook.handle({ bookId })
  return BookPresentationModel.fromDomain(domainBook)
}
