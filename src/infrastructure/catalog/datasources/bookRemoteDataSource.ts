import { BookStatus } from '@/domain/catalog/entities/bookStatus'
import { BookDto } from '../dtos/bookDto'

export interface BookRemoteDataSource {
  getForSaleBooks(): Promise<BookDto[]>
  getForSaleBookById(id: string): Promise<BookDto>
}

export class InMemoryBookRemoteDataSource implements BookRemoteDataSource {
  async getForSaleBooks (): Promise<BookDto[]> {
    const booksJSON = localStorage.getItem('fake_books')
    if (!booksJSON) {
      return Promise.resolve([])
    }
    const booksData = JSON.parse(booksJSON) as BookDto['data'][]
    const books = booksData
      .filter(b => b.status === BookStatus.FOR_SALE)
      .map(bookData => BookDto.fromData(bookData))
    await this._wait(2000)
    return Promise.resolve(books)
  }

  async getForSaleBookById (id: string): Promise<BookDto> {
    const booksJSON = localStorage.getItem('fake_books')
    if (!booksJSON) {
      throw new Error('No books in cache')
    }
    const booksData = JSON.parse(booksJSON) as BookDto['data'][]
    const bookData = booksData.find(
      b => b.id === id && b.status === BookStatus.FOR_SALE
    )
    if (!bookData) {
      throw new Error('Book not found')
    }
    await this._wait(2000)
    return Promise.resolve(BookDto.fromData(bookData))
  }

  _wait (ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  _setBooks (booksDto: BookDto[]) {
    const booksData = booksDto.map(book => book.data)
    const booksJSON = JSON.stringify(booksData)
    localStorage.setItem('fake_books', booksJSON)
  }
}
