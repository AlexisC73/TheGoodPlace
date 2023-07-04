'use client'

import { useState } from 'react'
import { BookModel } from '../models/bookModel'
import { createContext } from 'react'
import { CatalogService } from '../services/catalogService'
import { FetchStatus } from '@/application/@shared/FetchStatus'
import { appContainer } from '@/application/@shared/container/container'
import { TYPES } from '@/application/@shared/container/types'

const BooksFetcherContext = createContext({
  books: null as BookModel[] | null,
  state: FetchStatus.INITIAL,
  getBooks: () => {}
})

export const BooksFetcherProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [books, setBooks] = useState<BookModel[] | null>(null)
  const [state, setState] = useState<FetchStatus>(FetchStatus.INITIAL)

  const catalogService = appContainer.get(
    TYPES.CatalogService
  ) as CatalogService

  const getBooks = async () => {
    setState(FetchStatus.LOADING)
    try {
      const getForSaleBooksUseCase = catalogService.FetchForSaleBooksUseCase()

      const books = await getForSaleBooksUseCase.handle()

      const bookModel = books.map(book => BookModel.fromDomain(book))
      setBooks(bookModel)
      setState(FetchStatus.SUCCESS)
    } catch (err) {
      setState(FetchStatus.FAILURE)
    }
  }

  return (
    <BooksFetcherContext.Provider
      value={{
        books,
        state,
        getBooks
      }}
    >
      {children}
    </BooksFetcherContext.Provider>
  )
}

export default BooksFetcherContext
