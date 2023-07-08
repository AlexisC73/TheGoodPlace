'use client'

import UpdatePasswordForm from '@/presentation/auth/updatePassword'
import { useContext } from 'react'
import { AuthProviderContext } from '@/application/auth/contexts/AuthProvider'
import { redirect } from 'next/navigation'
import UpdateProfileForm from '@/presentation/profile/updateProfile/form'
import UpdateAvatarForm from '@/presentation/profile/updateAvatar/form'
import { FetchStatus } from '@/application/@shared/FetchStatus'

export default function Profile () {
  const { auth, state } = useContext(AuthProviderContext)
  if (!auth && state !== FetchStatus.INITIAL && state !== FetchStatus.LOADING) {
    redirect('/')
  }
  return (
    <main className='pb-32'>
      <section className='max-w-[750px] mx-auto px-5 xl:px0'>
        <h1 className='text-[18px] font-bold mb-14 mt-10'>
          Réglage du profile
        </h1>
        <div className='flex flex-col gap-y-16'>
          <UpdateAvatarForm />
          <UpdateProfileForm />
          <UpdatePasswordForm />
        </div>
      </section>
    </main>
  )
}
