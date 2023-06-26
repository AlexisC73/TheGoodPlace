import { BookFetcherProvider } from '../../../../application/catalog/contexts/getForSaleBook'
import BookPage from '../../../../presentation/pages/ForSaleBookPage/BookPage'

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
