import ChangeAvatarForm from './component/avatar/ChangeAvatarForm'
import ChangeUserInfoForm from './component/ChangeUserInfoForm/ChangeUserInfoForm'
import ChangePasswordForm from './component/ChangePasswordForm/ChangePasswordForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function Profile () {
  const session = await getServerSession(authOptions)
  if (!session) {
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
          <ChangePasswordForm />
        </div>
      </section>
    </main>
  )
}
