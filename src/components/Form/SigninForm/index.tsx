'use client'
import { FormEventHandler, useContext } from 'react'
import FormElement from '../FormElement'
import { useNotifications } from '@/context/NotificationContext'
import {
  AuthProviderContext,
  FetchStatus
} from '@/application/auth/contexts/AuthProvider'
import { SignInPayload } from '@/domain/auth/entities/payload/signInPayload'
import { Email } from '@/domain/auth/valueObjects/email'
import { Password } from '@/domain/auth/valueObjects/password'

export default function SigninForm ({
  closeSigninModal
}: {
  closeSigninModal: () => void
}) {
  const { signIn, state, auth } = useContext(AuthProviderContext)
  const { pushNotification } = useNotifications()

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    signIn(
      new SignInPayload(
        Email.create(formData.get('email') as string),
        Password.create(formData.get('password') as string)
      )
    )
  }

  if (auth) {
    closeSigninModal()
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
        disabled={state === FetchStatus.LOADING}
      >
        Me connecter
      </button>
    </form>
  )
}
