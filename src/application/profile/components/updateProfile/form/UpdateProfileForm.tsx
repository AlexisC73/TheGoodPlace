'use client'

import CheckIcon from '@/assets/CheckIcon'
import FormElement from '@/components/Form/FormElement'
import { FormEventHandler, useContext } from 'react'
import ChangeInformationForm from '@/app/user/profile/component/ChangeInformationForm/ChangeInformationForm'
import { UpdateProfileProviderContext } from '@/application/profile/contexts/updateProfile'
import { FetchStatus } from '@/application/@shared/FetchStatus'
import { Email } from '@/domain/@shared/valueObject/email'
import { Name } from '@/domain/@shared/valueObject/name'
import { Password } from '@/domain/@shared/valueObject/password'
import { UpdateProfilePayload } from '@/domain/profile/entities/payload/updateProfilePayload'
import { AuthProviderContext } from '@/application/auth/contexts/AuthProvider'
import { Id } from '@/domain/@shared/valueObject/id'
import { useNotifications } from '@/context/NotificationContext'

function UpdateProfileFormElement () {
  const { auth } = useContext(AuthProviderContext)
  const { state, updateProfile, error } = useContext(
    UpdateProfileProviderContext
  )
  const { pushNotification } = useNotifications()

  const handleSubmitForm: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const inputPassword = formData.get('password')?.toString()
    const inputFirstname = formData.get('firstname')?.toString()
    const inputLastname = formData.get('lastname')?.toString()
    const inputEmail = formData.get('email')?.toString()
    if (
      !inputPassword ||
      !inputFirstname ||
      !inputLastname ||
      !inputEmail ||
      !auth
    ) {
      return
    }
    const id = Id.create(auth.id)
    const email = Email.create(inputEmail)
    const firstname = Name.create(inputFirstname)
    const lastname = Name.create(inputLastname)
    const password = Password.create(inputPassword)
    if (
      !email.isValid() ||
      !firstname.isValid() ||
      !lastname.isValid() ||
      !password.isValid() ||
      !id.isValid()
    ) {
      return
    }
    const payload = new UpdateProfilePayload(id, password, {
      email,
      firstname,
      lastname
    })
    updateProfile(payload)
  }

  if (state === FetchStatus.SUCCESS) {
    pushNotification({
      title: 'Succès',
      content: 'Votre profil a été mis à jour',
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
      sectionTitle='Information Générales'
      submitLabel='Sauvegarder les changement'
      icon={<CheckIcon />}
      onSubmit={handleSubmitForm}
      canSubmit={state !== FetchStatus.LOADING}
    >
      <FormElement
        label='Mot de passe (actuel)'
        name='password'
        type='password'
      />
      <FormElement label='Prénom' name='firstname' />
      <FormElement label='Nom de famille' name='lastname' />
      <FormElement label='Addresse Email' name='email' />
    </ChangeInformationForm>
  )
}

export default UpdateProfileFormElement
