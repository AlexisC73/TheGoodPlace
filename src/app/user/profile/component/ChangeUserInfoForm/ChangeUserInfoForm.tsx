import ChangeInformationForm from '../ChangeInformationForm/ChangeInformationForm'
import CheckIcon from '@/assets/CheckIcon'
import FormElement from '@/components/Form/FormElement'

function ChangeUserInfoForm() {
  return (
    <ChangeInformationForm
      sectionTitle='Information Générales'
      submitLabel='Sauvegarder les changement'
      icon={<CheckIcon />}
    >
      <FormElement label="Nom d'utilisateur" name='username' />
      <FormElement label='Addresse Email' name='email' />
    </ChangeInformationForm>
  )
}

export default ChangeUserInfoForm
