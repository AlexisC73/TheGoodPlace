'use client'

import Brand from '@/components/brand'
import SearchBar from './SearchBar'
import { SigninModal } from '../SigninModal'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import UserConnection from './UserInfo'

function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { data: session, status } = useSession()

  if (status === 'loading') return <div>...loading</div>
  console.log(session)

  const closeLoginModal = () => {
    setShowLoginModal(false)
  }
  return (
    <header className='flex gap-y-4 items-center justify-between xl:px-6 py-3 max-xl:grid max-xl:grid-cols-header xl:border-b-2'>
      <div className='max-xl:pl-3'>
        <Brand />
      </div>

      <div className='max-xl:order-1 col-span-2'>
        <SearchBar />
      </div>
      <UserConnection showLoginModal={() => setShowLoginModal(true)} />
      {showLoginModal && <SigninModal closeLoginModal={closeLoginModal} />}
    </header>
  )
}

export default Header
