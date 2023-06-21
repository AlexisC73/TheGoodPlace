import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs'
import { ProductBookPresentation } from './components/ProductBookPresentation'
import Link from 'next/link'
import { forSaleBookFetcher } from '../../../../application/server-components/forSaleBookFetcher'

export const metadata = {
  title: 'The Lean Startup',
}

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const book = await forSaleBookFetcher({ bookId: params.id })

  if (!book) {
    return (
      <div>
        <p>
          Ce livre n'existe pas...
          <Link className='text-primary underline' href={'/'}>
            Revenir à la liste des livres
          </Link>
        </p>
      </div>
    )
  }

  const breadcrumbs = [
    {
      name: 'Livres',
      href: '/',
    },
    {
      name: book.title,
      href: `/product/${book.id}`,
    },
  ]

  return (
    <main className='sm:mt-5 xl:mt-10 max-w-[1200px] mx-auto'>
      <div className='flex flex-col gap-10'>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <ProductBookPresentation productBookInfo={book.data} />
      </div>
    </main>
  )
}
