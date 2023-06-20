import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs'
import { getForSaleBook } from '@/utils/api-request'
import { Book } from '../../../../types/interfaces'
import { ProductBookPresentation } from './components/ProductBookPresentation'
import { ProductBookInfo } from './components/ProductBookPresentation/ProductBookPresentation'
import Link from 'next/link'

export const metadata = {
  title: 'The Lean Startup',
}

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const book = (await getForSaleBook(params.id)) as Book

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
  const actualBookInfo: ProductBookInfo = {
    author: book.author,
    description: book.description,
    id: book.id,
    imageUrl: book.imageUrl,
    price: book.price,
    publicationDate: new Date(book.publicationDate),
    rate: 3.8,
    title: book.title,
  }

  const breadcrumbs = [
    {
      name: 'Livres',
      href: '/',
    },
    {
      name: actualBookInfo.title,
      href: `/product/${actualBookInfo.id}`,
    },
  ]

  return (
    <main className='sm:mt-5 xl:mt-10 max-w-[1200px] mx-auto'>
      <div className='flex flex-col gap-10'>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <ProductBookPresentation productBookInfo={actualBookInfo} />
      </div>
    </main>
  )
}
