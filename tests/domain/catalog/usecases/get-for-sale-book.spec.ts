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
    const forSaleBooks = [forSaleBookBuilder.withId('1').build()]
    const pendingAndSoldBooks = [
      forSaleBookBuilder
        .withId('2')
        .withStatus(BookStatus.PENDING_VALIDATION)
        .build(),
      forSaleBookBuilder.withId('5').withStatus(BookStatus.SOLD).build()
    ]
    const allBooks = [...forSaleBooks, ...pendingAndSoldBooks]

    bookFixture.whenBooksExistInRemote(allBooks)

    await bookFixture.whenUserAskForASpecificSaleBook({ bookId: '1' })

    bookFixture.thenReturnedBookShouldBe(forSaleBookBuilder.withId('1').build())
  })

  test('when a user ask to look for sale books and they are in cache, they should get returned', async () => {
    const forSaleBookBuilder = bookBuilder().withStatus(BookStatus.FOR_SALE)
    const forSaleBooks = [forSaleBookBuilder.withId('1').build()]
    const pendingAndSoldBooks = [
      forSaleBookBuilder
        .withId('2')
        .withStatus(BookStatus.PENDING_VALIDATION)
        .build(),
      forSaleBookBuilder.withId('5').withStatus(BookStatus.SOLD).build()
    ]
    const allBooks = [...forSaleBooks, ...pendingAndSoldBooks]

    bookFixture.whenBooksExistInCacheAndRemote(allBooks)

    await bookFixture.whenUserAskForASpecificSaleBook({ bookId: '1' })

    bookFixture.thenReturnedBookShouldBe(forSaleBookBuilder.withId('1').build())
  })
})
