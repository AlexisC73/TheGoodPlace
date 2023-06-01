import ProductBookPresentation, {
  ProductBookInfo,
} from '@/components/ProductBookPresentation'
import { fakeBookInfo } from '@/fake/book'

export const metadata = {
  title: 'The Lean Startup',
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const bookInfo: ProductBookInfo[] = fakeBookInfo.map((bookInfo) => ({
    author: bookInfo.author,
    description: bookInfo.description,
    id: bookInfo.id.toString(),
    imageUrl: bookInfo.imageUrl,
    price: bookInfo.price,
    publicationDate: bookInfo.publishedDate,
    rate: bookInfo.rate,
    title: bookInfo.title,
  }))
  return (
    <main className='sm:mt-5 xl:mt-10 max-w-[1200px] mx-auto'>
      <ProductBookPresentation
        productBookInfo={bookInfo.find((book) => book.id === params.id)!}
      />
    </main>
  )
}
