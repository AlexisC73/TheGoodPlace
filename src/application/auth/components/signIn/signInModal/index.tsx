import SignInContext from '@/application/auth/contexts/SignInProvider'
import SignInModal from './signInModal'
import withOverlay from '@/components/Overlay/overlay'

interface SignInModalProps {
  closeModal: () => void
  switchToSignUp: () => void
}

function SignInModalUseCase ({ closeModal, switchToSignUp }: SignInModalProps) {
  return (
    <SignInContext>
      <SignInModal switchToSignup={switchToSignUp} closeModal={closeModal} />
    </SignInContext>
  )
}

export default withOverlay(SignInModalUseCase)
