'use client'
import { AuthProviderContext } from '@/application/auth/contexts/AuthProvider'
import { ProfileProviderContext } from '@/application/auth/contexts/ProfileProvider'
import { BooksFetcherProvider } from '@/application/catalog/contexts/getForSaleBooks'
import ForSaleBooksPage from '@/presentation/pages/ForSaleBooksPage/ForSaleBooksPage'
import { useContext } from 'react'

export default function Home () {
  const { auth } = useContext(AuthProviderContext)
  const { profile } = useContext(ProfileProviderContext)
  return (
    <BooksFetcherProvider>
      <ForSaleBooksPage />
      {!!auth && (profile ? <h1>{profile.email}</h1> : <h1>No Profile</h1>)}
    </BooksFetcherProvider>
  )
}
