import { BookStatus } from '@/domain/catalog/entities/bookStatus'
import { bookBuilder } from '../bookBuilder'
import { BookFixture, createBookFixture } from '../bookFixture'

describe('Feature: Should return all for sale books', () => {
  let bookFixture: BookFixture

  beforeEach(() => {
    bookFixture = createBookFixture()
  })

  test('when a user ask to look for sale books and they are not in cache, they should get fetch in remote', async () => {
    const forSaleBookBuilder = bookBuilder().withStatus(BookStatus.FOR_SALE)
    const forSaleBooks = [
      forSaleBookBuilder.withId('1').build(),
      forSaleBookBuilder.withId('4').build(),
      forSaleBookBuilder.withId('7').build()
    ]
    const pendingAndSoldBooks = [
      bookBuilder()
        .withId('3')
        .withStatus(BookStatus.PENDING_VALIDATION)
        .build(),
      bookBuilder().withId('5').withStatus(BookStatus.SOLD).build(),
      bookBuilder()
        .withId('8')
        .withStatus(BookStatus.PENDING_VALIDATION)
        .build()
    ]
    const allBooks = [...forSaleBooks, ...pendingAndSoldBooks]

    bookFixture.whenBooksExistInRemote(allBooks)

    await bookFixture.whenUserAskForSaleBooks()

    bookFixture.thenReturnedBooksSouldHaveLength(forSaleBooks.length)
    bookFixture.thenReturnedBooksShouldBe([
      forSaleBookBuilder.withId('1').build(),
      forSaleBookBuilder.withId('4').build(),
      forSaleBookBuilder.withId('7').build()
    ])
  })

  test('when a user ask to look for sale books and they are in cache, they should get returned', async () => {
    const forSaleBookBuilder = bookBuilder().withStatus(BookStatus.FOR_SALE)
    const forSaleBooks = [
      forSaleBookBuilder.withId('1').build(),
      forSaleBookBuilder.withId('4').build(),
      forSaleBookBuilder.withId('7').build()
    ]
    const pendingAndSoldBooks = [
      bookBuilder()
        .withId('3')
        .withStatus(BookStatus.PENDING_VALIDATION)
        .build(),
      bookBuilder().withId('5').withStatus(BookStatus.SOLD).build(),
      bookBuilder()
        .withId('8')
        .withStatus(BookStatus.PENDING_VALIDATION)
        .build()
    ]
    const allBooks = [...forSaleBooks, ...pendingAndSoldBooks]

    bookFixture.whenBooksExistInCacheAndRemote(allBooks)

    await bookFixture.whenUserAskForSaleBooks()

    bookFixture.thenReturnedBooksSouldHaveLength(forSaleBooks.length)
    bookFixture.thenReturnedBooksShouldBe([
      forSaleBookBuilder.withId('1').build(),
      forSaleBookBuilder.withId('4').build(),
      forSaleBookBuilder.withId('7').build()
    ])
  })
})
