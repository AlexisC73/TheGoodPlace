'use client'

import { Dependencies } from '@/config/dependencies'
import { Auth } from '@/domain/auth/entities/auth'
import { SignInPayload } from '@/domain/auth/entities/payload/signInPayload'
import { SignUpClientPayload } from '@/domain/auth/entities/payload/signUpClientPayload'
import { UpdatePasswordPayload } from '@/domain/auth/entities/payload/updatePassword'
import { SignInUseCase } from '@/domain/auth/usecases/signIn'
import { SignupClientUseCase } from '@/domain/auth/usecases/signupClient'
import { UpdatePassword } from '@/domain/auth/usecases/updatePassword'
import { createContext, useState } from 'react'

export enum FetchStatus {
  INITIAL,
  LOADING,
  SUCCESS,
  FAILURE
}

export const AuthProviderContext = createContext({
  auth: null as Auth | null,
  state: FetchStatus.INITIAL,
  signIn: async (payload: SignInPayload) => {},
  signUp: async (payload: SignUpClientPayload) => {},
  signOut: () => {},
  updatePassword: async (payload: UpdatePasswordPayload) => {}
})

export const AuthContext: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [auth, setAuth] = useState<Auth | null>(null)
  const [state, setState] = useState<FetchStatus>(FetchStatus.INITIAL)
  const { authRepository } = Dependencies()

  const signInUseCase = new SignInUseCase(authRepository)
  const signUpClientUseCase = new SignupClientUseCase(authRepository)
  const updatePasswordUseCase = new UpdatePassword(authRepository)

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

  const signUp = async (payload: SignUpClientPayload) => {
    setState(FetchStatus.LOADING)
    try {
      const auth = await signUpClientUseCase.handle({ payload })
      setAuth(auth)
      setState(FetchStatus.SUCCESS)
    } catch (error) {
      setState(FetchStatus.FAILURE)
    }
  }

  const signOut = () => {
    setState(FetchStatus.LOADING)
    setAuth(null)
    setState(FetchStatus.SUCCESS)
  }

  const updatePassword = async (payload: UpdatePasswordPayload) => {
    setState(FetchStatus.LOADING)
    try {
      await updatePasswordUseCase.handle({ payload })
      setState(FetchStatus.SUCCESS)
    } catch (error) {
      setState(FetchStatus.FAILURE)
    }
  }

  return (
    <AuthProviderContext.Provider
      value={{ auth, signIn, signUp, state, signOut, updatePassword }}
    >
      {children}
    </AuthProviderContext.Provider>
  )
}

export default AuthContext
