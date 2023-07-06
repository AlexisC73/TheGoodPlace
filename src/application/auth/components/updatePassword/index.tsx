import UpdatePasswordContext from '../../contexts/UpdatePassword'
import UpdatePasswordFormComponent from './updatePasswordForm'

export default function UpdatePasswordForm () {
  return (
    <UpdatePasswordContext>
      <UpdatePasswordFormComponent />
    </UpdatePasswordContext>
  )
}
