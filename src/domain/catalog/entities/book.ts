import { BookStatus } from "./bookStatus";

export class Book {
  constructor(
    public id: string,
    public title: string,
    public author: string,
    public description: string,
    public price: number,
    public publicationDate: Date,
    public cover: string,
    public createdAt: Date,
    public seller: string,
    public status: BookStatus
  ) {}

  isValid(): boolean {
    return (
      this.title !== '' &&
      this.author !== '' &&
      this.description !== '' &&
      this.createdAt !== null &&
      this.price > 0 &&
      this.publicationDate !== null &&
      this.id !== '' &&
      this.seller !== '' &&
      this.status !== null &&
      this.cover !== ''
    )
  }
}

