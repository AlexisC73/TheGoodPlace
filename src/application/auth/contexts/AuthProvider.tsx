'use client'

import { FetchStatus } from '@/application/@shared/FetchStatus'
import { appContainer } from '@/application/@shared/container/container'
import { Auth } from '@/domain/auth/entities/auth'
import { GetCachedAuthUseCase } from '@/domain/auth/usecases/getCachedAuth'
import { createContext, useEffect, useState } from 'react'

export const AuthProviderContext = createContext({
  auth: undefined as Auth | undefined,
  setAuth: {} as React.Dispatch<React.SetStateAction<Auth | undefined>>,
  state: FetchStatus.INITIAL
})

export const AuthContext: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [auth, setAuth] = useState<Auth>()
  const [state, setState] = useState<FetchStatus>(FetchStatus.INITIAL)
  const lookForCachedAuthUseCase = appContainer.get(GetCachedAuthUseCase)

  useEffect(() => {
    if (state === FetchStatus.INITIAL) {
      setState(FetchStatus.LOADING)
      setAuth(lookForCachedAuthUseCase.handle())
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
