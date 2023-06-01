import { fakeBookInfo } from '@/fake/book'
import BookCard, { BookCardInfo } from '../BookCard'

const ProductsList = () => {
  const products: BookCardInfo[] = fakeBookInfo
  return (
    <ul className='grid gap-4 sm:gap-y-8 md:grid-cols-3 sm:grid-cols-2 xl:max-w-[1200px] xl:grid-cols-4'>
      {products.map((product) => (
        <li key={product.id} className='sm:justify-self-center h-full'>
          <BookCard key={product.id} bookInfo={product} />
        </li>
      ))}
    </ul>
  )
}

export default ProductsList
