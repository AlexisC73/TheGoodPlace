import ProductBookPresentation from '@/components/ProductBookPresentation'

export const metadata = {
  title: 'The Lean Startup',
}

export default function ProductPage() {
  return (
    <main className='sm:mt-5 xl:mt-10 max-w-[1200px] mx-auto'>
      <ProductBookPresentation
        productBookInfo={{
          id: '1',
          title: 'The Lean Startup',
          author: 'Eric Ries',
          publicationDate: new Date('2011-09-13'),
          description:
            'Most startups fail. But many of those failures are preventable. The Lean Startup is a new approach being adopted across the globe, changing the way companies are built and new products are launched.',
          price: 22.99,
          rate: 4.5,
          imageUrl:
            'https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg',
        }}
      />
    </main>
  )
}
