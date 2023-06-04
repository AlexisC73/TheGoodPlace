import { GoogleIcon } from '@/assets/Google'

const SigninWithGooogle = () => {
  return (
    <button className='bg-[#4285F4] flex p-px pr-3 items-center gap-x-2 rounded font-medium text-white text-[14px]'>
      <span className='bg-white p-2 text-[1.5rem] rounded'>
        <GoogleIcon />
      </span>
      Me connecter avec Google
    </button>
  )
}

export default SigninWithGooogle
