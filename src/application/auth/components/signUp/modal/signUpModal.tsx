'use client'

import { FormEventHandler, useContext } from 'react'
import { useNotifications } from '@/context/NotificationContext'
import { AuthProviderContext } from '@/application/auth/contexts/AuthProvider'
import FormElement from '@/components/Form/FormElement'
import { FetchStatus } from '@/application/@shared/FetchStatus'
import Modal from '@/components/ui/Modal/Modal'
import { Email } from '@/domain/@shared/valueObject/email'
import { Password } from '@/domain/@shared/valueObject/password'
import { SignUpClientPayload } from '@/domain/auth/entities/payload/signUpClientPayload'
import { Id } from '@/domain/@shared/valueObject/id'
import { SignUpProviderContext } from '@/application/auth/contexts/SignUpProvider'

interface SignUpModalProps {
  closeModal: () => void
  switchToSignIn: () => void
}

export default function SignUpModalComponent ({
  closeModal,
  switchToSignIn
}: SignUpModalProps) {
  const { pushNotification } = useNotifications()

  const { state, signUp, error } = useContext(SignUpProviderContext)

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const inputEmail = formData.get('email')?.toString()
    const inputPassword = formData.get('password')?.toString()
    const inputPasswordConfirmation = formData
      .get('password-confirmation')
      ?.toString()

    if (!inputEmail || !inputPassword || !inputPasswordConfirmation) {
      return
    }
    const id = Id.create('12345678')
    const email = Email.create(inputEmail)
    const password = Password.create(inputPassword)
    const passwordConfirmation = Password.create(inputPasswordConfirmation)
    const signUpPayload = new SignUpClientPayload(
      id,
      email,
      password,
      passwordConfirmation
    )
    signUp(signUpPayload)
  }

  if (state === FetchStatus.SUCCESS) {
    closeModal()
  }
  if (state === FetchStatus.FAILURE) {
    pushNotification({
      title: 'Inscription échouée',
      content: error,
      type: 'error',
      duration: 2
    })
  }

  return (
    <Modal closeModal={closeModal}>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-[20px]'>
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
          disabled={state === FetchStatus.LOADING}
          type='submit'
        >
          M&apos;inscrire
        </button>
      </form>
      <div className='flex justify-between py-8'>
        <p>Vous avez déjà un compte ?</p>
        <button onClick={switchToSignIn} className='underline font-bold'>
          Me connecter
        </button>
      </div>
    </Modal>
  )
}
