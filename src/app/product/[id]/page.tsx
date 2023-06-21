import { BookFetcherProvider } from '../../../../application/contexts/getForSaleBook'
import ProductPage from '@/../presentation/pages/ProductPage'

export const metadata = {
  title: 'The Lean Startup',
}

export default async function PageProduit({
  params,
}: {
  params: { id: string }
}) {
  return (
    <BookFetcherProvider>
      <ProductPage bookId={params.id} />
    </BookFetcherProvider>
  )
}
