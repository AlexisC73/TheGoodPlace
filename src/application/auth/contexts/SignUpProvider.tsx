'use client'

import { createContext, useContext, useState } from 'react'
import { AuthProviderContext } from './AuthProvider'
import { SignUpClientPayload } from '@/domain/auth/entities/payload/signUpClientPayload'
import { FetchStatus } from '@/application/@shared/FetchStatus'
import { appContainer } from '@/application/@shared/container/container'
import { SignupClientUseCase } from '@/domain/auth/usecases/signupClient'

export const SignUpProviderContext = createContext({
  state: FetchStatus.INITIAL,
  signUp: async (payload: SignUpClientPayload) => {},
  error: ''
})

export const SignUpContext: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { setAuth } = useContext(AuthProviderContext)
  const [state, setState] = useState<FetchStatus>(FetchStatus.INITIAL)
  const [error, setError] = useState<string>('')

  const signUpUseCase = appContainer.get(SignupClientUseCase)

  const signUp = async (payload: SignUpClientPayload): Promise<void> => {
    setState(FetchStatus.LOADING)
    try {
      const auth = await signUpUseCase.handle({ payload })
      setAuth(auth)
      setState(FetchStatus.SUCCESS)
    } catch (error: any) {
      setError(error.message)
      setState(FetchStatus.FAILURE)
    }
  }

  return (
    <SignUpProviderContext.Provider value={{ signUp, state, error }}>
      {children}
    </SignUpProviderContext.Provider>
  )
}

export default SignUpContext
