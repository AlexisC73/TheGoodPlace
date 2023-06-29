import { env } from '../../../config/environment'
import { Book } from '../../../domain/catalog/entities/book'
import { BookRepository } from '../../../domain/catalog/repositories/book'
import { BookDto } from '../dtos/bookDto'

export class ApiBookRepository implements BookRepository {
  async getForSaleBooks (): Promise<Book[]> {
    const request = await fetch(`${env.apiUrl}/book`, {
      method: 'GET'
    })
    if (request.ok) {
      const bookDto: BookDto['data'][] = await request.json()
      return bookDto.map(book => BookDto.fromData(book).toDomain())
    }
    return []
  }

  async getForSaleBookById (id: string): Promise<Book | null> {
    const request = await fetch(`${env.apiUrl}/book/${id}`, {
      method: 'GET'
    })
    if (request.ok) {
      const bookDto: BookDto['data'] = await request.json()
      return BookDto.fromData(bookDto).toDomain()
    }
    return null
  }
}
