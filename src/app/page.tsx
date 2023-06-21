import { BookCard } from '@/app/components/BookCard'
import { forSaleBooksFetcher } from '../../application/server-components/forSaleBooksFetcher'

export default async function Home() {
  const forSaleBooks = await forSaleBooksFetcher()

  return (
    <main className='xl:w-full xl:flex xl:justify-center mt-4 sm:mt-10'>
      <ul
        id='product-list'
        className='grid gap-4 sm:gap-y-8 md:grid-cols-3 sm:grid-cols-2 xl:max-w-[1200px] xl:grid-cols-4'
      >
        {forSaleBooks.map((book) => (
          <li key={book.id} className='sm:justify-self-center h-full'>
            <BookCard bookInfo={book} />
          </li>
        ))}
      </ul>
    </main>
  )
}
