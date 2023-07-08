'use client'

import { createContext, useContext, useState } from 'react'
import { FetchStatus } from '@/application/@shared/FetchStatus'
import { appContainer } from '@/application/@shared/container/container'
import { UpdateAvatarPayload } from '@/domain/profile/entities/payload/updateAvatarPayload'
import { ProfileProviderContext } from '@/application/auth/contexts/ProfileProvider'
import { UpdateAvatarUseCase } from '@/domain/profile/usecases/updateAvatar'

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

  const updateAvatarUseCase = appContainer.get(UpdateAvatarUseCase)

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
