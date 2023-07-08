import SignOutContext from '@/application/auth/contexts/signOutProvider'
import SignOutComponent from './SignOut'

export default function SignOutButton () {
  return (
    <SignOutContext>
      <SignOutComponent />
    </SignOutContext>
  )
}
