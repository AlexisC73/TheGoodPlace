'use client'

import { useState } from 'react'
import SignInModal from '@/application/auth/components/signIn/signInModal'
import SignUpModal from '@/application/auth/components/signUp/modal'

interface SigninModalProps {
  closeModal: () => void
}

function AuthModal ({ closeModal }: SigninModalProps) {
  const [isSignin, setIsSignin] = useState(true)

  const content = isSignin ? (
    <SignInModal
      switchToSignUp={() => setIsSignin(false)}
      closeModal={closeModal}
    />
  ) : (
    <SignUpModal
      switchToSignIn={() => setIsSignin(true)}
      closeModal={closeModal}
    />
  )
  return content
}

export default AuthModal
