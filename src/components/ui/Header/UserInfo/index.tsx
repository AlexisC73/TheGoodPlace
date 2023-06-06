'use client'

import { useSession } from 'next-auth/react'
import UserInfo from './UserInfo'

const UserConnection = ({ showLoginModal }: { showLoginModal: () => void }) => {
  const { data: session, status } = useSession()
  if (status === 'loading') return null

  return (
    <div className='xl:w-[200px]'>
      {session ? <UserInfo /> : <ConnectionLink action={showLoginModal} />}
    </div>
  )
}

export default UserConnection

const ConnectionLink = ({ action }: { action: () => void }) => {
  return <button onClick={action}>Me connecter / M'inscrire</button>
}
