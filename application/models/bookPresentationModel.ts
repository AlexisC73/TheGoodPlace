import { Book } from '../../domain/entities/book'

export class BookPresentationModel {
  constructor(
    public author: string,
    public description: string,
    public id: string,
    public cover: string,
    public price: number,
    public publicationYear: string,
    public rate: number,
    public title: string
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
    return new BookPresentationModel(
      book.author,
      book.description,
      book.id,
      book.cover,
      book.price,
      new Date(book.publicationDate).getFullYear().toString(),
      3.8,
      book.title
    )
  }
}
