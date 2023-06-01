import { fakeBookInfo } from '@/fake/book'
import BookCard, { BookCardInfo } from '../BookCard'

const ProductsList = () => {
  const products: BookCardInfo[] = fakeBookInfo
  return (
    <ul className='grid xl:grid-cols-3 gap-4 sm:gap-y-8 md:grid-cols-3 sm:grid-cols-2 2xl:max-w-[1200px] 2xl:grid-cols-4 xl:max-w-[900px]'>
      {products.map((product) => (
        <li className='sm:justify-self-center h-full'>
          <BookCard key={product.id} bookInfo={product} />
        </li>
      ))}
    </ul>
  )
}

export default ProductsList
