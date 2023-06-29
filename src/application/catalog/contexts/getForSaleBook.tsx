'use client'

import { useState } from 'react'
import { BookModel } from '../models/bookModel'
import { createContext } from 'react'
import { GetSpecificForSaleBook } from '../../../domain/catalog/usecases/get-for-sale-book'
import { Dependencies } from '../../../config/dependencies'

export enum FetchStatus {
  INITIAL,
  LOADING,
  SUCCESS,
  FAILURE
}

const BookFetcherContext = createContext({
  book: null as BookModel | null,
  state: FetchStatus.INITIAL,
  getBook: (id: string) => {}
})

export const BookFetcherProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [book, setBook] = useState<BookModel | null>(null)
  const [state, setState] = useState<FetchStatus>(FetchStatus.INITIAL)
  const { bookRepository } = Dependencies()

  const getBook = async (id: string) => {
    setState(FetchStatus.LOADING)
    try {
      const usecase = new GetSpecificForSaleBook(bookRepository)

      const book = await usecase.handle({ bookId: id })
      const bookModel = BookModel.fromDomain(book)
      setBook(bookModel)
      setState(FetchStatus.SUCCESS)
    } catch (err) {
      setState(FetchStatus.FAILURE)
    }
  }

  return (
    <BookFetcherContext.Provider
      value={{
        book,
        state,
        getBook
      }}
    >
      {children}
    </BookFetcherContext.Provider>
  )
}

export default BookFetcherContext
