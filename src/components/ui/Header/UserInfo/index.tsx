'use client'

import { FetchStatus } from '@/application/@shared/FetchStatus'
import UserInfo from './UserInfo'
import { AuthProviderContext } from '@/application/auth/contexts/AuthProvider'
import { useContext } from 'react'

const UserConnection = ({ showLoginModal }: { showLoginModal: () => void }) => {
  const { auth, state } = useContext(AuthProviderContext)
  if (state === FetchStatus.LOADING) return null

  return auth ? <UserInfo /> : <ConnectionLink action={showLoginModal} />
}

export default UserConnection

const ConnectionLink = ({ action }: { action: () => void }) => {
  return <button onClick={action}>Me connecter / M&apos;inscrire</button>
}
