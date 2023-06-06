import CartLogo from '@/assets/CartLogo'
import React from 'react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

function UserInfo() {
  return (
    <div className='flex items-center gap-8 min-w-[124px] justify-end max-xl:pr-3'>
      <CartLogo className='text-[22px] text-primary' />
      <div className='separator h-7 w-[2px] hidden sm:block bg-[#E9EDF3]'></div>
      <AvatarImage />
    </div>
  )
}

export default UserInfo

const AvatarImage = () => {
  const logout = () =>
    signOut({
      redirect: false,
    })
  return (
    <div onClick={logout} className='cursor-pointer'>
      <Image
        height={42}
        width={42}
        src='https://sm.ign.com/ign_fr/cover/a/avatar-gen/avatar-generations_bssq.jpg'
        alt='avatar'
        className='rounded-full'
      />
    </div>
  )
}
