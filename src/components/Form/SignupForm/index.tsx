'use client'

import { FormEventHandler } from 'react'
import FormElement from '../FormElement'
import { useNotifications } from '@/context/NotificationContext'

export default function SignupForm({
  switchToSignin,
}: {
  switchToSignin: () => void
}) {
  const { pushNotification } = useNotifications()

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const username = formData.get('username')?.toString()!
    const email = formData.get('email')?.toString()!
    const password = formData.get('password')?.toString()!
    const passwordVerif = formData.get('password-verif')?.toString()!
    signup({ username, email, password, passwordVerif }).then(async (res) => {
      if (res.ok) {
        switchToSignin()
        return
      }
      const data = await res.json()
      pushNotification({
        title: 'Erreur',
        content: data.message || 'Une erreur est survenue',
        type: 'error',
        duration: 2,
      })
    })
  }
  const signup = ({
    username,
    email,
    password,
    passwordVerif,
  }: {
    username: string
    email: string
    password: string
    passwordVerif: string
  }) =>
    fetch('http://localhost:3000/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        passwordVerif,
      }),
    })

  return (
    <form className='flex flex-col' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-[20px]'>
        <FormElement label="Nom d'utilisateur" name='username' />
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
