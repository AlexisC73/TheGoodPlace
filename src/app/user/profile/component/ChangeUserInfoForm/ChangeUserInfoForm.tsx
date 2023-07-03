'use client'
import ChangeInformationForm from '../ChangeInformationForm/ChangeInformationForm'
import CheckIcon from '@/assets/CheckIcon'
import FormElement from '@/components/Form/FormElement'
import { FormEventHandler } from 'react'

function ChangeUserInfoForm () {
  const handleSubmitForm: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const password = formData.get('password')
    const firstname = formData.get('firstname')
    const lastname = formData.get('lastname')
    const email = formData.get('email')
    console.log('update user profile')
  }
  return (
    <ChangeInformationForm
      sectionTitle='Information Générales'
      submitLabel='Sauvegarder les changement'
      icon={<CheckIcon />}
      onSubmit={handleSubmitForm}
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

export default ChangeUserInfoForm
