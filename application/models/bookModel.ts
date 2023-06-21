import { Book } from '../../domain/entities/book'

export class BookModel {
  constructor(
    public id: string,
    public title: string,
    public author: string,
    public publishedYear: string,
    public price: string,
    public rate: number,
    public cover: string
  ) {}

  get data() {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      publishedYear: this.publishedYear,
      price: this.price,
      rate: this.rate,
      cover: this.cover,
    }
  }

  static fromDomain(book: Book) {
    return new BookModel(
      book.id,
      book.title,
      book.author,
      new Date(book.publicationDate).getFullYear().toString(),
      book.price.toFixed(2),
      3.4,
      book.cover
    )
  }
}
