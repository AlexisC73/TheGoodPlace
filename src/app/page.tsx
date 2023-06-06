import { BookCard, BookCardInfo } from '@/pages/home/BookCard'
import { fakeBookInfo } from '@/fake/book'

export default function Home() {
  const products: BookCardInfo[] = fakeBookInfo

  return (
    <main className='xl:w-full xl:flex xl:justify-center mt-4 sm:mt-10'>
      <ul
        id='product-list'
        className='grid gap-4 sm:gap-y-8 md:grid-cols-3 sm:grid-cols-2 xl:max-w-[1200px] xl:grid-cols-4'
      >
        {products.map((product) => (
          <li key={product.id} className='sm:justify-self-center h-full'>
            <BookCard bookInfo={product} />
          </li>
        ))}
      </ul>
    </main>
  )
}
