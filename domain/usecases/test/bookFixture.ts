import { BookDto } from '../../../infrastructure/dtos/bookDto'
import { InMemoryBookRepositoryImpl } from '../../../infrastructure/repositories/in-memory-book-repository-impl'
import { Book } from '../../entities/book'
import {
  GetForSaleBookCommand,
  GetSpecificForSaleBook,
} from '../get-for-sale-book'
import { GetForSaleBooksUseCase } from '../get-for-sale-books'

export const createBookFixture = () => {
  let book: Book
  let books: Book[]
  const bookRepository = new InMemoryBookRepositoryImpl()
  const getSpecificForSaleBook = new GetSpecificForSaleBook(bookRepository)
  const getForSaleBooksUseCase = new GetForSaleBooksUseCase(bookRepository)

  return {
    whenBooksExist(books: Book[]) {
      bookRepository._books = books.map((book) => BookDto.fromDomain(book))
    },
    async whenUserAskForASpecificSaleBook(command: GetForSaleBookCommand) {
      book = await getSpecificForSaleBook.handle(command)
    },
    async whenUserAskForSaleBooks() {
      books = await getForSaleBooksUseCase.handle()
    },
    thenReturnedBooksShouldBe(expectedBooks: Book[]) {
      expect(books).toEqual(expect.arrayContaining(expectedBooks))
    },
    thenReturnedBooksSouldHaveLength(expectedLength: number) {
      expect(books).toHaveLength(expectedLength)
    },
    thenReturnedBookShouldBe(expectedBook: Book) {
      expect(book).toEqual(expectedBook)
    },
  }
}

export type BookFixture = ReturnType<typeof createBookFixture>
