'use client'

import BooksFetcherContext, {
  FetchStatus,
} from '../../application/contexts/getForSaleBooks'
import { useContext, useEffect } from 'react'
import ProductList from '../@shared/ProductList/ProductList'

const ForSaleBooksPage: React.FC = () => {
  const bookFetcher = useContext(BooksFetcherContext)

  useEffect(() => {
    if (bookFetcher.state === FetchStatus.INITIAL) {
      bookFetcher.getBooks()
    }
  }, [bookFetcher.state])

  return (
    <main className='xl:w-full xl:flex xl:justify-center mt-4 sm:mt-10'>
      {bookFetcher.state === FetchStatus.LOADING ||
      bookFetcher.state === FetchStatus.INITIAL ? (
        <div>Loading</div>
      ) : (
        bookFetcher.books && <ProductList books={bookFetcher.books} />
      )}
    </main>
  )
}

export default ForSaleBooksPage
