'use client'

import { useState } from 'react'
import { BookModel } from '../models/bookModel'
import { GetForSaleBooksUseCase } from '../../domain/usecases/get-for-sale-books'
import { InMemoryBookRepository } from '../../infrastructure/repositories/in-memory-book'
import { createContext } from 'react'

export enum FetchStatus {
  INITIAL,
  LOADING,
  SUCCESS,
  FAILURE,
}

const BooksFetcherContext = createContext({
  books: null as BookModel[] | null,
  state: FetchStatus.INITIAL,
  getBooks: () => {},
})

export const BooksFetcherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [books, setBooks] = useState<BookModel[] | null>(null)
  const [state, setState] = useState<FetchStatus>(FetchStatus.INITIAL)

  const getBooks = async () => {
    setState(FetchStatus.LOADING)
    try {
      const bookRepository = new InMemoryBookRepository()
      const usecase = new GetForSaleBooksUseCase(bookRepository)

      const books = await usecase.handle()
      const bookModel = books.map((book) => BookModel.fromDomain(book))
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
        getBooks,
      }}
    >
      {children}
    </BooksFetcherContext.Provider>
  )
}

export default BooksFetcherContext
