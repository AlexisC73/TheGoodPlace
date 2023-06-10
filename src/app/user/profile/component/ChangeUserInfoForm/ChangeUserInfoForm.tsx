'use client'
import ChangeInformationForm from '../ChangeInformationForm/ChangeInformationForm'
import CheckIcon from '@/assets/CheckIcon'
import FormElement from '@/components/Form/FormElement'
import { useSession } from 'next-auth/react'
import { FormEventHandler } from 'react'

function ChangeUserInfoForm() {
  const { data: session, update } = useSession()
  const handleSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name')
    const email = formData.get('email')
    const body = {
      name: !!name ? name : undefined,
      email: !!email ? email : undefined,
    }
    fetch('/api/user', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        const newInfo = await res.json()
        if (newInfo?.user) {
          update(newInfo.user)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <ChangeInformationForm
      sectionTitle='Information Générales'
      submitLabel='Sauvegarder les changement'
      icon={<CheckIcon />}
      onSubmit={handleSubmitForm}
    >
      <FormElement
        label="Nom d'utilisateur"
        name='name'
        currentValue={session?.user.name}
      />
      <FormElement
        label='Addresse Email'
        name='email'
        currentValue={session?.user.email}
      />
    </ChangeInformationForm>
  )
}

export default ChangeUserInfoForm
