'use client'

import { FetchStatus } from '@/application/@shared/FetchStatus'
import { appContainer } from '@/application/@shared/container/container'
import { TYPES } from '@/application/@shared/container/types'
import { Auth } from '@/domain/auth/entities/auth'
import { createContext, useEffect, useState } from 'react'
import { AuthService } from '../services/AuthService'

export const AuthProviderContext = createContext({
  auth: null as Auth | null,
  setAuth: (auth: Auth | null) => {},
  state: FetchStatus.INITIAL
})

export const AuthContext: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [auth, setAuth] = useState<Auth | null>(null)
  const [state, setState] = useState<FetchStatus>(FetchStatus.INITIAL)
  const authService = appContainer.get(TYPES.AuthService) as AuthService
  const lookForCachedAuthUseCase = authService.GetLookForCachedAuthUseCase()

  useEffect(() => {
    if (state === FetchStatus.INITIAL) {
      setState(FetchStatus.LOADING)
      const auth = lookForCachedAuthUseCase.handle()
      if (auth) {
        setAuth(auth)
      }
      setState(FetchStatus.SUCCESS)
    }
  }, [])

  return (
    <AuthProviderContext.Provider value={{ auth, state, setAuth }}>
      {children}
    </AuthProviderContext.Provider>
  )
}

export default AuthContext
