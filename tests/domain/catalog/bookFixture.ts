import { BookDto } from '@/infrastructure/catalog/dtos/bookDto'
import { Book } from '@/domain/catalog/entities/book'
import { GetForSaleBookCommand } from '@/domain/catalog/usecases/get-for-sale-book'
import { CatalogService } from '@/application/catalog/services/catalogService'
import { InMemoryBookRepository } from '@/infrastructure/catalog/repositories/in-memory-book-repository'
import { TYPES } from '@/application/@shared/container/types'
import { createTestAppContainer } from '@tests/application/@shared/container/container'

export const createBookFixture = () => {
  let book: Book
  let books: Book[]

  const catalogContainer = createTestAppContainer()
  const catalogService = catalogContainer.get(
    TYPES.CatalogService
  ) as CatalogService

  const bookRepository = catalogContainer.get(
    TYPES.BookRepository
  ) as InMemoryBookRepository
  const getForSaleBooksUseCase = catalogService.FetchForSaleBooksUseCase()
  const getSpecificForSaleBookUseCase = catalogService.FetchForSaleBookUseCase()

  return {
    whenBooksExist (books: Book[]) {
      bookRepository._books = books.map(book => BookDto.fromDomain(book))
    },
    async whenUserAskForASpecificSaleBook (command: GetForSaleBookCommand) {
      book = await getSpecificForSaleBookUseCase.handle(command)
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
