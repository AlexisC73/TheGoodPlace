import { injectable } from 'inversify'
import { Book } from '../../../domain/catalog/entities/book'
import { BookRepository } from '../../../domain/catalog/repositories/book'
import { InMemoryBookRemoteDataSource } from '../datasources/bookRemoteDataSource'
import { CacheBookDataSource } from '../datasources/bookLocalDataSource'

@injectable()
export class BookRepositoryImpl implements BookRepository {
  bookRemoteDataSource = new InMemoryBookRemoteDataSource()
  bookLocalDataSource = new CacheBookDataSource()

  async getForSaleBooks (): Promise<Book[]> {
    try {
      const bookDtos = this.bookLocalDataSource.getForSaleBooks()
      const books = bookDtos.map(bookDto => bookDto.toDomain())
      return books
    } catch (err) {
      const booksDtos = await this.bookRemoteDataSource.getForSaleBooks()
      this.bookLocalDataSource.saveBooksInCache(booksDtos)
      const books = booksDtos.map(bookDto => bookDto.toDomain())
      return books
    }
  }

  async getForSaleBookById (id: string): Promise<Book | null> {
    try {
      const bookDto = this.bookLocalDataSource.getForSaleBookById(id)
      return bookDto.toDomain()
    } catch (err) {
      const bookDto = await this.bookRemoteDataSource.getForSaleBookById(id)
      this.bookLocalDataSource.saveBookInCache(bookDto)
      return bookDto.toDomain()
    }
  }
}
