'use client'

import { Dependencies } from '@/config/dependencies'
import { Auth } from '@/domain/auth/entities/auth'
import { SignInPayload } from '@/domain/auth/entities/payload/signInPayload'
import { SignUpClientPayload } from '@/domain/auth/entities/payload/signUpClientPayload'
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
  signIn: (payload: SignInPayload) => {},
  signUp: (payload: SignUpClientPayload) => {},
  signOut: () => {}
})

export const AuthContext: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [auth, setAuth] = useState<Auth | null>(null)
  const [state, setState] = useState<FetchStatus>(FetchStatus.INITIAL)
  const { authRepository } = Dependencies()

  const signIn = async (payload: SignInPayload) => {
    setState(FetchStatus.LOADING)
    try {
      const auth = await authRepository.signIn(payload)
      setAuth(auth)
      setState(FetchStatus.SUCCESS)
    } catch (error) {
      setState(FetchStatus.FAILURE)
    }
  }

  const signUp = async (payload: SignUpClientPayload) => {
    setState(FetchStatus.LOADING)
    try {
      const auth = await authRepository.signupClient(payload)
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

  return (
    <AuthProviderContext.Provider
      value={{ auth, signIn, signUp, state, signOut }}
    >
      {children}
    </AuthProviderContext.Provider>
  )
}

export default AuthContext
