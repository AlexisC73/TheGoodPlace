import { BookCard, BookCardInfo } from '@/app/components/BookCard'
import { getPublishedBooks } from '@/utils/api-request'
import { Book } from '../../types/interfaces'

export default async function Home() {
  const books = (await getPublishedBooks()) as Book[]
  const products: BookCardInfo[] = books.map((book) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    imageUrl: book.imageUrl,
    price: book.price,
    publishedDate: new Date(book.publicationDate),
    rate: 3.8,
  }))

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
