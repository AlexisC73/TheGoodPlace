'use client'

import { createContext, useContext, useState } from 'react'
import { FetchStatus } from '@/application/@shared/FetchStatus'
import { ProfileService } from '../services/profileService'
import { appContainer } from '@/application/@shared/container/container'
import { TYPES } from '@/application/@shared/container/types'
import { UpdateAvatarPayload } from '@/domain/profile/entities/payload/updateAvatarPayload'
import { ProfileProviderContext } from './profileProvider'

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
  const { setProfile } = useContext(ProfileProviderContext)

  const profileService = appContainer.get(
    TYPES.ProfileService
  ) as ProfileService

  const updateAvatarUseCase = profileService.GetUpdateAvatarUseCase()

  const updateAvatar = async (payload: UpdateAvatarPayload): Promise<void> => {
    setState(FetchStatus.LOADING)
    try {
      const newUrl = await updateAvatarUseCase.handle({ payload })
      setProfile(profile => profile?.copyWith({ avatarUrl: newUrl }))
      setState(FetchStatus.SUCCESS)
    } catch (error: any) {
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
