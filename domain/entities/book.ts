import { isDate } from 'util/types'

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
      isDate(this.publicationDate) &&
      this.id !== '' &&
      this.seller !== '' &&
      this.status !== null &&
      this.cover !== ''
    )
  }
}

export enum BookStatus {
  PENDING_VALIDATION = 'PENDING_VALIDATION',
  FOR_SALE = 'FOR_SALE',
  SOLD = 'SOLD',
}
