'use client'
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs'
import { ProductBookPresentation } from '@/app/product/[id]/components/ProductBookPresentation'
import { useContext, useEffect, useState } from 'react'
import BookFetcherContext, {
  FetchStatus,
} from '../../application/contexts/getForSaleBook'
import Link from 'next/link'

export default function ProductPage({ bookId }: { bookId: string }) {
  const bookFetcher = useContext(BookFetcherContext)
  const [breadcrumbs, setBreadcrumbs] = useState([
    {
      name: 'Livres',
      href: '/',
    },
  ])

  useEffect(() => {
    if (bookFetcher.state === FetchStatus.INITIAL) {
      bookFetcher.getBook(bookId)
    }
  }, [bookFetcher.state])

  useEffect(() => {
    if (
      bookFetcher.state === FetchStatus.SUCCESS &&
      bookFetcher.book !== null
    ) {
      setBreadcrumbs([
        {
          name: 'Livres',
          href: '/',
        },
        {
          name: bookFetcher.book.title,
          href: `/product/${bookFetcher.book.id}`,
        },
      ])
    }
  }, [bookFetcher.state])

  const bookBreadcrumbs =
    bookFetcher.state === FetchStatus.SUCCESS
      ? bookFetcher.book !== null
        ? {
            name: bookFetcher.book.title,
            href: `/product/${bookFetcher.book.id}`,
          }
        : null
      : null

  return (
    <main className='sm:mt-5 xl:mt-10 max-w-[1200px] mx-auto'>
      <div className='flex flex-col gap-10'>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {bookFetcher.state === FetchStatus.LOADING ||
        bookFetcher.state === FetchStatus.INITIAL ? (
          <div>Loading</div>
        ) : bookFetcher.book ? (
          <ProductBookPresentation productBookInfo={bookFetcher.book.data} />
        ) : (
          <div>
            Désoler nous n'avons pas trouvé ce livre.{' '}
            <Link href='/' className='underline text-primary'>
              Revenir en arrière
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
