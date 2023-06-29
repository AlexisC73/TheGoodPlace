'use client'

import CheckIcon from '@/assets/CheckIcon'
import ChangeInformationForm from '../ChangeInformationForm/ChangeInformationForm'
import FormElement from '@/components/Form/FormElement'
import { FormEventHandler, useContext } from 'react'
import { useNotifications } from '@/context/NotificationContext'
import {
  AuthProviderContext,
  FetchStatus
} from '@/application/auth/contexts/AuthProvider'
import { UpdatePasswordPayload } from '@/domain/auth/entities/payload/updatePassword'
import { Password } from '@/domain/auth/valueObjects/password'
import { Id } from '@/domain/auth/valueObjects/id'

function ChangePasswordForm () {
  const { pushNotification } = useNotifications()
  const { updatePassword, auth, state } = useContext(AuthProviderContext)

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

    updatePassword(
      new UpdatePasswordPayload(
        new Id({ value: auth.id }),
        new Password({ value: oldPassword }),
        new Password({ value: newPassword }),
        new Password({ value: newPasswordConfirmation })
      )
    )
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
