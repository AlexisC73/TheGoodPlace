'use client'

import { createContext, useContext, useState } from 'react'
import { AuthProviderContext } from './AuthProvider'
import { FetchStatus } from '@/application/@shared/FetchStatus'
import { appContainer } from '@/application/@shared/container/container'
import { SignOutUseCase } from '@/domain/auth/usecases/signOutUseCase'

export const SignOutProviderContext = createContext({
  state: FetchStatus.INITIAL,
  signOut: async () => {},
  error: ''
})

export const SignOutContext: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { setAuth } = useContext(AuthProviderContext)
  const [state, setState] = useState<FetchStatus>(FetchStatus.INITIAL)
  const [error, setError] = useState<string>('')

  const signOutUseCase = appContainer.get(SignOutUseCase)

  const signOut = async (): Promise<void> => {
    setState(FetchStatus.LOADING)
    try {
      signOutUseCase.handle()
      setAuth(undefined)
      setState(FetchStatus.SUCCESS)
    } catch (error: any) {
      setError(error.message)
      setState(FetchStatus.FAILURE)
    }
  }

  return (
    <SignOutProviderContext.Provider value={{ signOut, state, error }}>
      {children}
    </SignOutProviderContext.Provider>
  )
}

export default SignOutContext
