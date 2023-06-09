import CheckIcon from '@/assets/CheckIcon'
import ChangeInformationForm from '../ChangeInformationForm/ChangeInformationForm'
import FormElement from '@/components/Form/FormElement'

function ChangePasswordForm() {
  return (
    <ChangeInformationForm
      sectionTitle='Modification du mot de passe'
      submitLabel='Modifier le mot de passe'
      icon={<CheckIcon />}
    >
      <FormElement label='Mot de passe (actuel)' name='password' />
      <FormElement label='Mot de passe (nouveau)' name='password' />
      <FormElement
        label='Vérification du nouveau mot de passe'
        name='password'
      />
    </ChangeInformationForm>
  )
}

export default ChangePasswordForm
