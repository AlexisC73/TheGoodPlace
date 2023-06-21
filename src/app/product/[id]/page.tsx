import { BookFetcherProvider } from '../../../../application/contexts/getForSaleBook'
import BookPage from '../../../../presentation/pages/ForSaleBookPage/BookPage'

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
      <BookPage bookId={params.id} />
    </BookFetcherProvider>
  )
}
