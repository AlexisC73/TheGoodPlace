import { Book, BookStatus } from '../../domain/entities/book'
import { BookRepository } from '../../domain/repositories/book'
import { fakeBooks } from '../datasources/fakeBook'
import { BookDto } from '../dtos/bookDto'

export class InMemoryBookRepository implements BookRepository {
  books: BookDto[] = fakeBooks

  getForSaleBooks(): Promise<Book[]> {
    const forSaleBooks = this.books.filter(
      (book) => book.status === BookStatus.FOR_SALE
    )

    return Promise.resolve(forSaleBooks.map((book) => book.toDomain()))
  }

  getBookById(id: string): Promise<Book | null> {
    const book = this.books.find((book) => book.id === id)
    if (!book) return Promise.resolve(null)
    return Promise.resolve(book?.toDomain())
  }
}
