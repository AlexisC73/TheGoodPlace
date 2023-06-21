import { Book } from '../entities/book'

export interface BookRepository {
  getForSaleBooks(): Promise<Book[]>
  getBookById(id: string): Promise<Book | null>
}
