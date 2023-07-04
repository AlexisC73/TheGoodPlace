import { BookStatus } from '@/domain/catalog/entities/bookStatus'
import { BookDto } from '../dtos/bookDto'

export interface BookLocalDataSource {
  getForSaleBooks(): BookDto[]
  saveBooksInCache(books: BookDto[]): void
  getForSaleBookById(id: string): BookDto
  saveBookInCache(book: BookDto): void
}

export class CacheBookDataSource implements BookLocalDataSource {
  getForSaleBooks (): BookDto[] {
    const booksString = localStorage.getItem('books')
    if (!booksString) {
      throw new Error('No books in cache')
    }
    const booksData = JSON.parse(booksString) as BookDto['data'][]
    const books = booksData
      .filter(b => b.status === BookStatus.FOR_SALE)
      .map(bookData => BookDto.fromData(bookData))
    return books
  }

  saveBooksInCache (books: BookDto[]): void {
    const booksData = books.map(book => book.data)
    const booksString = JSON.stringify(booksData)
    localStorage.setItem('books', booksString)
  }

  getForSaleBookById (id: string): BookDto {
    const booksString = localStorage.getItem('books')
    if (!booksString) {
      throw new Error('No books in cache')
    }
    const booksData = JSON.parse(booksString) as BookDto['data'][]
    const bookData = booksData.find(
      b => b.id === id && b.status === BookStatus.FOR_SALE
    )
    if (!bookData) {
      throw new Error('Book not found')
    }
    return BookDto.fromData(bookData)
  }

  saveBookInCache (book: BookDto): void {
    const bookData = book.data
    localStorage.setItem('books', JSON.stringify([bookData]))
  }

  _setBooks (booksDto: BookDto[]) {
    const booksData = booksDto.map(book => book.data)
    const booksJSON = JSON.stringify(booksData)
    localStorage.setItem('fake_books', booksJSON)
  }
}
