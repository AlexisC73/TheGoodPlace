'use client'

import Brand from '@/components/brand'
import SearchBar from './SearchBar'
import { AuthModal } from '../AuthModal'
import { useState } from 'react'
import UserConnection from './UserInfo'

function Header () {
  const [showAuthModal, setShowAuthModal] = useState(false)

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
          <UserConnection showLoginModal={openAuthModal} />
        </div>
      </header>
      {showAuthModal && <AuthModal closeModal={closeAuthModal} />}
    </>
  )
}

export default Header
