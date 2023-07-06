import SignInContext from '@/application/auth/contexts/SignInProvider'
import SignInModalComponent from './signInModal'
import withOverlay from '@/components/Overlay/overlay'

interface SignInModalProps {
  closeModal: () => void
  switchToSignUp: () => void
}

function SignInModal ({ closeModal, switchToSignUp }: SignInModalProps) {
  return (
    <SignInContext>
      <SignInModalComponent
        switchToSignup={switchToSignUp}
        closeModal={closeModal}
      />
    </SignInContext>
  )
}

export default withOverlay(SignInModal)
