import { SignUpContext } from '@/application/auth/contexts/SignUpProvider'
import SignUpModal from './signUpModal'
import withOverlay from '@/components/Overlay/overlay'

interface SignUpModalProps {
  closeModal: () => void
  switchToSignIn: () => void
}

function SignUpModalUseCase ({ closeModal, switchToSignIn }: SignUpModalProps) {
  return (
    <SignUpContext>
      <SignUpModal switchToSignIn={switchToSignIn} closeModal={closeModal} />
    </SignUpContext>
  )
}

export default withOverlay(SignUpModalUseCase)
