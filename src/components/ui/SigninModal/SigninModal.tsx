'use client'

import { useState } from 'react'
import SigninWithGooogle from './SignWithGoogle/SignWithGoogle'
import SigninForm from '../../Form/SigninForm'
import SignupForm from '../../Form/SignupForm'
import { CrossIcon } from '@/assets/Cross'
import withOverlay from '@/components/Overlay/overlay'

interface SigninModalProps {
  closeLoginModal: () => void
  showOtherProvider?: boolean
}

function Modal ({ closeLoginModal, showOtherProvider }: SigninModalProps) {
  const [isSignin, setIsSignin] = useState(true)

  const toggleSignin = () => {
    setIsSignin(prev => !prev)
  }

  const content = isSignin ? (
    <SigninForm closeSigninModal={() => closeLoginModal()} />
  ) : (
    <SignupForm switchToSignin={() => setIsSignin(true)} />
  )
  return (
    <div className='bg-white relative z-10 p-8 rounded w-[500px]'>
      <button
        className='close-btn absolute text-[24px] right-4 text-[#B6B6B6] top-4'
        onClick={closeLoginModal}
      >
        <CrossIcon />
      </button>
      <header className='pb-4 text-center text-[20px] text-black font-bold'>
        <h1>{isSignin ? 'Me connecter' : "M'inscrire"}</h1>
      </header>
      {content}
      <div className='flex justify-between py-8'>
        <p>Vous n&apos;avez pas encore de compte ?</p>
        <button className='underline font-bold' onClick={toggleSignin}>
          {isSignin ? "M'inscrire" : 'Me connecter'}
        </button>
      </div>
      {showOtherProvider && (
        <div>
          <div className='flex items-center py-5'>
            <span className='bg-[#D9D9D9] h-px flex-1'></span>
            <p className='px-7 text-[#545454] font-bold'>OU</p>
            <span className='bg-[#D9D9D9] h-px flex-1'></span>
          </div>
          <ul className='flex items-center justify-center pt-4'>
            <li>
              <SigninWithGooogle />
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

const SignupSigninModal = withOverlay<SigninModalProps>(Modal)

export default SignupSigninModal
