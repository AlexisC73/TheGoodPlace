import { BooksFetcherProvider } from '../../application/contexts/getForSaleBooks'
import ForSaleBooksPage from '../../presentation/pages/ForSaleBooksPage'

export default function Home() {
  return (
    <BooksFetcherProvider>
      <ForSaleBooksPage />
    </BooksFetcherProvider>
  )
}
