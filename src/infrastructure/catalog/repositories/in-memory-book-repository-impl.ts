import { Book } from '../../../domain/catalog/entities/book'
import { BookRepository } from '../../../domain/catalog/repositories/book'
import { BookDto } from '../dtos/bookDto'

export class InMemoryBookRepositoryImpl implements BookRepository {
  _books: BookDto[] = []

  async getForSaleBooks(): Promise<Book[]> {
    const bookDtos = await this._getForSaleBooks()
    return bookDtos.map((bookDto) => bookDto.toDomain())
  }

  async getForSaleBookById(id: string): Promise<Book | null> {
    const book = await this._getForSaleBookById(id)
    return book?.toDomain() ?? null
  }

  _getForSaleBooks(): Promise<BookDto[]> {
    const forSaleBooks = this._books.filter((book) => book.isForSale())
    return Promise.resolve(forSaleBooks)
  }

  _getForSaleBookById(id: string): Promise<BookDto | null> {
    const book = this._books.find((book) => book.id === id && book.isForSale())
    return Promise.resolve(book ?? null)
  }
}
