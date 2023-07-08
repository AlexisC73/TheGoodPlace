import { useContext } from 'react'
import { SignOutProviderContext } from '@/application/auth/contexts/signOutProvider'
import LogoutIcon from '@/assets/LogoutIcon/LogoutIcon'

export default function SignOutComponent () {
  const { signOut } = useContext(SignOutProviderContext)

  return (
    <button
      className='text-primary text-[22px] cursor-pointer'
      onClick={signOut}
    >
      <LogoutIcon />
    </button>
  )
}
