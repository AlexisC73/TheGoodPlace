'use client'

import { createContext, useState } from 'react'
import { FetchStatus } from '@/application/@shared/FetchStatus'
import { ProfileService } from '../services/profileService'
import { appContainer } from '@/application/@shared/container/container'
import { TYPES } from '@/application/@shared/container/types'
import { UpdateAvatarPayload } from '@/domain/profile/entities/payload/updateAvatarPayload'

export const UpdateAvatarProviderContext = createContext({
  state: FetchStatus.INITIAL,
  updateAvatar: async (payload: UpdateAvatarPayload) => {},
  error: ''
})

export const UpdateAvatarContext: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [state, setState] = useState<FetchStatus>(FetchStatus.INITIAL)
  const [error, setError] = useState<string>('')

  const profileService = appContainer.get(
    TYPES.ProfileService
  ) as ProfileService

  const updateAvatarUseCase = profileService.GetUpdateAvatarUseCase()

  const updateAvatar = async (payload: UpdateAvatarPayload): Promise<void> => {
    setState(FetchStatus.LOADING)
    try {
      await updateAvatarUseCase.handle({ payload })
      setState(FetchStatus.SUCCESS)
    } catch (error: any) {
      setError(error.message)
      setState(FetchStatus.FAILURE)
    }
  }

  return (
    <UpdateAvatarProviderContext.Provider
      value={{ updateAvatar, state, error }}
    >
      {children}
    </UpdateAvatarProviderContext.Provider>
  )
}

export default UpdateAvatarContext
