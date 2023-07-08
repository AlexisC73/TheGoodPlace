import { createTestAppContainer } from '@tests/application/@shared/container/container'
import { BookDto } from '@/infrastructure/catalog/dtos/bookDto'
import { Book } from '@/domain/catalog/entities/book'
import {
  GetForSaleBookCommand,
  GetForSaleBookUseCase
} from '@/domain/catalog/usecases/get-for-sale-book'
import { BookRepositoryImpl } from '@/infrastructure/catalog/repositories/BookRepositoryImpl'
import { GetForSaleBooksUseCase } from '@/domain/catalog/usecases/get-for-sale-books'
import { BookRepository } from '@/domain/catalog/repositories/book'

export const createBookFixture = () => {
  let book: Book
  let books: Book[]

  const appContainer = createTestAppContainer()

  const bookRepository = appContainer.get(BookRepository) as BookRepositoryImpl

  const bookRemoteDataSource = bookRepository.bookRemoteDataSource
  const bookLocalDataSource = bookRepository.bookLocalDataSource
  const getForSaleBooksUseCase = appContainer.get(GetForSaleBooksUseCase)
  const getForSaleBookUseCase = appContainer.get(GetForSaleBookUseCase)

  return {
    whenBooksExistInRemote (books: Book[]) {
      bookRemoteDataSource._setBooks(
        books.map(book => BookDto.fromDomain(book))
      )
    },
    whenBooksExistInCacheAndRemote (books: Book[]) {
      bookLocalDataSource._setBooks(books.map(book => BookDto.fromDomain(book)))
      bookRemoteDataSource._setBooks(
        books.map(book => BookDto.fromDomain(book))
      )
    },
    async whenUserAskForASpecificSaleBook (command: GetForSaleBookCommand) {
      book = await getForSaleBookUseCase.handle(command)
    },
    async whenUserAskForSaleBooks () {
      books = await getForSaleBooksUseCase.handle()
    },
    thenReturnedBooksShouldBe (expectedBooks: Book[]) {
      expect(books).toEqual(expect.arrayContaining(expectedBooks))
    },
    thenReturnedBooksSouldHaveLength (expectedLength: number) {
      expect(books).toHaveLength(expectedLength)
    },
    thenReturnedBookShouldBe (expectedBook: Book) {
      expect(book).toEqual(expectedBook)
    }
  }
}

export type BookFixture = ReturnType<typeof createBookFixture>
