import UpdatePasswordContext from '../../contexts/UpdatePassword'
import UpdatePasswordFormElement from './updatePasswordForm'

export default function UpdatePasswordForm () {
  return (
    <UpdatePasswordContext>
      <UpdatePasswordFormElement />
    </UpdatePasswordContext>
  )
}
