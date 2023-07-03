'use client'

import { authContainer } from '@/application/auth/container/authContainer'
import { TYPES } from '@/application/auth/container/types'
import type { AuthService } from '@/application/auth/services/AuthService'
import { SignInPayload } from '@/domain/auth/entities/payload/signInPayload'
import { createContext, useContext, useState } from 'react'
import { AuthProviderContext } from './AuthProvider'

export enum FetchStatus {
  INITIAL,
  LOADING,
  SUCCESS,
  FAILURE
}

export const SignInProviderContext = createContext({
  state: FetchStatus.INITIAL,
  signIn: async (payload: SignInPayload) => {}
})

export const SignInContext: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { setAuth } = useContext(AuthProviderContext)
  const [state, setState] = useState<FetchStatus>(FetchStatus.INITIAL)

  const authService = authContainer.get(TYPES.AuthService) as AuthService

  const signInUseCase = authService.GetSignInUseCase()

  const signIn = async (payload: SignInPayload): Promise<void> => {
    setState(FetchStatus.LOADING)
    try {
      const auth = await signInUseCase.handle({ payload })
      setAuth(auth)
      setState(FetchStatus.SUCCESS)
    } catch (error) {
      setState(FetchStatus.FAILURE)
    }
  }

  return (
    <SignInProviderContext.Provider value={{ signIn, state }}>
      {children}
    </SignInProviderContext.Provider>
  )
}

export default SignInContext
