import { Book } from '../../domain/entities/book'

export class BookModel {
  constructor(
    public id: string,
    public title: string,
    public author: string,
    public description: string,
    public cover: string,
    public price: number,
    public publicationYear: string,
    public rate: number
  ) {}

  get data() {
    return {
      author: this.author,
      description: this.description,
      id: this.id,
      cover: this.cover,
      price: this.price,
      publicationYear: this.publicationYear,
      rate: this.rate,
      title: this.title,
    }
  }

  static fromDomain(book: Book) {
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
}
