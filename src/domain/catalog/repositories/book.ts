import { Book } from '../entities/book'

export abstract class BookRepository {
  abstract getForSaleBooks(): Promise<Book[]>
  abstract getForSaleBookById(id: string): Promise<Book | null>
}
