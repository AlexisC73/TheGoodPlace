import { Book, BookStatus } from '../../domain/entities/book'
import { bookBuilder } from '../../domain/usecases/test/bookBuilder'
import { BookDto } from '../dtos/bookDto'

const forSaleBooks = bookBuilder().withStatus(BookStatus.FOR_SALE)
const pending = bookBuilder().withStatus(BookStatus.PENDING_VALIDATION)
const sold = bookBuilder().withStatus(BookStatus.SOLD)

const allBooks: Book[] = [
  forSaleBooks.withId('1').build(),
  pending.withId('2').build(),
  forSaleBooks.withId('3').build(),
  sold.withId('4').build(),
  pending.withId('5').build(),
  forSaleBooks.withId('6').build(),
]

export const fakeBooks = allBooks.map((book) => BookDto.fromDomain(book))
