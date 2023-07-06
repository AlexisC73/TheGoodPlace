'use client'

import { FetchStatus } from '@/application/@shared/FetchStatus'
import CheckIcon from '@/assets/CheckIcon'
import { FormEventHandler, useContext, useRef } from 'react'
import { UpdatePasswordProviderContext } from '../../contexts/UpdatePassword'
import ChangeInformationForm from '@/components/Form/ChangeInformationForm/ChangeInformationForm'
import FormElement from '@/components/Form/FormElement'
import { Password } from '@/domain/@shared/valueObject/password'
import { UpdatePasswordPayload } from '@/domain/auth/entities/payload/updatePassword'
import { Id } from '@/domain/@shared/valueObject/id'
import { AuthProviderContext } from '../../contexts/AuthProvider'
import { useNotifications } from '@/context/NotificationContext'

export default function UpdatePasswordFormComponent () {
  const { auth } = useContext(AuthProviderContext)
  const { state, updatePassword, error } = useContext(
    UpdatePasswordProviderContext
  )
  const { pushNotification } = useNotifications()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const inputOldPassword = formData.get('old-password')?.toString()
    const inputNewPassword = formData.get('new-password')?.toString()
    const inputNewPasswordConfirmation = formData
      .get('confirmPassword')
      ?.toString()
    if (
      !inputOldPassword ||
      !inputNewPassword ||
      !inputNewPasswordConfirmation ||
      !auth
    ) {
      return
    }
    const oldPassword = Password.create(inputOldPassword)
    const newPassword = Password.create(inputNewPassword)
    const newPasswordConfirmation = Password.create(
      inputNewPasswordConfirmation
    )
    const id = Id.create(auth.id)
    const payload = new UpdatePasswordPayload(
      id,
      oldPassword,
      newPassword,
      newPasswordConfirmation
    )
    await updatePassword(payload)
  }

  if (state === FetchStatus.SUCCESS) {
    pushNotification({
      title: 'Succès',
      content: 'Votre mot de passe a été modifié',
      type: 'success',
      duration: 2
    })
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
    <ChangeInformationForm
      sectionTitle='Modification du mot de passe'
      submitLabel='Modifier le mot de passe'
      icon={<CheckIcon />}
      onSubmit={handleSubmit}
      canSubmit={state !== FetchStatus.LOADING}
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
