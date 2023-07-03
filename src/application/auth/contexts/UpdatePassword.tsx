'use client'

import { authContainer } from '@/application/auth/container/authContainer'
import { TYPES } from '@/application/auth/container/types'
import type { AuthService } from '@/application/auth/services/AuthService'
import { createContext, useState } from 'react'
import { UpdatePasswordPayload } from '@/domain/auth/entities/payload/updatePassword'
import { FetchStatus } from '@/application/@shared/FetchStatus'

export const UpdatePasswordProviderContext = createContext({
  state: FetchStatus.INITIAL,
  updatePassword: async (payload: UpdatePasswordPayload) => {},
  error: ''
})

export const UpdatePasswordContext: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [state, setState] = useState<FetchStatus>(FetchStatus.INITIAL)
  const [error, setError] = useState<string>('')

  const authService = authContainer.get(TYPES.AuthService) as AuthService

  const updatePasswordUseCase = authService.GetUpdatePasswordUseCase()

  const updatePassword = async (
    payload: UpdatePasswordPayload
  ): Promise<void> => {
    setState(FetchStatus.LOADING)
    try {
      await updatePasswordUseCase.handle({ payload })
      setState(FetchStatus.SUCCESS)
    } catch (error: any) {
      setError(error.message)
      setState(FetchStatus.FAILURE)
    }
  }

  return (
    <UpdatePasswordProviderContext.Provider
      value={{ updatePassword, state, error }}
    >
      {children}
    </UpdatePasswordProviderContext.Provider>
  )
}

export default UpdatePasswordContext
