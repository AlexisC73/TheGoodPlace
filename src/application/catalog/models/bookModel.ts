import { Book } from '../../../domain/catalog/entities/book'

export class BookModel {
  constructor(
    private readonly _id: string,
    private readonly _title: string,
    private readonly _author: string,
    private readonly _description: string,
    private readonly _cover: string,
    private readonly _price: number,
    private readonly _publicationYear: string,
    private readonly _rate: number
  ) {}

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

  get data() {
    return {
      id: this._id,
      title: this._title,
      author: this._author,
      description: this._description,
      cover: this._cover,
      price: this._price,
      publicationYear: this._publicationYear,
      rate: this._rate,
    }
  }

  get id() {
    return this._id
  }

  get title() {
    return this._title
  }

  get author() {
    return this._author
  }

  get description() {
    return this._description
  }

  get cover() {
    return this._cover
  }

  get price() {
    return this._price
  }

  get publicationYear() {
    return this._publicationYear
  }

  get rate() {
    return this._rate
  }
}
