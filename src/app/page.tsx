import { BooksFetcherProvider } from '@/application/catalog/contexts/getForSaleBooks'
import ForSaleBooksPage from '@/presentation/pages/ForSaleBooksPage/ForSaleBooksPage'

export default function Home () {
  return (
    <BooksFetcherProvider>
      <ForSaleBooksPage />
    </BooksFetcherProvider>
  )
}
