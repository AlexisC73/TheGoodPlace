'use client'

import { FormEventHandler } from 'react'
import FormElement from '../FormElement'
import { useNotifications } from '@/context/NotificationContext'
import { ApiResponse } from '@/utils/api-response'

export default function SignupForm({
  switchToSignin,
}: {
  switchToSignin: () => void
}) {
  const { pushNotification } = useNotifications()

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name')?.toString()!
    const email = formData.get('email')?.toString()!
    const password = formData.get('password')?.toString()!
    const passwordVerif = formData.get('password-verif')?.toString()!
    signup({ name, email, password, passwordVerif })
  }
  const signup = async ({
    name,
    email,
    password,
    passwordVerif,
  }: {
    name: string
    email: string
    password: string
    passwordVerif: string
  }) => {
    const request = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        passwordVerif,
      }),
    })
    const response: ApiResponse = await request.json()
    if (response.success) {
      pushNotification({
        title: 'Utilisateur créé',
        content: response.data.message,
        duration: 1,
      })
      switchToSignin()
    } else {
      pushNotification({
        title: 'Erreur',
        type: 'error',
        content: response.error,
        duration: 5,
      })
    }
  }

  return (
    <form className='flex flex-col' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-[20px]'>
        <FormElement label="Nom d'utilisateur" name='name' />
        <FormElement label='Addresse email' name='email' type='email' />
        <FormElement label='Mot de passe' name='password' type='password' />
        <FormElement
          label='Vérification du mot de passe'
          name='password-verif'
          type='password'
        />
      </div>
      <button
        className='bg-primary h-[40px] self-center px-20 rounded mt-6 text-white'
        type='submit'
      >
        M&apos;inscrire
      </button>
    </form>
  )
}
