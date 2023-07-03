'use client'

import { authContainer } from '@/application/auth/container/authContainer'
import { TYPES } from '@/application/auth/container/types'
import type { AuthService } from '@/application/auth/services/AuthService'
import { createContext, useContext, useState } from 'react'
import { AuthProviderContext } from './AuthProvider'
import { SignUpClientPayload } from '@/domain/auth/entities/payload/signUpClientPayload'
import { FetchStatus } from '@/application/@shared/FetchStatus'

export const SignUpProviderContext = createContext({
  state: FetchStatus.INITIAL,
  signUp: async (payload: SignUpClientPayload) => {}
})

export const SignUpContext: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { setAuth } = useContext(AuthProviderContext)
  const [state, setState] = useState<FetchStatus>(FetchStatus.INITIAL)

  const authService = authContainer.get(TYPES.AuthService) as AuthService

  const signUpUseCase = authService.GetSignUpUseCase()

  const signUp = async (payload: SignUpClientPayload): Promise<void> => {
    setState(FetchStatus.LOADING)
    try {
      const auth = await signUpUseCase.handle({ payload })
      setAuth(auth)
      setState(FetchStatus.SUCCESS)
    } catch (error) {
      setState(FetchStatus.FAILURE)
    }
  }

  return (
    <SignUpProviderContext.Provider value={{ signUp, state }}>
      {children}
    </SignUpProviderContext.Provider>
  )
}

export default SignUpContext
