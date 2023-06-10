'use client'
import ChangeInformationForm from '../ChangeInformationForm/ChangeInformationForm'
import CheckIcon from '@/assets/CheckIcon'
import FormElement from '@/components/Form/FormElement'
import { useNotifications } from '@/context/NotificationContext'
import { useSession } from 'next-auth/react'
import { FormEventHandler } from 'react'

function ChangeUserInfoForm() {
  const { data: session, update } = useSession()
  const { pushNotification } = useNotifications()

  const handleSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
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
          form.reset()
          pushNotification({
            title: 'Information modifié',
            content: 'Vos informations ont bien été modifié',
            duration: 1,
          })
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
