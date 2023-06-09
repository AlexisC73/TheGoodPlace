'use client'

import { FetchStatus } from '@/application/@shared/FetchStatus'
import { appContainer } from '@/application/@shared/container/container'
import { createContext, useContext, useEffect, useState } from 'react'
import { Profile } from '@/domain/profile/entities/profile'
import { AuthProviderContext } from './AuthProvider'
import { GetProfileUseCase } from '@/domain/auth/usecases/getProfile'
import { SignOutUseCase } from '@/domain/auth/usecases/signOutUseCase'

export const ProfileProviderContext = createContext({
  profile: undefined as Profile | undefined,
  setProfile: {} as React.Dispatch<React.SetStateAction<Profile | undefined>>,
  state: FetchStatus.INITIAL
})

export const ProfileContext: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { auth, state: authState } = useContext(AuthProviderContext)
  const [profile, setProfile] = useState<Profile>()
  const [state, setState] = useState<FetchStatus>(FetchStatus.INITIAL)
  const getProfileUseCase = appContainer.get(GetProfileUseCase)
  const signOutUseCase = appContainer.get(SignOutUseCase)

  useEffect(() => {
    if (authState === FetchStatus.SUCCESS && auth) {
      setState(FetchStatus.LOADING)
      getProfileUseCase
        .handle({ auth })
        .then(profile => {
          setProfile(profile)
          setState(FetchStatus.SUCCESS)
        })
        .catch(err => {
          setProfile(undefined)
          signOutUseCase.handle()
          setState(FetchStatus.FAILURE)
        })
    } else {
      setProfile(undefined)
      setState(FetchStatus.SUCCESS)
    }
  }, [auth])
  return (
    <ProfileProviderContext.Provider value={{ profile, state, setProfile }}>
      {children}
    </ProfileProviderContext.Provider>
  )
}

export default ProfileContext
