'use client'
import CheckIcon from '@/assets/CheckIcon'
import ChangeInformationForm from '../ChangeInformationForm/ChangeInformationForm'
import FormElement from '@/components/Form/FormElement'
import { FormEventHandler } from 'react'
import { useNotifications } from '@/context/NotificationContext'

function ChangePasswordForm() {
  const { pushNotification } = useNotifications()

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const oldPassword = formData.get('old-password')
    const newPassword = formData.get('new-password')
    const newPasswordConfirmation = formData.get('confirmPassword')

    fetch('/api/user/password', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
        newPasswordConfirmation,
      }),
    }).then(async (res) => {
      const data = await res.json()
      if (data.success) {
        form.reset()
        pushNotification({
          title: 'Mot de passe modifié',
          content: 'Votre mot de passe a bien été modifié',
          duration: 1,
        })
      } else {
        pushNotification({
          title: 'Erreur',
          type: 'error',
          content: data.error,
          duration: 1,
        })
      }
    })
  }

  return (
    <ChangeInformationForm
      sectionTitle='Modification du mot de passe'
      submitLabel='Modifier le mot de passe'
      icon={<CheckIcon />}
      onSubmit={handleSubmit}
    >
      <FormElement
        label='Mot de passe (actuel)'
        name='old-password'
        type='password'
      />
      <FormElement
        label='Mot de passe (nouveau)'
        name='new-password'
        type='password'
      />
      <FormElement
        label='Vérification du nouveau mot de passe'
        name='confirmPassword'
        type='password'
      />
    </ChangeInformationForm>
  )
}

export default ChangePasswordForm
