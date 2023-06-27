import React from 'react'
import { BookModel } from '../../../application/catalog/models/bookModel'
import BookCard from './BookCard/BookCard'

function ProductList({ books }: { books: BookModel[] | null }) {
  let content = books?.map((book) => (
    <li key={book.id} className='sm:justify-self-center h-full'>
      <BookCard bookInfo={book} />
    </li>
  ))
  return (
    <ul
      id='product-list'
      className='grid gap-4 sm:gap-y-8 md:grid-cols-3 sm:grid-cols-2 xl:max-w-[1200px] xl:grid-cols-4'
    >
      {content}
    </ul>
  )
}

export default ProductList
