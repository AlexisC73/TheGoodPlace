import { FetchStatus } from '@/application/@shared/FetchStatus'
import { SignInProviderContext } from '@/application/auth/contexts/SignInProvider'
import FormElement from '@/components/Form/FormElement'
import Modal from '@/components/ui/Modal/Modal'
import { useNotifications } from '@/context/NotificationContext'
import { Email } from '@/domain/@shared/valueObject/email'
import { Password } from '@/domain/@shared/valueObject/password'
import { SignInPayload } from '@/domain/auth/entities/payload/signInPayload'
import { FormEventHandler, useContext, useRef } from 'react'

interface SignInModalProps {
  closeModal: () => void
  switchToSignup: () => void
}

export default function SignInModal ({
  closeModal,
  switchToSignup
}: SignInModalProps) {
  const { signIn, state, error } = useContext(SignInProviderContext)
  const { pushNotification } = useNotifications()

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const inputMail = formData.get('email')?.toString()
    const inputPassword = formData.get('password')?.toString()
    if (!inputMail || !inputPassword) {
      return
    }
    const email = Email.create(inputMail)
    const password = Password.create(inputPassword)
    const payload = new SignInPayload(email, password)
    signIn(payload)
  }

  if (state === FetchStatus.SUCCESS) {
    closeModal()
  }
  if (state === FetchStatus.FAILURE) {
    pushNotification({
      title: 'Erreur',
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
      <div className='flex justify-between py-8'>
        <p>Vous n&apos;avez pas encore de compte ?</p>
        <button onClick={switchToSignup} className='underline font-bold'>
          M&apos;inscrire
        </button>
      </div>
    </Modal>
  )
}
