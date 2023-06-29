import { Book } from '../entities/book'

export interface BookRepository {
  getForSaleBooks(): Promise<Book[]>
  getForSaleBookById(id: string): Promise<Book | null>
}
