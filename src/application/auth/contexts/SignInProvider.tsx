'use client'

import { SignInPayload } from '@/domain/auth/entities/payload/signInPayload'
import { createContext, useContext, useState } from 'react'
import { AuthProviderContext } from './AuthProvider'
import { FetchStatus } from '@/application/@shared/FetchStatus'
import { appContainer } from '@/application/@shared/container/container'
import { SignInUseCase } from '@/domain/auth/usecases/signIn'

export const SignInProviderContext = createContext({
  state: FetchStatus.INITIAL,
  signIn: async (payload: SignInPayload) => {},
  error: ''
})

export const SignInContext: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { setAuth } = useContext(AuthProviderContext)
  const [state, setState] = useState<FetchStatus>(FetchStatus.INITIAL)
  const [error, setError] = useState<string>('')

  const signInUseCase = appContainer.get(SignInUseCase)

  const signIn = async (payload: SignInPayload): Promise<void> => {
    setState(FetchStatus.LOADING)
    try {
      const auth = await signInUseCase.handle({ payload })
      setAuth(auth)
      setState(FetchStatus.SUCCESS)
    } catch (error: any) {
      setError(error.message)
      setState(FetchStatus.FAILURE)
    }
  }

  return (
    <SignInProviderContext.Provider value={{ signIn, state, error }}>
      {children}
    </SignInProviderContext.Provider>
  )
}

export default SignInContext
