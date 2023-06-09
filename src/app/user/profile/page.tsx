import ChangeAvatarForm from './component/avatar/ChangeAvatarForm'
import ChangeUserInfoForm from './component/ChangeUserInfoForm/ChangeUserInfoForm'
import ChangePasswordForm from './component/ChangePasswordForm/ChangePasswordForm'

export default async function Profile() {
  return (
    <main className='pb-32'>
      <section className='max-w-[750px] mx-auto'>
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
