'use client'

import CartLogo from '@/assets/CartLogo'
import Image from 'next/image'
import Link from 'next/link'
import SignOutButton from '@/application/auth/components/signOut/button'
import { useContext } from 'react'
import { AuthProviderContext } from '@/application/auth/contexts/AuthProvider'
import { ProfileProviderContext } from '@/application/auth/contexts/ProfileProvider'

function UserInfo () {
  return (
    <div className='flex items-center gap-8 min-w-[124px] justify-end max-xl:pr-3'>
      <CartLogo className='text-[22px] text-primary' />
      <SignOutButton />
      <div className='separator h-7 w-[2px] hidden sm:block bg-[#E9EDF3]'></div>
      <AvatarImage />
    </div>
  )
}

export default UserInfo

const AvatarImage = () => {
  const { profile } = useContext(ProfileProviderContext)

  return (
    <Link
      href={'/user/profile'}
      className='cursor-pointer w-[42px] h-[42px] rounded-full overflow-hidden flex items-center justify-center'
    >
      <Image
        height={42}
        width={42}
        src={
          profile?.avatarUrl ??
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        }
        alt='avatar'
        className='object-cover h-full w-full'
      />
    </Link>
  )
}
