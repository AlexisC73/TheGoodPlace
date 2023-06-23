import { Book, BookStatus } from '../../domain/entities/book'

export class BookDto {
  private constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly author: string,
    public readonly price: number,
    public readonly imageUrl: string,
    public readonly publicationDate: string,
    public readonly description: string,
    public readonly createdAt: string,
    public readonly status: string,
    public readonly seller: string
  ) {}

  isForSale() {
    return this.status === BookStatus.FOR_SALE.toString()
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
}
