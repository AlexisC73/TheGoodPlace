'use client'

import ChangeAvatarForm from './component/avatar/ChangeAvatarForm'
import ChangeUserInfoForm from './component/ChangeUserInfoForm/ChangeUserInfoForm'
import UpdatePasswordForm from '@/application/auth/components/updatePassword'
import { useContext } from 'react'
import { AuthProviderContext } from '@/application/auth/contexts/AuthProvider'
import { redirect } from 'next/navigation'

export default function Profile () {
  const { auth } = useContext(AuthProviderContext)
  if (!auth) {
    redirect('/')
  }
  return (
    <main className='pb-32'>
      <section className='max-w-[750px] mx-auto px-5 xl:px0'>
        <h1 className='text-[18px] font-bold mb-14 mt-10'>
          Réglage du profile
        </h1>
        <div className='flex flex-col gap-y-16'>
          <ChangeAvatarForm />
          <ChangeUserInfoForm />
          <UpdatePasswordForm />
        </div>
      </section>
    </main>
  )
}
