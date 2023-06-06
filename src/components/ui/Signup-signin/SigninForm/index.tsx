'use client'
import { FormEventHandler } from 'react'
import FormElement from '../FormElement'
import { signIn } from 'next-auth/react'

export default function SigninForm({
  closeSigninModal,
}: {
  closeSigninModal: () => void
}) {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    }).then(() => closeSigninModal())
  }
  return (
    <form className='flex flex-col' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-[20px]'>
        <FormElement label='Addresse email' name='email' type='email' />
        <FormElement label='Mot de passe' name='password' type='password' />
      </div>

      <span className='underline text-[#606060] text-[14px] mt-2'>
        Mot de passe oublié ?
      </span>
      <button
        className='bg-primary h-[40px] self-center px-20 rounded mt-6 text-white'
        type='submit'
      >
        Me connecter
      </button>
    </form>
  )
}
