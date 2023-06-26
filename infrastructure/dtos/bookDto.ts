import { Book, BookStatus } from '../../domain/entities/book'

export class BookDto {
  private constructor(
    public readonly _id: string,
    public readonly _title: string,
    public readonly _author: string,
    public readonly _price: number,
    public readonly _imageUrl: string,
    public readonly _publicationDate: string,
    public readonly _description: string,
    public readonly _createdAt: string,
    public readonly _status: string,
    public readonly _seller: string
  ) {}

  isForSale() {
    return this._status === BookStatus.FOR_SALE.toString()
  }

  get data() {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      price: this.price,
      imageUrl: this.imageUrl,
      publicationDate: this.publicationDate,
      description: this.description,
      createdAt: this.createdAt,
      status: this.status,
      seller: this.seller,
    }
  }

  static fromData(data: BookDto['data']) {
    return new BookDto(
      data.id,
      data.title,
      data.author,
      data.price,
      data.imageUrl,
      data.publicationDate,
      data.description,
      data.createdAt,
      data.status,
      data.seller
    )
  }

  toDomain(): Book {
    return new Book(
      this.id,
      this.title,
      this.author,
      this.description,
      this.price,
      new Date(this.publicationDate),
      this.imageUrl,
      new Date(this.createdAt),
      this.seller,
      BookStatus[this.status as keyof typeof BookStatus]
    )
  }

  static fromDomain(book: Book): BookDto {
    return new BookDto(
      book.id,
      book.title,
      book.author,
      book.price,
      book.cover,
      book.publicationDate.toISOString(),
      book.description,
      book.createdAt.toISOString(),
      book.status,
      book.seller
    )
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

  get price() {
    return this._price
  }

  get imageUrl() {
    return this._imageUrl
  }

  get publicationDate() {
    return this._publicationDate
  }

  get description() {
    return this._description
  }

  get createdAt() {
    return this._createdAt
  }

  get status() {
    return this._status
  }

  get seller() {
    return this._seller
  }
}
