'use client'

import Brand from '@/components/brand'
import SearchBar from './SearchBar'
import { AuthModal } from '../AuthModal'
import { useContext, useState } from 'react'
import { AuthProviderContext } from '@/application/auth/contexts/AuthProvider'
import UserInfo from './UserInfo/UserInfo'
import { FetchStatus } from '@/application/@shared/FetchStatus'
import { LoadingSpinner } from '@/assets/spinner'

function Header () {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { auth, state } = useContext(AuthProviderContext)

  const closeAuthModal = () => {
    setShowAuthModal(false)
  }
  const openAuthModal = () => {
    setShowAuthModal(true)
  }
  return (
    <>
      <header className='flex gap-y-4 items-center justify-between xl:px-6 py-3 max-xl:grid max-xl:grid-cols-header xl:border-b-2'>
        <div className='max-xl:pl-3'>
          <Brand />
        </div>

        <div className='max-xl:order-1 col-span-2'>
          <SearchBar />
        </div>
        <div className='xl:w-[200px]'>
          {state === FetchStatus.SUCCESS &&
            (auth ? <UserInfo /> : <ConnectionLink action={openAuthModal} />)}
        </div>
      </header>
      {showAuthModal && !auth && <AuthModal closeModal={closeAuthModal} />}
    </>
  )
}

const ConnectionLink = ({ action }: { action: () => void }) => {
  return <button onClick={action}>Me connecter / M&apos;inscrire</button>
}

export default Header
