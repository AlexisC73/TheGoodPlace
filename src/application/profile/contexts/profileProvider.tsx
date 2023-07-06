'use client'

import { FetchStatus } from '@/application/@shared/FetchStatus'
import { appContainer } from '@/application/@shared/container/container'
import { TYPES } from '@/application/@shared/container/types'
import { createContext, useContext, useEffect, useState } from 'react'
import { ProfileService } from '../services/profileService'
import { Profile } from '@/domain/profile/entities/profile'
import { AuthProviderContext } from '@/application/auth/contexts/AuthProvider'

export const ProfileProviderContext = createContext({
  profile: undefined as Profile | undefined,
  setProfile: {} as React.Dispatch<React.SetStateAction<Profile | undefined>>,
  state: FetchStatus.INITIAL
})

export const ProfileContext: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [profile, setProfile] = useState<Profile>()
  const [state, setState] = useState<FetchStatus>(FetchStatus.INITIAL)
  const profileService = appContainer.get(
    TYPES.ProfileService
  ) as ProfileService
  const getProfileUseCase = profileService.GetProfile()
  const { auth, setAuth } = useContext(AuthProviderContext)

  useEffect(() => {
    if (auth) {
      setState(FetchStatus.LOADING)
      getProfileUseCase
        .handle(auth.id)
        .then(profile => {
          setProfile(profile)
          setState(FetchStatus.SUCCESS)
        })
        .catch(err => {
          setAuth(undefined)
          setState(FetchStatus.FAILURE)
        })
    } else {
      setProfile(undefined)
    }
  }, [auth])

  return (
    <ProfileProviderContext.Provider value={{ profile, state, setProfile }}>
      {children}
    </ProfileProviderContext.Provider>
  )
}

export default ProfileContext
