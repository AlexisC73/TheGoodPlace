import SignOutContext from '../../../contexts/signOutProvider'
import SignOutComponent from './SignOut'

export default function SignOutButton () {
  return (
    <SignOutContext>
      <SignOutComponent />
    </SignOutContext>
  )
}
