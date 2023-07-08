'use client'

import { useState } from 'react'
import SignInModal from '@/presentation/auth/signIn/signInModal'
import SignUpModal from '@/presentation/auth/signUp/modal'

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
