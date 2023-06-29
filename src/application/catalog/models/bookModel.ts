import { Book } from '@/domain/catalog/entities/book'

export class BookModel {
  constructor (
    public readonly id: string,
    public readonly title: string,
    public readonly author: string,
    public readonly description: string,
    public readonly cover: string,
    public readonly price: number,
    public readonly publicationYear: string,
    public readonly rate: number
  ) {}

  static fromDomain (book: Book) {
    return new BookModel(
      book.id,
      book.title,
      book.author,
      book.description,
      book.cover,
      book.price,
      book.publicationDate.getFullYear().toString(),
      3.8
    )
  }

  get data () {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      description: this.description,
      cover: this.cover,
      price: this.price,
      publicationYear: this.publicationYear,
      rate: this.rate
    }
  }
}
