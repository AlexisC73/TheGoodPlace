'use client'

import { FetchStatus } from '@/application/@shared/FetchStatus'
import { authContainer } from '@/application/auth/container/authContainer'
import { TYPES } from '@/application/auth/container/types'
import type { AuthService } from '@/application/auth/services/AuthService'
import { Auth } from '@/domain/auth/entities/auth'
import { createContext, useState } from 'react'

export const AuthProviderContext = createContext({
  auth: null as Auth | null,
  setAuth: (auth: Auth | null) => {},
  state: FetchStatus.INITIAL,
  signOut: () => {}
})

export const AuthContext: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [auth, setAuth] = useState<Auth | null>(null)
  const [state, setState] = useState<FetchStatus>(FetchStatus.INITIAL)

  const authService = authContainer.get(TYPES.AuthService) as AuthService

  const signOut = () => {
    setState(FetchStatus.LOADING)
    setAuth(null)
    setState(FetchStatus.SUCCESS)
  }

  return (
    <AuthProviderContext.Provider value={{ auth, state, signOut, setAuth }}>
      {children}
    </AuthProviderContext.Provider>
  )
}

export default AuthContext
