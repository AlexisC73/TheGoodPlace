'use client'

import { FormEventHandler } from 'react'
import FormElement from '../FormElement'
import { useNotifications } from '@/context/NotificationContext'
import { State, useSignup } from '../../../../application/auth/hook/useSignup'

export default function SignupForm({
  switchToSignin,
}: {
  switchToSignin: () => void
}) {
  const { pushNotification } = useNotifications()
  const {state, signupUser} = useSignup()

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name')?.toString()!
    const email = formData.get('email')?.toString()!
    const password = formData.get('password')?.toString()!
    const passwordConfirmation = formData.get('password-confirmation')?.toString()!
    signupUser({ name, email, password, passwordConfirmation })
  }

  if(state === State.ERROR) {
    pushNotification({
      title: 'Inscription manquée',
      content: 'Problème lors de l\'inscription',
      type: 'error',
      duration: 2,
    })
  }

  if(state === State.SUCCESS) {
    pushNotification({
      title: 'Inscription réussie',
      content: 'Votre compte a bien été créé',
      type: 'success',
      duration: 2,
    })
    switchToSignin()
  }

  return (
    <form className='flex flex-col' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-[20px]'>
        <FormElement label="Nom d'utilisateur" name='name' />
        <FormElement label='Addresse email' name='email' type='email' />
        <FormElement label='Mot de passe' name='password' type='password' />
        <FormElement
          label='Vérification du mot de passe'
          name='password-confirmation'
          type='password'
        />
      </div>
      <button
        className={`bg-primary h-[40px] self-center px-20 rounded mt-6 text-white`}
        disabled={state === State.LOADING}
        type='submit'
      >
        M&apos;inscrire
      </button>
    </form>
  )
}
