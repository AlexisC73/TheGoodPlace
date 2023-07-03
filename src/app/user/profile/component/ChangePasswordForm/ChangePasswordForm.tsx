'use client'

import CheckIcon from '@/assets/CheckIcon'
import ChangeInformationForm from '../ChangeInformationForm/ChangeInformationForm'
import FormElement from '@/components/Form/FormElement'
import { FormEventHandler, useContext } from 'react'
import { useNotifications } from '@/context/NotificationContext'
import { AuthProviderContext } from '@/application/auth/contexts/AuthProvider'
import { UpdatePasswordPayload } from '@/domain/auth/entities/payload/updatePassword'
import { Password } from '@/domain/@shared/valueObject/password'
import { Id } from '@/domain/@shared/valueObject/id'
import { FetchStatus } from '@/application/@shared/FetchStatus'

function ChangePasswordForm () {
  const { pushNotification } = useNotifications()
  const { auth, state } = useContext(AuthProviderContext)

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const oldPassword = formData.get('old-password')?.toString()
    const newPassword = formData.get('new-password')?.toString()
    const newPasswordConfirmation = formData.get('confirmPassword')?.toString()
    if (!oldPassword || !newPassword || !newPasswordConfirmation) {
      pushNotification({
        title: 'Erreur',
        content: 'Veuillez remplir tous les champs',
        type: 'error',
        duration: 2
      })
      return
    }

    if (!auth) {
      return
    }
  }

  return (
    <ChangeInformationForm
      sectionTitle='Modification du mot de passe'
      submitLabel='Modifier le mot de passe'
      icon={<CheckIcon />}
      onSubmit={handleSubmit}
      canSubmit={state === FetchStatus.LOADING}
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
