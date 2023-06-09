'use client'

import { createContext, useState } from 'react'
import { FetchStatus } from '@/application/@shared/FetchStatus'
import { UpdateProfilePayload } from '@/domain/profile/entities/payload/updateProfilePayload'
import { appContainer } from '@/application/@shared/container/container'
import { UpdateProfileUseCase } from '@/domain/profile/usecases/updateProfile'

export const UpdateProfileProviderContext = createContext({
  state: FetchStatus.INITIAL,
  updateProfile: async (payload: UpdateProfilePayload) => {},
  error: ''
})

export const UpdateProfileContext: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [state, setState] = useState<FetchStatus>(FetchStatus.INITIAL)
  const [error, setError] = useState<string>('')

  const updateProfileUseCase = appContainer.get(UpdateProfileUseCase)

  const updateProfile = async (
    payload: UpdateProfilePayload
  ): Promise<void> => {
    setState(FetchStatus.LOADING)
    try {
      await updateProfileUseCase.handle({ payload })
      setState(FetchStatus.SUCCESS)
    } catch (error: any) {
      setError(error.message)
      setState(FetchStatus.FAILURE)
    }
  }

  return (
    <UpdateProfileProviderContext.Provider
      value={{ updateProfile, state, error }}
    >
      {children}
    </UpdateProfileProviderContext.Provider>
  )
}

export default UpdateProfileContext
